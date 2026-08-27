import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  role: "user" | "assistant";
  content: string;
  /** Show a caret while the text is still being written. */
  pending?: boolean;
};

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
      <div className="answer max-w-[92%] rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3 text-sm leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        {pending && (
          <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-accent align-middle" />
        )}
      </div>
    </div>
  );
}
