import FlowerBed from "@/components/endscreen/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/question";
import Image from "next/image";

import type { STI } from "@/lib/ai/question";
import { LongButton } from "@/components/Buttons";

export default function QuestionnaireResultOverview() {
  const { calculateOutput } = useAIContext();

  const output: AIOutput = calculateOutput();
  const sortedRisks: [STI, number][] = Array.from(output.risks).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <>
      <div className="min-h flex justify-between gap-[39px]">
        {" "}
        {/* Hero section right */}
        <div className="flex-grow">
          <div className="flex cursor-pointer gap-4 rounded-lg border bg-white p-4 transition-all duration-1000 ease-velocity hover:shadow-lg">
            <div className="relative aspect-square self-start rounded-full border bg-white shadow-sm">
              <Image
                className="p-2"
                src={"/emojis/cherry.png"}
                width={70}
                height={70}
                alt=""
              />
              <span className="absolute bottom-[-8px] right-[-8px] rounded-full border px-2 text-xs shadow-sm backdrop-blur-sm">
                &times;2
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <h2 className="text-lg font-medium">Chlamydia</h2>
              <p className="text-xs text-secondary">
                Often has no symptoms but can cause serious health problems,
                even without symptoms.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[50%] flex-grow pr-10">
          <div className="mb-14">
            <h1 className="mb-3 text-2xl font-semibold">Your Garden</h1>
            <p className="text-sm text-secondary">
              Based on your responses, this garden illustrates potential sexual
              health considerations relevant to you.
            </p>
          </div>{" "}
          <FlowerBed sti_scores={sortedRisks} />
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
          </div>
          <div className="h-[200px]"></div>
        </div>
      </div>
    </>
  );
}
