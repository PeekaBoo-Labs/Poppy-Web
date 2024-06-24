import { Suspense } from "react"
import QuestionnaireResults from "./QuestionnaireResults"

export default function ResultPage() {
  return (
    <div className="mt-[105px] flex flex-grow flex-col">
      <QuestionnaireResults />
    </div>
  )
}