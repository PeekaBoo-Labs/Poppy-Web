import { useAIContext } from "@/lib/ai/ai-context";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import BreakdownCard from "./breakdown-card";
import Warning from "@/lib/icons/warning";
import { hasNegibleRisk } from "@/lib/ai/question";
import WarningCard from "@/components/general/warning-card";

export default function BreakdownList() {
  const { answeredQuestions, grid } = useAIContext();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);

  const relevantQuestions = answeredQuestions.filter((q) => !hasNegibleRisk(q));

  return (
    <motion.div className="flex flex-col gap-[10px]">
      <WarningCard
        title="IMPORTANT"
        body="STIs are often asymptomatic. When symptoms occur, they can be
        non-specific."
      />

      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {relevantQuestions.length == 0 && grid.length != 0 ? (
            <WarningCard
              title="Warning"
              body={`STIs can spread without direct sexual contact, mainly via
                  mother-to-child transmission during pregnancy, birth, or
                  breastfeeding. Rarely, some STIs may spread through contact
                  with contaminated objects or surfaces, though this is uncommon
                  for most STIs.`}
            />
          ) : null}

          {answeredQuestions.map((question, index) => {
            if (showAllQuestions || !hasNegibleRisk(question)) {
              return (
                <BreakdownCard
                  key={index}
                  question={question}
                  expanded={expanded === index}
                  onClick={() =>
                    setExpanded((prev) => (prev === index ? null : index))
                  }
                />
              );
            }
          })}
        </AnimatePresence>
      </LayoutGroup>

      {!showAllQuestions && (
        <motion.button
          layout
          className="mx-auto mt-2 inline w-fit rounded-[6px] bg-primary px-[10px] py-[5px] text-xs font-medium text-white"
          onClick={() => {
            setShowAllQuestions((b) => !b);
          }}
        >
          Show all questions
        </motion.button>
      )}
    </motion.div>
  );
}
