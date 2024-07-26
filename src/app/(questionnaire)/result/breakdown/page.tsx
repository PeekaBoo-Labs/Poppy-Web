"use client";

import { useAIContext } from "@/lib/ai/ai-context";
import { QuestionInput, STI, Tag } from "@/lib/ai/question";
import QuestionnaireGPT from "../(result)/QuestionnaireGPT";
import ResultSidebar from "../sidebar";
import { Question } from "@/lib/ai/question";
import Link from "next/link";
import { LEARN } from "@/components/endscreen/STIUI";

const iconLinks = ["/dataLow.svg", "/dataMed.svg", "/dataHigh.svg"];

type QuestionWithMetadata = {
  question: Question;
  choices: QuestionInput[];
  chosenIndex: number;
  percent: number;
  riskFactors: [STI, number][];
};

export default function ResultBreakdown() {
  const { answeredQuestions } = useAIContext();

  const answeredQuestionsWithMetadata = answeredQuestions.map(
    (question: Question) => {
      const choices = question.inputOptions.sort((a, b) => a.value - b.value);
      const chosenIndex = choices.findIndex(
        (o) => o.id == question.selected ?? "",
      );
      const percent =
        100 * ((chosenIndex + 1) / choices.length) ** (6 / choices.length);

      const riskFactors: [STI, number][] = Array.from(question.riskFactors)
        .filter((risk) => risk[1] > 0)
        .map((risk) => [risk[0], Math.ceil(risk[1])]);

      return {
        question: question,
        choices: choices,
        chosenIndex: chosenIndex,
        percent: percent,
        riskFactors: riskFactors,
      };
    },
  );

  // Hide non risky and those without a score
  const visibleQuestions = answeredQuestionsWithMetadata.filter(
    (q) => q.riskFactors.length > 0 && q.chosenIndex != 0,
  );

  return (
    <ResultSidebar slug="breakdown">
      <div className="mx-4 flex flex-col justify-between gap-8 md:flex-row-reverse md:gap-[89px]">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 rounded-lg bg-amber-200 p-2">
            <span className="h-full w-1 rounded-full bg-primary" />
            <span className="text-xs">
              STIs are often <u>asymptomatic</u>. When symptoms occur, they can
              be non-specific.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-white p-5 text-sm font-medium shadow-realistic">
            <h3>
              Behavioral risks:{" "}
              <span className="font-normal">
                {
                  visibleQuestions.filter((q) =>
                    q.question.tags.includes(Tag.Behavioral),
                  ).length
                }
              </span>
            </h3>
            <h3>
              Symptomatic risks:{" "}
              <span className="font-normal">
                {
                  visibleQuestions.filter((q) =>
                    q.question.tags.includes(Tag.Symptom),
                  ).length
                }
              </span>
            </h3>
          </div>
        </div>

        <div className="mx-4 flex flex-col gap-10 md:mx-0 md:max-w-lg">
          {visibleQuestions.length == 0 && (
            <p className="rounded-lg border bg-white p-4 text-sm">
              <span className="font-medium">
                Some STIs can be acquired without direct sexual contact
              </span>
              , primarily through mother-to-child transmission during pregnancy,
              childbirth, or breastfeeding. While less common, a few STIs can
              also spread through contact with contaminated objects or surfaces,
              though this route of transmission is rare for most STIs.
            </p>
          )}

          {visibleQuestions.map((metadata: QuestionWithMetadata, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-[10px] rounded-lg border border-secondary/0"
              >
                {/* <Bar className="mb-2" percent={percent} /> */}

                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold">
                    {metadata.question.label}
                  </h2>
                  <p className="whitespace-nowrap text-sm font-extralight italic">
                    {
                      metadata.choices.find(
                        (o) => o.id == metadata.question.selected ?? "",
                      )?.label
                    }
                  </p>
                </div>

                <QuestionnaireGPT
                  question={metadata.question.label}
                  answer={metadata.choices[metadata.chosenIndex].label}
                  stis_detected={metadata.riskFactors.map((risk) => risk[0])}
                />
                <span className="mt-5 flex flex-wrap gap-[10px]">
                  {metadata.riskFactors.map((risk, i) => (
                    <Link
                      target="_blank"
                      href={LEARN[risk[0]]}
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
                        width={11}
                        height={11}
                      />
                    </Link>
                  ))}
                </span>
              </div>
            );
          })}

          {/* little bit of space here */}
          <span className="h-[20px]"></span>
        </div>
      </div>
    </ResultSidebar>
  );
}
