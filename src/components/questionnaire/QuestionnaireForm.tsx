'use client'

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import ProgressBar from "@/components/ProgressBar"
import QuestionnaireControls from "./QuestionnaireControls"
import QuestionnaireCard from "./QuestionnaireCard";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function QuestionnaireForm() {
  const {
    pageState,
    questionsState,
    start,
    prevPage,
    nextPage
  } = useQuestionnaireContext();

  const [page,] = pageState;
  const [questions,] = questionsState;

  // First time appear, start the questionnaire
  useEffect(() => {
    start();
  }, []);

  return <>
    <div className="flex flex-col mx-4 max-w-[750px] mt-[70px] h-[90vh] mb-[10vh] w-full">
      <ProgressBar index={page} total={Math.max(1, questions.length)} />

      {/* Tried my hardest to not use context here but i failed... */}
      <QuestionnaireCard />

      <QuestionnaireControls loading={questions[page] === null} handleBack={prevPage} handleNext={nextPage} />
    </div>
  </>
}