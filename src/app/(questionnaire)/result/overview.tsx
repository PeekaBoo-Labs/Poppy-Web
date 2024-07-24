import FlowerBed from "@/components/endscreen/FlowerBed";
import FlowerCard from "@/components/endscreen/FlowerCard";
import { useAIContext } from "@/lib/ai/ai-context";
import { STI } from "@/lib/ai/question";
import {
  OverviewFocusState,
  useFlowerContext,
} from "@/lib/contexts/FlowerContext";
import ResultSidebar from "./sidebar";

export default function ResultOverview() {
  const { grid } = useAIContext();
  const { focusedObject, setFocusState, setFocusedObject } = useFlowerContext();

  return (
    <ResultSidebar slug="">
      <div className="min-h flex items-center gap-[100px]">
        <div className="mb-10">
          <FlowerBed grid={grid} />
        </div>
        <div className="w-[389px]">
          <div className="mb-4 flex flex-col gap-2 px-4">
            <p className="text-secondary">
              We&apos;ve created this visual garden to represent sexual health
              factors that may be relevant to you, based on your responses.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {[
              STI.GenitalWarts,
              STI.Syphilis,
              STI.Chlamydia,
              STI.Gonorrhoea,
            ].map((sti: STI) => {
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
        </div>
      </div>
    </ResultSidebar>
  );
}
