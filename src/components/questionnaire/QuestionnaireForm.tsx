'use client'

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import ProgressBar from "@/components/ProgressBar"
import QuestionnaireControls from "./QuestionnaireControls"
import QuestionnaireCard from "./QuestionaireCard";

export default function QuestionnaireForm() {
  const {
    pageState,
    questionsState,
    prevPage,
    nextPage
  } = useQuestionnaireContext();

  const [page, setPage] = pageState;
  const [questions,] = questionsState;

  return <>
    <div className="flex flex-col mx-4 max-w-[750px] mt-[70px] h-[90vh] mb-[10vh] w-full">
      <ProgressBar index={page} total={Math.max(1, questions.length)} />

      <QuestionnaireCard question={questions[page]}></QuestionnaireCard>

      <QuestionnaireControls handleBack={prevPage} handleNext={nextPage} />
    </div>
  </>
}