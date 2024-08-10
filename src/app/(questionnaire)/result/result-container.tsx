import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import ResultSection from "./result-section";

export default function ResultContainer() {
  const { visibleSections } = useResultsScrollContext();

  console.log(JSON.stringify(visibleSections));

  return (
    <div className="relative flex items-start">
      <div className="sticky top-[70px] flex-grow outline outline-blue-500">
        <h1>{JSON.stringify(visibleSections)}</h1>
      </div>

      <div className="flex-grow">
        <ResultSection section={Section.Overview} />
        <ResultSection section={Section.Breakdown} />
        <ResultSection section={Section.NextSteps} />
      </div>
    </div>
  );
}
