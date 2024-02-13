import { useState } from "react";
import { motion } from "framer-motion";

import QuestionInputOption from "../../../components/QuestionOption";
import Title from "../../../components/Title";

import Dots from "../../../components/general/animated/dots";

import { useAIContext } from "@/lib/ai/ai-context";
import { LongButton } from "../../../components/Buttons";
import ProgressBar from "../../../components/ProgressBar";
import QuestionnaireResults from "./QuestionnaireResults";
import SelectOneInputType from "./input-types/SelectOneInputType";
import { Question, QuestionInput } from "@/lib/ai/questions";

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
  } else {
    currentQuestion = answeredQuestions[answeredQuestions.length - page];
  }

  return (
    <>
      {
        !currentQuestion ? <QuestionnaireResults /> :
          <div className="flex flex-row flex-grow bg-[#F1EFED] w-[1050px] h-[600px] gap-4">
            <div className="rounded-[20px] border border-[#D9D9D9] p-1 flex flex-col w-[55%]">
              <div className="flex-grow flex align-middle items-center justify-center">
                <Title className="text-center mb-8 px-10 text-3xl align-middle">
                  {currentQuestion.label}
                </Title>
              </div>
              <ProgressBar
                index={Math.max(0, answeredQuestions.length - page)}
                total={Math.max(1, answeredQuestions.length + 1)}
              />
            </div>

            <div className="flex flex-col justify-between px-5 flex-grow ">
              <div>
                <p className="text-3xl font-semibold mb-5 max-w-sm">Choose one of the following options</p>
                <div className="flex flex-col gap-1 ">
                  <SelectOneInputType
                    inputOptions={currentQuestion.inputOptions}
                    answer={answer}
                    setAnswer={
                      x => setAnswer(x)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-10 items-center justify-center">
                <div className="col-span-2 text-left">
                  <LongButton
                    type="secondaryFullBack"
                    onClick={handleBack}
                  ></LongButton>
                </div>
                <div className="col-span-8 text-left">
                  <LongButton type="primaryFullNext" onClick={handleNext}>
                    Next Question
                  </LongButton>
                </div>
              </div>
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
        className="text-center mb-4 px-10 font-[400] text-gray-400 opacity-0"
      >
        Working to give you the best results
      </motion.h5>
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="title text-center mb-8 px-10"
      >
        Loading
        <Dots />
      </motion.span>
    </>
  );
}
