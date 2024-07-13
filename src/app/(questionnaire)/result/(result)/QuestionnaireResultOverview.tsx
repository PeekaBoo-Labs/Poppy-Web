import FlowerBed from "@/components/endscreen/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/question";

import type { STI } from "@/lib/ai/question";

export default function QuestionnaireResultOverview() {
  const { calculateOutput } = useAIContext();

  const output: AIOutput = calculateOutput();
  const sortedRisks: [STI, number][] = Array.from(output.risks).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <>
      <div className="flex justify-between gap-[39px] min-h">
        {" "}
        {/* Hero section right */}
        <div className="flex-grow">
          <div className="flex border p-2 rounded-lg"></div>
        </div>
        <div className="flex-grow max-w-[50%] pr-10">
          <div className="mb-14">
            <h1 className="mb-3 text-2xl font-semibold">Your Garden</h1>
            <p className="text-secondary text-sm">
              Access dependable information that empowers you to make
              knowledgeable decisions, ensuring your journey towards sexual
              health is informed and hassle-free.
            </p>
          </div>

          <FlowerBed sti_scores={sortedRisks} />
          <div className="h-[200px]"></div>
        </div>
      </div>
    </>
  );
}
