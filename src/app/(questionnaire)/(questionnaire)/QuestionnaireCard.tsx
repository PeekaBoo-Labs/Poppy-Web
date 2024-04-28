import { motion } from "framer-motion";
import { useState } from "react";
import Dots from "../../../components/general/animated/dots";

import Image from "next/image";
import { useAIContext } from "@/lib/ai/ai-context";
import { Question } from "@/lib/ai/questions";
import SelectOneInputType from "./input-types/SelectOneInputType";
import QuestionnaireResults from "./QuestionnaireResults";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function QuestionnaireCard() {

  const {
    questionsLeft,
    answeredQuestions,

    resetQuestions,
    answerQuestion,
    calculateOutput,
    getTopQuestion
  } = useAIContext();

  // If 0: show the current question; else show the previous questions
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState<string>();

  const router = useRouter();

  const handleBack = () => {
    setPage(Math.min(answeredQuestions.length, page + 1));
  }

  // Not the most robust way to handle multiple input types
  const handleNext = () => {
    if (page > 0) {
      setPage(page - 1);
      return;
    }

    const currQ = getTopQuestion();
    if (!currQ) return;

    const answerObj = currQ.inputOptions.find(x => x.id === answer);
    if (answerObj) {
      answerQuestion(answerObj)
      setAnswer(undefined);
    }
  }

  let currentQuestion: Question | undefined;

  if (page === 0) {
    currentQuestion = getTopQuestion();

    console.log(currentQuestion, questionsLeft, page)
    if (!currentQuestion && questionsLeft == 0) {
      router.push("/result");
      return null;
    }
  } else {
    currentQuestion = answeredQuestions[answeredQuestions.length - page];
  }

  return (
    <>
      {
        !currentQuestion ? null :
          <div className="flex flex-grow flex-row gap-[40px]">
            <div className="z-10 w-[60%] rounded-[20px] border border-border bg-secondary-background p-[7px] shadow-realistic">
              <div className="grid h-full w-full place-content-center rounded-[13px] border border-border p-[135px]">
                <h1 className="text-center text-xl font-medium">
                  {currentQuestion.label}
                </h1>
              </div>
              {/* <ProgressBar
                index={Math.max(0, answeredQuestions.length - page)}
                total={Math.max(1, answeredQuestions.length + 1)}
              /> */}
            </div>

            <div className="flex w-[1px] flex-shrink-0 flex-grow basis-0 flex-col justify-between">
              <div className="mt-[30px] flex flex-col gap-[20px]">
                <p className="max-w-sm text-secondary">Choose one or more options</p>

                <SelectOneInputType
                  inputOptions={currentQuestion.inputOptions}
                  answer={answer}
                  setAnswer={
                    x => setAnswer(x)
                  }
                />

              </div>


              <button className="group flex items-center justify-between rounded-[13px] border-2 border-primary bg-primary px-[16px] py-[13px] text-white hover:bg-transparent hover:text-primary" onClick={handleNext}>
                Next
                <svg width="16" height="13" viewBox="0 0 16 13" fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.6875 6.42676C15.6875 6.67578 15.5796 6.9248 15.3887 7.09912L9.93506 12.561C9.71924 12.7686 9.49512 12.8516 9.271 12.8516C8.74805 12.8516 8.37451 12.4863 8.37451 11.9883C8.37451 11.731 8.47412 11.5068 8.64014 11.3408L10.4995 9.45654L12.9482 7.21533L11.0142 7.33154L0.92041 7.33154C0.380859 7.33154 -0.000977077 6.96631 -0.000977124 6.42676C-0.000977171 5.89551 0.380859 5.52197 0.92041 5.52197L11.0142 5.52197L12.9565 5.63818L10.4995 3.39697L8.64014 1.5127C8.47412 1.35498 8.37451 1.13086 8.37451 0.873536C8.37451 0.375489 8.74805 0.00195373 9.27099 0.00195369C9.49512 0.00195367 9.71924 0.0932622 9.91846 0.28418L15.3887 5.75439C15.5796 5.93701 15.6875 6.17773 15.6875 6.42676Z"
                    fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
      }
    </>
  );
}

function LoadingLabel() {
  return (
    <>
      <motion.h5
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-4 px-10 text-center font-[400] text-gray-400 opacity-0"
      >
        Working to give you the best results
      </motion.h5>
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="title mb-8 px-10 text-center"
      >
        Loading
        <Dots />
      </motion.span>
    </>
  );
}
