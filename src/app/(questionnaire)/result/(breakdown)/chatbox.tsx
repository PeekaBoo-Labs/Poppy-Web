import { useChatContext } from "@/lib/ai/chat-context";
import { Section } from "@/lib/contexts/ResultsScrollContext";
import ArrowLeft from "@/lib/icons/arrow-left";
import OpenAIIcon from "@/lib/icons/openai-icon";
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
import Image from "next/image";
import Link from "next/link";
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
      label: "What are my STI risks?",
      value: "What are my STI risks?",
    },

    {
      behavior: "prompt",
      label: "Give me personalized advice.",
      value:
        "Can you provide actionable steps to enhance my approach for better sexual health?",
    },

    {
      behavior: "prompt",
      label: "What birth control methods can I use?",
      value: "What birth control methods can I use?",
    },
  ],
  [Section.NextSteps]: [
    {
      behavior: "prompt",
      label: "Which STIs are curable?",
      value: "Which STIs on my screening results are curable?",
    },
    {
      behavior: "prompt",
      label: "Which test is best for me?",
      value:
        "Which STI should I get tested for first and which type of test should I look for?",
    },
    {
      behavior: "prompt",
      label: "Are there low-cost clinics?",
      value: "Are there low-cost clinics?",
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
    resetChat,
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
      className="relative flex h-full w-full flex-grow flex-col-reverse overflow-y-scroll"
    >
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full border-t border-border pb-[10px] pt-[15px] md:rounded-[13px] md:border-0 md:px-[30px] md:pt-[30px]"
      >
        <Link
          href="/result"
          prefetch={true}
          className="absolute right-0 top-[-70px] m-4 flex items-center gap-2 rounded-[13px] bg-primary px-[13px] py-[11px] font-medium text-white shadow-lg md:hidden"
        >
          <ArrowLeft />
          Back
        </Link>

        <motion.div className="mb-[5px] flex gap-[10px] overflow-scroll pb-[5px] pl-[16px] pr-[16px] md:mb-[20px] md:flex-wrap md:gap-[15px] md:overflow-hidden md:pb-0 md:pl-0 md:pr-0">
          {presets.map((p, i) => (
            <motion.button
              variants={blurVariant}
              type="button"
              className="group relative flex-shrink-0 rounded-[13px] px-[13px] py-[11px] text-sm font-medium hover:text-accent-darker md:bg-white md:px-[16px] md:py-[13px] md:text-base"
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

              <div className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-[13px] border border-border group-hover:border-2 group-hover:border-accent-darker" />
            </motion.button>
          ))}
        </motion.div>

        <motion.input
          variants={fadeUp}
          className="mx-[16px] h-[50px] w-[calc(100%-32px)] rounded-[13px] border border-border bg-tertiary p-[13px] text-sm leading-none shadow-realistic outline-[1px] focus:outline-[#f1bc00] md:mx-0 md:h-[57px] md:w-full md:p-[21px] md:text-base"
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder="Ask a question or pick a prompt."
        />

        <span className="mt-3 flex w-full items-center justify-center text-center text-[13px] text-secondary">
          <OpenAIIcon className="mr-2 inline text-emerald-800" />
          Powered by GPT-4o
          <button
            type="reset"
            className="ml-2 underline"
            onClick={() => {
              resetChat();
              setInput("");
            }}
          >
            Clear Chat
          </button>
        </span>
      </form>

      <AnimatePresence mode="popLayout">
        {messages.length == 0 ? (
          <motion.div
            key="p-logo"
            variants={blurVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex w-full flex-1 flex-grow items-center justify-center pt-[20px]"
          >
            <Image
              src={"/poppyPLogo.svg"}
              alt=""
              width={69}
              height={69}
              className="opacity-10"
            />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            variants={blurVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex h-1 flex-grow flex-col gap-[16px] overflow-y-scroll p-[16px] pt-[35px] md:h-auto md:overflow-visible md:p-[30px] md:pt-[16px]"
          >
            {messages.map((m: Message) =>
              m.role == "assistant" ? (
                <div
                  key={m.id}
                  className="rounded-[13px] border border-border bg-white px-[25px] py-[30px] shadow-realistic md:px-[35px] md:py-[20px]"
                >
                  {
                    <Markdown
                      className="prose prose-sm prose-zinc lg:prose-base prose-p:text-sm prose-li:*:my-0 lg:prose-p:text-base"
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}
