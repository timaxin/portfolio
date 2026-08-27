"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { suggestedQuestions } from "@/content/suggested-questions";
import { LIMITS, type ChatTurn } from "@/lib/chat-config";
import { streamChat } from "@/lib/chat-client";

export function Chat() {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isStreaming = pending !== null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, pending]);

  // Оборванный запрос продолжал бы жечь токены — гасим его при уходе со страницы.
  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isStreaming) return;

      const history = [...turns, { role: "user" as const, content: trimmed }];
      setTurns(history);
      setDraft("");
      setError(null);
      setPending("");

      const controller = new AbortController();
      abortRef.current = controller;

      let answer = "";
      try {
        for await (const event of streamChat(history, controller.signal)) {
          if (event.type === "delta") {
            answer += event.text;
            setPending(answer);
          } else if (event.type === "error") {
            setError(event.message);
          }
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError("Соединение прервалось. Попробуйте ещё раз.");
          console.error(cause);
        }
      } finally {
        abortRef.current = null;
        setPending(null);
        if (answer) setTurns([...history, { role: "assistant", content: answer }]);
      }
    },
    [isStreaming, turns],
  );

  const stop = () => abortRef.current?.abort();

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex-1 space-y-4">
        {turns.length === 0 && !isStreaming && (
          <div className="rounded-2xl border border-dashed border-border bg-surface-muted/50 px-5 py-6">
            <p className="text-sm text-muted">
              Спросите что угодно об опыте, стеке и проектах. Ответы собирает модель строго
              по данным профиля — если чего-то нет, она так и скажет.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void ask(question)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
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

        {isStreaming && (
          <ChatMessage role="assistant" content={pending || "…"} pending />
        )}

        {error && (
          <p className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-muted">
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
            placeholder="Спросите об опыте, стеке или проектах…"
            className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl border border-border px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Стоп
            </button>
          ) : (
            <button
              type="submit"
              disabled={!draft.trim()}
              className="rounded-xl bg-accent px-3.5 py-2 text-sm text-accent-contrast transition-opacity disabled:opacity-40"
            >
              Спросить
            </button>
          )}
        </div>
        <p className="mt-2 px-1 text-xs text-muted">
          Отвечает ИИ по фиксированному профилю — детали лучше уточнить напрямую.
        </p>
      </form>
    </section>
  );
}
