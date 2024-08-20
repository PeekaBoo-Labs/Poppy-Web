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
import { AnimatePresence } from "framer-motion";
import ChatBox from "./(breakdown)/chatbox";

export default function ResultContainer() {
  const { currentSection } = useResultsScrollContext();
  const { grid } = useAIContext();

  return (
    <div className="relative mx-auto mt-[44px] flex w-[calc(100%-70px)] max-w-[1300px] items-start gap-[20px]">
      <div className="sticky top-[114px] h-1 min-h-[75vh] w-[60%] basis-auto xl:min-h-[85vh] xl:w-[70%]">
        <div className="h-full w-full rounded-[20px] border border-border bg-white p-[7px] shadow-realistic">
          <div className="flex h-full flex-col items-center justify-center rounded-[13px] border border-border bg-white">
            <AnimatePresence initial={true}>
              {
                {
                  [Section.Overview]: <OverviewMain />,
                  [Section.Breakdown]: (
                    <ChatBox
                      presets={[
                        {
                          behavior: "prompt",
                          value: "what color is an apple?",
                        },
                      ]}
                    />
                  ),
                  [Section.NextSteps]: <p className="absolute">Next Steps</p>,
                }[currentSection]
              }
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex flex-grow basis-0 flex-col not-last:pb-[200px]">
        <ResultSection
          title="Step One"
          subtitle="Learn about your STI risks"
          section={Section.Overview}
        >
          <OverviewList />
        </ResultSection>
        <ResultSection
          title="Step Two"
          subtitle="Break down your questions and answers
"
          section={Section.Breakdown}
        >
          <BreakdownList />
        </ResultSection>
        <ResultSection
          title="Step Three"
          subtitle="Recommended actions to take
"
          section={Section.NextSteps}
        >
          <div className="h-[200px] rounded-[13px] border border-border" />
          <div className="h-[200px] rounded-[13px] border border-border" />
        </ResultSection>
      </div>

      <ResultScrollBar section={currentSection} />
    </div>
  );
}
