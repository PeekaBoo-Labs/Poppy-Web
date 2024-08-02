import FlowerBed from "@/components/results/FlowerBed";
import FlowerCard from "@/components/results/FlowerCard";
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
      <div className="items-center gap-4 lg:gap-[100px] flex flex-col lg:flex-row">
        <div className="lg:max-w-none max-w-[500px]">
          <FlowerBed grid={grid} />
        </div>
        <div className="lg:w-[389px]">
          <div className="mb-8 flex flex-col gap-8 px-4">
            <span className="m-4 rounded-lg border border-border p-2 text-center lg:text-left md:m-0">
              🚧 Hang tight! This page is currently under construction.{" "}
            </span>
            <p className="text-secondary text-center lg:text-left lg:max-w-none max-w-sm mx-auto">
              We&apos;ve created this visual garden to represent sexual health
              factors that may be relevant to you, based on your responses.
            </p>
          </div>
          <div className="flex flex-col md:gap-1">
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
