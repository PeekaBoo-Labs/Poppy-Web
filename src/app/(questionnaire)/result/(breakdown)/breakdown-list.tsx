import { useAIContext } from "@/lib/ai/ai-context";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import BreakdownCard from "./breakdown-card";
import Warning from "@/lib/icons/warning";

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
          <div className="flex items-center gap-[28px] rounded-[13px] border border-border bg-tertiary px-[19px] py-[21px]">
            <div className="flex flex-1 flex-col gap-[5px]">
              <span className="text-sm font-semibold">Warning</span>
              <p className="text-sm">
                STIs can spread without direct sexual contact, mainly via
                mother-to-child transmission during pregnancy, birth, or
                breastfeeding. Rarely, some STIs may spread through contact with
                contaminated objects or surfaces, though this is uncommon for
                most STIs.
              </p>
            </div>

            <Warning />
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
