import { useAIContext } from "@/lib/ai/ai-context";
import { Question, getAnswerLabel } from "@/lib/ai/question";
import PlusCircle from "@/lib/icons/plus-circle";
import { fadeUp } from "@/lib/motion";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import BreakdownCard from "./breakdown-card";

const PlusCircleMotion = motion(PlusCircle);

export default function BreakdownList() {
  const { answeredQuestions } = useAIContext();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[10px]">
      <LayoutGroup>
        {answeredQuestions.map((question, index) => (
          <BreakdownCard
            key={index}
            question={question}
            expanded={expanded === index}
            onClick={() =>
              setExpanded((prev) => (prev === index ? null : index))
            }
          />
        ))}
      </LayoutGroup>
    </div>
  );
}
