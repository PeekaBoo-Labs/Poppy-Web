import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import ResultSection from "./result-section";
import FlowerBed from "@/components/results/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import OverviewList from "./(overview)/overview-list";
import OverviewMain from "./(overview)/overview-main";

export default function ResultContainer() {
  const { currentSection } = useResultsScrollContext();
  const { grid } = useAIContext();

  console.log(currentSection);

  return (
    <div className="relative mx-auto mt-[44px] flex max-w-[1300px] items-start gap-[30px]">
      <div className="sticky top-[114px] h-1 min-h-[85vh] flex-grow">
        <div className="h-full w-full rounded-[20px] border bg-white p-[7px] shadow-realistic">
          <div className="flex h-full flex-col rounded-[13px] border bg-white">
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

      <div className="*:pb-[200px] flex max-w-sm flex-grow flex-col last:pb-0">
        <ResultSection section={Section.Overview}>
          <OverviewList />
        </ResultSection>
        <ResultSection section={Section.Breakdown}>
          <div className="h-[1000px]" />
        </ResultSection>
        <ResultSection section={Section.NextSteps}>
          <div className="h-[1000px]" />
        </ResultSection>
      </div>

      <div className="sticky top-1/2">{currentSection}</div>
    </div>
  );
}
