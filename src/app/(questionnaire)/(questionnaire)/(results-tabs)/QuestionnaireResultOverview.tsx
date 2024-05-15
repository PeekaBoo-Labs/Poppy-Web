import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/question";

export default function QuestionnaireResultOverview() {
  const { calculateOutput } = useAIContext();
  const output: AIOutput = calculateOutput();

  const sortedRisks = Array.from(output.risks).toSorted((a, b) => b[1] - a[1]);

  return <>
    <h1 className="text-xl font-medium">Your screening results:</h1>

    <div className="flex flex-col">
      {
        sortedRisks.map(([sti, score]) => {
          return (
            <div key={sti} className="flex items-center gap-[16px]">
              <h2 className="text-md font-medium">{sti}</h2>
              <p className="text-base">{score}</p>
            </div>
          )
        })
      }
    </div>
  </>
}