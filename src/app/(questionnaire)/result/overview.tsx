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
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-[100px]">
        {grid.length > 0 ? (
          <>
            <div className="max-w-[500px] lg:max-w-none">
              <FlowerBed grid={grid} />
            </div>
            <div className="lg:w-[389px]">
              <div className="mb-8 flex flex-col gap-8 px-4">
                <span className="m-4 rounded-lg border border-border p-2 text-center md:m-0 lg:text-left">
                  🚧 Hang tight! This page is currently under construction.{" "}
                </span>
                <p className="mx-auto max-w-sm text-center text-secondary lg:max-w-none lg:text-left">
                  We&apos;ve created this visual garden to represent sexual
                  health factors that may be relevant to you, based on your
                  responses.
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
          </>
        ) : (
          <p>Loading your results Pauly boy</p>
        )}
      </div>
    </ResultSidebar>
  );
}
