import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import ResultSection from "./result-section";
import FlowerBed from "@/components/results/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";

export default function ResultContainer() {
  const { currentSection } = useResultsScrollContext();
  const { grid } = useAIContext();

  console.log(currentSection);

  return (
    <div className="relative flex items-start gap-[30px]">
      <div className="sticky top-[70px] min-h-[85vh] flex-grow outline outline-blue-500">
        <div className="border bg-white p-[120px]">
          <FlowerBed grid={grid} />
        </div>
      </div>

      <div className="flex-grow">
        <ResultSection section={Section.Overview}>hi</ResultSection>
        <ResultSection section={Section.Breakdown}>hi</ResultSection>
        <ResultSection section={Section.NextSteps}>hi</ResultSection>
      </div>
    </div>
  );
}
