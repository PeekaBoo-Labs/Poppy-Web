"use client";

import QuestionnaireCard from "./QuestionnaireCard";

export default function QuestionnaireForm() {
  return (
    <>
      <div className="flex flex-grow flex-col md:mt-[25px] w-full max-w-[1300px] mx-auto relative">
        {/* <ProgressBar index={page} total={Math.max(1, questions.length)} diagnosisState={diagnosisState} /> */}
        <QuestionnaireCard />
      </div>
    </>
  );
}
