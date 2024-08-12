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

export default function ResultContainer() {
  const { currentSection } = useResultsScrollContext();
  const { grid } = useAIContext();

  console.log(currentSection);

  return (
    <div className="relative mx-auto mt-[44px] flex w-[calc(100%-70px)] max-w-[1300px] items-start gap-[20px]">
      <div className="sticky top-[114px] h-1 min-h-[75vh] w-[60%] basis-auto xl:min-h-[85vh] xl:w-[70%]">
        <div className="h-full w-full rounded-[20px] border border-border bg-white p-[7px] shadow-realistic">
          <div className="flex h-full flex-col rounded-[13px] border border-border bg-white">
            {
              {
                [Section.Overview]: <OverviewMain />,
                [Section.Breakdown]: <p>Breakdown</p>,
                [Section.NextSteps]: <p>Next Steps</p>,
              }[currentSection]
            }
          </div>
        </div>
      </div>

      <div className="not-last:pb-[60px] flex flex-grow basis-0 flex-col">
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
          <div className="h-[10px]" />
        </ResultSection>
        <ResultSection
          title="Step Three"
          subtitle="Recommended actions to take
"
          section={Section.NextSteps}
        >
          <div className="h-[600px]" />
        </ResultSection>
      </div>

      <ResultScrollBar section={currentSection} />
    </div>
  );
}
