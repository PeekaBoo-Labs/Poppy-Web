import Bar from "@/components/general/Bar";
import { useAIContext } from "@/lib/ai/ai-context"
import { STI } from "@/lib/ai/question";
import QuestionnaireResultOverview from "./QuestionnaireResultOverview";
import { getInsight } from "@/lib/openai";
import { Suspense } from "react";
import QuestionnaireGPT from "./QuestionnaireGPT";

const iconLinks = [
  "/dataLow.svg",
  "/dataMed.svg",
  "/dataHigh.svg",
]

export default function QuestionnaireResultBreakdown() {

  const { answeredQuestions } = useAIContext();

  return (
    <div className="mt-[-16px] flex flex-col gap-[16px]">

      <div className="flex flex-col gap-[0]">
        {
          answeredQuestions.map((question, i) => {

            const choices = question.inputOptions.sort((a, b) => a.value - b.value)
            const chosenIndex = choices.findIndex(o => o.id == question.selected ?? "")
            const percent = 100 * ((chosenIndex + 1) / choices.length) ** (6 / choices.length)

            const riskFactors: [STI, number][] = Array.from(question.riskFactors)
              .filter(risk => risk[1] > 0)
              .map(risk => [risk[0], Math.ceil(risk[1])])

            return (
              riskFactors.length > 0 && <div key={i} className="flex flex-col gap-[10px] rounded-lg border border-secondary/0 p-5 transition-all hover:scale-[1.01] hover:border-secondary/5 hover:bg-stone-200/30">
                <Bar className="mb-2" percent={percent} />

                <h2 className="text-sm font-medium">{question.label}</h2>
                <p className="text-sm font-extralight text-secondary">{choices.find(o => o.id == question.selected ?? "")?.label}</p>

                {
                  chosenIndex != 0 && (
                    <>
                      <QuestionnaireGPT
                        question={question.label}
                        answer={choices[chosenIndex].label}
                        stis_detected={riskFactors.map(risk => risk[0])}
                      />
                      {
                        riskFactors.length > 0 && <span className="mt-5 flex gap-[10px]">
                          {
                            riskFactors.map((risk, i) => (
                              <span key={i} className="flex cursor-default select-none items-center justify-center rounded-full bg-primary px-2 py-1 text-[12px] text-white shadow-sm">
                                <img src={iconLinks[risk[1] - 1]} className="text-color mr-1" width={20} height={20} alt={""} />
                                {/* <span className="ml-[5px] mr-[8px] text-[10px]">{"!".repeat(risk[1])}</span> */}
                                {risk[0]}
                              </span>
                            ))
                          }
                        </span>
                      }
                    </>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
