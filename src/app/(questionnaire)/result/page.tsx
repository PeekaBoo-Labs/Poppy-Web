'use client'

import { useAIContext } from "@/lib/ai/ai-context"
import Link from "next/link"
import QuestionnaireResults from "../(questionnaire)/QuestionnaireResults"

export default function ResultPage() {

  return (
    <div className="mt-[105px] flex flex-grow flex-col">
      <QuestionnaireResults />
    </div>
  )
}