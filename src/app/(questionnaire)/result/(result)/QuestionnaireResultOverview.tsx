import FlowerBed from "@/components/endscreen/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import Image from "next/image";

import { LongButton } from "@/components/Buttons";
import FlowerCard from "@/components/endscreen/FlowerCard";
import { STI } from "@/lib/ai/question";
import {
  OverviewFocusState,
  useFlowerContext,
} from "@/lib/contexts/FlowerContext";
import Link from "next/link";

export default function QuestionnaireResultOverview() {
  const { grid } = useAIContext();
  const { focusedObject, setFocusState, setFocusedObject } = useFlowerContext();

  return (
    <>
      <div className="min-h flex justify-between gap-[59px]">
        <div className="flex flex-grow flex-col gap-4">
          {[STI.GenitalWarts, STI.Syphilis, STI.Chlamydia, STI.Gonorrhoea].map(
            (sti: STI) => {
              return (
                <FlowerCard
                  type={sti}
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
        <div className="max-w-[50%] flex-grow pr-10">
          <div className="mb-14">
            <h1 className="mb-3 text-2xl font-semibold">Your Garden</h1>
            <p className="text-sm text-secondary">
              Based on your responses, this garden illustrates potential sexual
              health considerations relevant to you.
            </p>
          </div>
          <FlowerBed gridSize={11} grid={grid} />
          <div className="mt-10 flex items-center justify-center gap-1 text-center text-xs text-secondary opacity-50">
            <Image
              className="object-contain"
              src="/icons/glassplus.svg"
              width={13}
              height={13}
              alt=""
            />
            Hover to interact
          </div>
          <div className="mt-8">
            <Link href={"?tab=breakdown"}>
              <LongButton type="primaryFullNext">
                <span className="flex gap-2">
                  <Image
                    className="object-contain"
                    src="/icons/step2.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Response breakdown
                </span>
              </LongButton>
            </Link>
          </div>
          <div className="h-[200px]"></div>
        </div>
      </div>
    </>
  );
}
