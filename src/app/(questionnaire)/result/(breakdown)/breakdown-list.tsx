import { useAIContext } from "@/lib/ai/ai-context";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import BreakdownCard from "./breakdown-card";
import { Question, QuestionInput } from "@/lib/ai/question";

export default function BreakdownList() {
  const { answeredQuestions } = useAIContext();
  const [expanded, setExpanded] = useState<number | null>(null);

  const relevantQuestions = answeredQuestions.filter((q) => {
    const selectedOption = q.inputOptions.find((o) => o.id === q.selected);
    return selectedOption && selectedOption.value != 0;
  });

  return (
    <div className="flex flex-col gap-[10px]">
      <LayoutGroup>
        {relevantQuestions.length == 0 ? (
          <div className="rounded-[13px] border-2 border-accent-darker px-[19px] py-[21px]">
            <strong>
              Some STIs can be acquired without direct sexual contact
            </strong>
            , primarily through mother-to-child transmission during pregnancy,
            childbirth, or breastfeeding. While less common, a few STIs can also
            spread through contact with contaminated objects or surfaces, though
            this route of transmission is rare for most STIs.
          </div>
        ) : null}
        {relevantQuestions.map((question, index) => (
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
