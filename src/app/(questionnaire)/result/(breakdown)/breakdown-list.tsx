import { useAIContext } from "@/lib/ai/ai-context";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import BreakdownCard from "./breakdown-card";
import Warning from "@/lib/icons/warning";
import { hasNegibleRisk } from "@/lib/ai/question";
import WarningCard from "@/components/general/warning-card";
import PlusCircle from "@/lib/icons/plus-circle";

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
          className="group relative flex items-center gap-[21px] rounded-[13px] px-[21px] py-[19px] text-left font-semibold transition-colors duration-700"
          onClick={() => {
            setShowAllQuestions((b) => !b);
          }}
        >
          <span className="flex-1 group-hover:text-accent-darker">
            Show all questions
          </span>

          <PlusCircle className="h-[16px] w-[16px] text-primary group-hover:text-accent-darker" />

          <div className="pointer-events-none absolute left-0 box-border h-full w-full rounded-[12px] border border-border transition-all group-hover:border-2 group-hover:border-accent-darker" />
        </motion.button>
      )}
    </motion.div>
  );
}
