'use client'

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import ProgressBar from "@/components/ProgressBar"
import QuestionnaireControls from "./QuestionnaireControls"
import QuestionnaireCard from "./QuestionnaireCard";

import { useEffect } from "react";

export default function QuestionnaireForm() {
  const {
    pageState,
    questionsState,
    diagnosisState,
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
    <div className="flex flex-col mx-4 max-w-[800px] h-[100vh] bg-[F1EFED] w-full">
      <ProgressBar index={page} total={Math.max(1, questions.length)} diagnosisState={diagnosisState} />

      {/* Tried my hardest to not use context here but i failed... */}
      <QuestionnaireCard questionsState={questionsState} page={page} diagnosisState={diagnosisState} handleBack={prevPage} handleNext={nextPage}/>
      
      {/* <QuestionnaireControls loading={questions[page] === null} handleBack={prevPage} handleNext={nextPage} diagnosisState={diagnosisState}/> */}
    </div>
  </>
}