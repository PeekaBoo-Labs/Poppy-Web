"use client";

import QuestionnaireCard from "./QuestionnaireCard";
import AIContextProvider from "@/lib/ai/ai-context";

export default function QuestionnaireForm() {
  return (
    <>
      <div className="m-4 mt-[105px] flex flex-grow flex-col">
        {/* <ProgressBar index={page} total={Math.max(1, questions.length)} diagnosisState={diagnosisState} /> */}
        <QuestionnaireCard />
      </div>
    </>
  );
}

