import { useChatContext } from "@/lib/ai/chat-context";
import { Section } from "@/lib/contexts/ResultsScrollContext";
import Sparkle from "@/lib/icons/sparkle";
import {
  blurVariant,
  fadeUp,
  fadeUpParent,
  scaleVariantFast,
} from "@/lib/motion";
import { cleanupQuestion } from "@/lib/utils";
import { generateId } from "ai";
import { Message } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatInputType = "prompt" | "action";

type ChatPresets = {
  behavior: ChatInputType;
  value: string;
  label: string;
};

type ChatBoxProps = {
  presets: readonly ChatPresets[];
};

export const PRESETS: Record<Section, readonly ChatPresets[]> = {
  [Section.Breakdown]: [
    {
      behavior: "prompt",
      label: "What are the stages of syphilis?",
      value: "What are the different stages of syphilis?",
    },
    {
      behavior: "prompt",
      label: "Give personalized advice.",
      value:
        "Can you provide actionable steps to enhance my approach for better sexual health?",
    },
  ],
  [Section.NextSteps]: [
    {
      behavior: "prompt",
      label: "Which STIs are curable?",
      value: "Which STIs on my screening results are curable?",
    },
  ],
  [Section.Overview]: [],
} as const;

export default function ChatBox({ presets }: ChatBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading,
    append,
  } = useChatContext();

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [presets]);

  return (
    <motion.div
      ref={scrollRef}
      variants={fadeUpParent}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="relative flex h-full w-full flex-col-reverse overflow-y-scroll"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[13px] px-[30px] pb-[30px] pt-[30px]"
      >
        <motion.div className="mb-[20px] flex flex-wrap gap-[15px]">
          {presets.map((p, i) => (
            <motion.button
              variants={blurVariant}
              type="button"
              className="box-border rounded-[13px] border border-border bg-white px-[13px] py-[16px] hover:outline hover:outline-[#f1bc00]"
              key={p.label}
              onClick={() => {
                if (inputRef && inputRef.current) {
                  append({
                    id: generateId(),
                    role: "user",
                    content: p.value,
                  });
                }
              }}
            >
              {p.label}
            </motion.button>
          ))}
        </motion.div>
        <motion.input
          variants={fadeUp}
          className="h-[57px] w-full rounded-[13px] border border-border bg-secondary-background p-[21px] text-base leading-none shadow-realistic outline-[1px] focus:outline-[#f1bc00]"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Ask a question or pick a prompt."
        />
      </form>

      <motion.div
        layout
        className="flex flex-grow flex-col gap-[16px] p-[30px]"
      >
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
              <span className="flex-grow basis-0 text-base">
                {cleanupQuestion(m.content)}
              </span>
            </div>
          ),
        )}
      </motion.div>
    </motion.div>
  );
}
