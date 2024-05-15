'use client'

import { Suspense } from "react"
import QuestionnaireResults from "../(questionnaire)/QuestionnaireResults"

export default function ResultPage() {
  return (
    <div className="mt-[105px] flex flex-grow flex-col">
      <Suspense>
        <QuestionnaireResults />
      </Suspense>
    </div>
  )
}