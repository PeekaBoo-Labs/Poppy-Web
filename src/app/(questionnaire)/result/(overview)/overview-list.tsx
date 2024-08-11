import FlowerCard from "@/components/results/FlowerCard";
import { useAIContext } from "@/lib/ai/ai-context";
import { STI } from "@/lib/ai/question";
import {
  OverviewFocusState,
  useFlowerContext,
} from "@/lib/contexts/FlowerContext";

export default function OverviewList() {
  const { grid } = useAIContext();
  const { focusedObject, setFocusState, setFocusedObject } = useFlowerContext();

  return (
    <div className="flex flex-col md:gap-1">
      {[STI.GenitalWarts, STI.Syphilis, STI.Chlamydia, STI.Gonorrhoea].map(
        (sti: STI) => {
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
        },
      )}
    </div>
  );
}
