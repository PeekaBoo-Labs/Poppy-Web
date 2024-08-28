import FlowerCard from "@/components/results/FlowerCard";
import { useAIContext } from "@/lib/ai/ai-context";
import { STI } from "@/lib/ai/question";
import {
  OverviewFocusState,
  useFlowerContext,
} from "@/lib/contexts/FlowerContext";

export default function OverviewList() {
  const { grid, calculateOutput } = useAIContext();
  const { focusedObject, setFocusState, setFocusedObject } = useFlowerContext();

  const result = calculateOutput();
  const flatResult = Array.from(result.risks.entries()) as [STI, number][];
  const sortedResult = flatResult.sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-col md:gap-[13px]">
      {sortedResult.map(([sti]) => {
        const count = grid.filter((e) => e == sti).length;

        return (
          <FlowerCard
            key={sti}
            type={sti}
            count={count}
            focused={sti == focusedObject}
            onMouseLeave={() => {
              setFocusState(OverviewFocusState.None);
              setFocusedObject(null);
            }}
            onMouseEnter={() => {
              setFocusState(OverviewFocusState.Card);
              setFocusedObject(sti);
            }}
          />
        );
      })}
    </div>
  );
}
