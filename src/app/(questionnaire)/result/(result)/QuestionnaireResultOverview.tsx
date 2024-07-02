import FlowerBed from "@/components/endscreen/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/question";

export default function QuestionnaireResultOverview() {
  const { calculateOutput } = useAIContext();
  const output: AIOutput = calculateOutput();

  const sortedRisks = Array.from(output.risks).sort((a, b) => b[1] - a[1]);

  return <>
    <div className="flex flex-wrap z-0">
      <FlowerBed sti_scores={sortedRisks}/>
    </div>
  </>
}