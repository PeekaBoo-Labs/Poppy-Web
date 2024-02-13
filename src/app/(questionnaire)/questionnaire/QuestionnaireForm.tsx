'use client'

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import ProgressBar from "@/components/ProgressBar"
import QuestionnaireControls from "./QuestionnaireControls"
import QuestionnaireCard from "./QuestionnaireCard";

import { useEffect } from "react";
import AIContextProvider from "@/lib/ai/ai-context";

export default function QuestionnaireForm() {
  return <>
    <div className="flex flex-col max-w-[1050px] mt-[140px] bg-[F1EFED]">
      {/* <ProgressBar index={page} total={Math.max(1, questions.length)} diagnosisState={diagnosisState} /> */}

      <AIContextProvider>
        <QuestionnaireCard />
      </AIContextProvider>
    </div>
  </>
}