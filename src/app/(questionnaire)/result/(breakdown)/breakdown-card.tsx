import { getAnswerLabel } from "@/lib/ai/question";
import PlusCircle from "@/lib/icons/plus-circle";
import { blurVariant } from "@/lib/motion";
import type { Question } from "@/lib/ai/question";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import QuestionnaireGPT from "@/components/results/QuestionnaireGPT";

export default function BreakdownCard({
  question,
  expanded,
  onClick,
}: {
  question: Question;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={cn(
        expanded && "bg-[#F1BC00]",
        "group relative flex items-center gap-[21px] rounded-[13px] px-[21px] py-[19px] text-left transition-colors duration-700",
      )}
    >
      <motion.div
        layout="position"
        className="relative flex flex-grow basis-0 flex-col items-start gap-[5px] font-semibold"
      >
        <span>{question.label}</span>
        <AnimatePresence mode="popLayout">
          {expanded && (
            <motion.div
              variants={blurVariant}
              className="flex origin-center flex-col gap-[5px] font-normal text-secondary"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <span>{getAnswerLabel(question)}</span>
              <QuestionnaireGPT
                question={question.label}
                answer={getAnswerLabel(question) ?? "Unanswered"}
                stis_detected={[]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div layout>
        <PlusCircle className="h-[16px] w-[16px] text-primary" />
      </motion.div>

      <div
        className={cn(
          "pointer-events-none absolute left-0 box-border h-full w-full rounded-[12px] border border-border transition-all",
          expanded
            ? "border-2 border-[#F1BC00]"
            : "group-hover:border-2 group-hover:border-[#F1BC00]",
        )}
      />
    </motion.button>
  );
}
