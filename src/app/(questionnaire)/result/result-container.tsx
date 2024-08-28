import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import ResultSection from "./result-section";
import FlowerBed from "@/components/results/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import OverviewList from "./(overview)/overview-list";
import OverviewMain from "./(overview)/overview-main";
import ResultScrollBar from "./result-scrollbar";
import BreakdownList from "./(breakdown)/breakdown-list";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ChatBox, { PRESETS } from "./(breakdown)/chatbox";
import { fadeUpParent } from "@/lib/motion";
import NextStepsList from "./(nextsteps)/nextsteps-list";

export default function ResultContainer() {
  const { currentSection } = useResultsScrollContext();
  const { grid } = useAIContext();

  return (
    <div className="relative mx-auto mt-[44px] flex w-[calc(100%-70px)] max-w-[1300px] items-start gap-[20px]">
      <div className="sticky top-[114px] h-1 min-h-[75vh] w-[60%] basis-auto xl:min-h-[85vh] xl:w-[70%]">
        <div className="h-full w-full rounded-[20px] border border-border bg-white p-[7px] shadow-realistic">
          <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[13px] border border-border bg-white">
            <AnimatePresence mode="wait" initial={true}>
              {currentSection == Section.Overview ? (
                <OverviewMain key={Section.Overview} />
              ) : (
                <ChatBox
                  key={Section.Breakdown}
                  presets={PRESETS[currentSection]}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex flex-grow basis-0 flex-col not-last:pb-[200px]">
        <LayoutGroup>
          <ResultSection
            title="Step One"
            subtitle="Learn about your STI risks"
            section={Section.Overview}
          >
            <OverviewList />
          </ResultSection>
          <ResultSection
            title="Step Two"
            subtitle="Break down your questions and answers"
            section={Section.Breakdown}
          >
            <BreakdownList />
          </ResultSection>
          <ResultSection
            title="Step Three"
            subtitle="Recommended actions to take"
            section={Section.NextSteps}
          >
            <NextStepsList />
          </ResultSection>
        </LayoutGroup>
      </div>

      <ResultScrollBar section={currentSection} />
    </div>
  );
}
