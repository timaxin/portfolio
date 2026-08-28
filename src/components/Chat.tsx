"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { suggestedQuestions } from "@/content/suggested-questions";
import { t, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { LIMITS, type ChatTurn } from "@/lib/chat-config";
import { streamChat } from "@/lib/chat-client";
import { useTypewriter } from "@/lib/use-typewriter";

export function Chat({ locale }: { locale: Locale }) {
  const dict = dictionaries[locale];

  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  /**
   * The latest answer: everything received so far, which is ahead of what the
   * typewriter has put on screen. It stays here after the stream ends instead of
   * being moved into `turns` — re-rendering the same text as a committed turn
   * would flash the full string past the caret.
   */
  const [pending, setPending] = useState<string | null>(null);
  /** The network is done; the typewriter may still be catching up. */
  const [streamEnded, setStreamEnded] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const revealed = useTypewriter(pending ?? "", skipTyping);
  /** Tokens still arriving, or arrived and not typed out yet. */
  const isBusy = pending !== null && (!streamEnded || revealed.length < pending.length);

  // The answer lands a character at a time; smooth scrolling per character would
  // never settle, so follow it instantly while it types.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isBusy ? "auto" : "smooth",
      block: "end",
    });
  }, [turns, revealed, isBusy]);

  // An abandoned request would keep burning tokens — kill it when leaving the page.
  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isBusy) return;

      // The previous answer has been sitting outside `turns`; it joins the
      // transcript now that a new question pushes it into the past.
      const transcript = pending
        ? [...turns, { role: "assistant" as const, content: pending }]
        : turns;
      const history = [...transcript, { role: "user" as const, content: trimmed }];
      setTurns(history);
      setDraft("");
      setError(null);
      setPending("");
      setStreamEnded(false);
      setSkipTyping(false);

      const controller = new AbortController();
      abortRef.current = controller;

      let answer = "";
      try {
        for await (const event of streamChat(locale, history, controller.signal)) {
          if (event.type === "delta") {
            answer += event.text;
            setPending(answer);
          } else if (event.type === "error") {
            setError(event.message);
          }
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(dict.errors.connection);
          console.error(cause);
        }
      } finally {
        abortRef.current = null;
        setStreamEnded(true);
      }
    },
    [dict.errors.connection, isBusy, locale, pending, turns],
  );

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex-1 space-y-4">
        {turns.length === 0 && pending === null && (
          <div className="rounded-2xl border border-dashed border-border bg-surface px-5 py-6">
            <p className="text-sm text-muted">{dict.chat.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t(suggestedQuestions, locale).map((question, index) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void ask(question)}
                  // Picks up where the page entrance left off, then one chip every 45ms.
                  style={{ animationDelay: `${420 + index * 45}ms` }}
                  className="animate-rise cursor-pointer rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted transition duration-150 hover:border-accent hover:bg-accent-soft hover:text-accent active:scale-[0.97]"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn, index) => (
          <ChatMessage key={index} role={turn.role} content={turn.content} />
        ))}

        {pending !== null && (isBusy || pending) && (
          <ChatMessage role="assistant" content={revealed} pending={isBusy} />
        )}

        {error && (
          <p className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        className="sticky bottom-0 mt-6 bg-background pb-6 pt-3"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(draft);
        }}
      >
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 focus-within:border-accent">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void ask(draft);
              }
            }}
            rows={1}
            maxLength={LIMITS.maxQuestionChars}
            placeholder={dict.chat.placeholder}
            className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted"
          />
          {isBusy ? (
            <button
              type="button"
              onClick={() => {
                abortRef.current?.abort();
                setSkipTyping(true);
              }}
              className="cursor-pointer rounded-xl border border-border px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {dict.chat.stop}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!draft.trim()}
              className="cursor-pointer rounded-xl bg-accent px-3.5 py-2 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {dict.chat.send}
            </button>
          )}
        </div>
        <p className="mt-2 px-1 text-xs text-muted">{dict.chat.disclaimer}</p>
      </form>
    </section>
  );
}
