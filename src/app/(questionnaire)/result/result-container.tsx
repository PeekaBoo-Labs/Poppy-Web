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
import Sparkle from "@/lib/icons/sparkle";
import Link from "next/link";

export default function ResultContainer() {
  const { currentSection } = useResultsScrollContext();
  const { grid } = useAIContext();

  return (
    <div className="relative mx-auto mt-[20px] flex w-[calc(100%-32px)] max-w-[1300px] flex-col items-start gap-[20px] md:mt-[44px] md:w-[calc(100%-70px)] md:flex-row">
      <div className="top-[114px] w-full basis-auto md:sticky md:h-1 md:min-h-[75vh] md:w-[60%] xl:min-h-[85vh] xl:w-[70%]">
        <div className="h-full w-full rounded-[20px] border border-border bg-white p-[7px] shadow-realistic">
          <div className="hidden h-full flex-col items-center justify-center overflow-hidden rounded-[13px] border border-border bg-white md:flex">
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
          <div className="md:hidden">
            <OverviewMain key={Section.Overview} />
          </div>
        </div>
      </div>

      <div className="flex flex-grow basis-0 flex-col not-last:pb-[50px] md:not-last:pb-[200px]">
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

      <ResultScrollBar className="hidden md:flex" section={currentSection} />

      <Link
        href="/result/ai"
        prefetch={true}
        className="fixed bottom-0 right-0 m-4 flex items-center gap-2 rounded-[13px] bg-accent-darker px-4 py-3 font-medium shadow-md shadow-accent md:hidden"
      >
        <Sparkle /> Ask AI
      </Link>
    </div>
  );
}
