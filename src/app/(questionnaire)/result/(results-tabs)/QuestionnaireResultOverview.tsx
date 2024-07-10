import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/question";

export default function QuestionnaireResultOverview() {
  const { calculateOutput } = useAIContext();
  const output: AIOutput = calculateOutput();

  const sortedRisks = Array.from(output.risks).sort((a, b) => b[1] - a[1]);

  return <>
    <h1 className="text-xl font-medium">Screening Results</h1>

    <div className="flex gap-2 rounded-lg bg-amber-200 p-2">
      <span className="h-full w-1 rounded-full bg-primary" />
      <span className="text-xs">
        STIs are often <u>asymptomatic</u>. When symptoms occur, they can be non-specific.
      </span>
    </div>

    <div className="flex flex-wrap gap-[16px]">
      {
        sortedRisks.map(([sti, score]) => {
          return (
            <div key={sti} className="flex h-[100px] w-[160px] flex-col justify-between rounded-lg border p-3 transition-all hover:scale-[1.05] hover:bg-stone-200/50">
              <h2 className="font-regular text-sm text-secondary">{sti}</h2>
              <p className="text-3xl font-semibold tracking-tight text-primary">
                {(score * 10).toFixed(0)}
                <span className="text-sm">pts</span>
              </p>
            </div>
          )
        })
      }

      <div className="flex h-[100px] w-[160px] flex-col justify-between rounded-lg border border-dashed p-3 transition-all">
        <h2 className="font-regular text-sm text-secondary">Coming soon...</h2>
      </div>
    </div>
  </>
}
