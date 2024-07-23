"use client";

import Bar from "@/components/general/Bar";
import { useAIContext } from "@/lib/ai/ai-context";
import { STI } from "@/lib/ai/question";
import QuestionnaireGPT from "../(result)/QuestionnaireGPT";
import ResultSidebar from "../sidebar";

const iconLinks = ["/dataLow.svg", "/dataMed.svg", "/dataHigh.svg"];

export default function ResultBreakdown() {
  const { answeredQuestions } = useAIContext();

  return (
    <ResultSidebar slug="breakdown">
      <div className="mt-[-16px] flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[0]">
          {answeredQuestions.map((question, i) => {
            const choices = question.inputOptions.sort(
              (a, b) => a.value - b.value,
            );
            const chosenIndex = choices.findIndex(
              (o) => o.id == question.selected ?? "",
            );
            const percent =
              100 *
              ((chosenIndex + 1) / choices.length) ** (6 / choices.length);

            const riskFactors: [STI, number][] = Array.from(
              question.riskFactors,
            )
              .filter((risk) => risk[1] > 0)
              .map((risk) => [risk[0], Math.ceil(risk[1])]);

            return (
              riskFactors.length > 0 &&
              chosenIndex != 0 && (
                <div
                  key={i}
                  className="flex flex-col gap-[10px] rounded-lg border border-secondary/0 p-5"
                >
                  {/* <Bar className="mb-2" percent={percent} /> */}

                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold">{question.label}</h2>
                    <span className="text-sm font-extralight text-secondary">
                      {
                        choices.find((o) => o.id == question.selected ?? "")
                          ?.label
                      }
                    </span>
                  </div>

                  {chosenIndex != 0 && (
                    <>
                      <QuestionnaireGPT
                        question={question.label}
                        answer={choices[chosenIndex].label}
                        stis_detected={riskFactors.map((risk) => risk[0])}
                      />
                      {riskFactors.length > 0 && (
                        <span className="mt-5 flex gap-[10px]">
                          {riskFactors.map((risk, i) => (
                            <span
                              key={i}
                              className="transition-velocity group flex cursor-default select-none items-center justify-center rounded-[7px] border-border bg-[rgba(0,0,0,0.03)] px-2 py-1 text-[12px] transition-all hover:scale-[1.03] hover:bg-primary hover:text-white"
                            >
                              <img
                                src={iconLinks[risk[1] - 1]}
                                className="mr-1 invert group-hover:invert-0"
                                width={20}
                                height={20}
                                alt={""}
                              />
                              {/* <span className="ml-[5px] mr-[8px] text-[10px]">{"!".repeat(risk[1])}</span> */}
                              {risk[0]}

                              <img
                                className="ml-[7px]"
                                src={"/arrowUpRight.svg"}
                                width={13}
                                height={13}
                              />
                            </span>
                          ))}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
    </ResultSidebar>
  );
}
