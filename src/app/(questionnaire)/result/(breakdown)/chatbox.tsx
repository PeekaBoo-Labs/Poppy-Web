import { useChatContext } from "@/lib/ai/chat-context";
import Sparkle from "@/lib/icons/sparkle";
import { cleanupQuestion } from "@/lib/utils";
import { Message } from "ai/react";
import { useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatInputType = "prompt" | "action";

type ChatPresets = {
  behavior: ChatInputType;
  value: string;
};

type ChatBoxProps = {
  presets: ChatPresets[];
};

export default function ChatBox(props: ChatBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
  } = useChatContext();
  return (
    <div
      ref={scrollRef}
      className="relative flex h-full w-full flex-col overflow-y-scroll"
    >
      <div className="flex flex-grow flex-col gap-[16px] p-[40px]">
        {messages.map((m: Message) =>
          m.role == "assistant" ? (
            <div
              key={m.id}
              className="rounded-[13px] border border-border px-[35px] py-[20px]"
            >
              {
                <Markdown
                  className="prose prose-sm prose-zinc prose-p:text-sm prose-li:*:my-0"
                  remarkPlugins={[remarkGfm]}
                >
                  {m.content}
                </Markdown>
              }
            </div>
          ) : (
            <div
              key={m.id}
              className="flex items-center gap-[13px] text-secondary"
            >
              <Sparkle className="text-black" />
              <span className="text-base">{cleanupQuestion(m.content)}</span>
            </div>
          ),
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 left-0 w-full rounded-[13px] px-[40px] pb-[30px] pt-[30px]"
      >
        <div className="mb-[20px]">
          {props.presets.map((p, i) => (
            <button
              type="button"
              className="box-border rounded-[13px] border border-border px-[13px] py-[16px] hover:outline hover:outline-[#f1bc00]"
              key={i}
              onClick={() => {
                if (inputRef && inputRef.current) {
                  setInput(p.value);
                }
              }}
            >
              {p.value}
            </button>
          ))}
        </div>
        <input
          className="h-[57px] w-full rounded-[13px] border border-border bg-secondary-background p-[21px] text-base leading-none outline-[1px] focus:outline-[#f1bc00]"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Ask a question or pick a prompt."
        />
      </form>
    </div>
  );
}
