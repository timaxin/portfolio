import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  role: "user" | "assistant";
  content: string;
  /** Show a blinking caret while the text is still being typed out. */
  pending?: boolean;
};

/**
 * Bold and code markers come in pairs, and typing them out one character at a
 * time flashes the raw `**` for a beat. Closing them off keeps the reveal
 * looking like text rather than markup.
 */
function closeOpenMarkers(text: string): string {
  let closed = text;
  if ((closed.match(/\*\*/g)?.length ?? 0) % 2 === 1) closed += "**";
  if ((closed.match(/`/g)?.length ?? 0) % 2 === 1) closed += "`";
  return closed;
}

export function ChatMessage({ role, content, pending = false }: Props) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm text-accent-contrast">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        // The entrance belongs to the answer being written; replaying it when the
        // finished turn re-mounts into the transcript would rock the whole thread.
        className={`answer max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3 text-sm leading-relaxed${
          pending ? " animate-rise-tight is-typing" : ""
        }`}
      >
        {/* The caret is drawn by CSS on the last block, so it sits right after
            the last character instead of dropping onto its own line. Before the
            first character arrives there is no block yet — hence the empty one. */}
        {content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {pending ? closeOpenMarkers(content) : content}
          </ReactMarkdown>
        ) : (
          <p />
        )}
      </div>
    </div>
  );
}
