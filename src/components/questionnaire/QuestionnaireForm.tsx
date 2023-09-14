'use client'

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import ProgressBar from "../ProgressBar"
import QuestionnairePage from "../QuestionnairePage"

export default function QuestionnaireForm() {
  const { pageState, questionsState } = useQuestionnaireContext();

  const [page, setPage] = pageState;
  const [questions, setQuestions] = questionsState;

  return <>
    <div className="flex flex-col mx-4 max-w-[750px] mt-[70px] min-h-screen">
      <ProgressBar index={page} total={questions.length} />

      {/* <QuestionnaireForm /> */}
    </div>
  </>
}