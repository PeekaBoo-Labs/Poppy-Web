'use client'

import { LongButton } from "../Buttons";
import { useQuestionnaireContext } from "@/contexts/questionnaire-context";


export default function QuestionnaireControls({
  handleBack, handleNext
}: {
  handleBack: () => void,
  handleNext: () => void,
}) {

  return (
    <div className="flex w-full">
      <LongButton type="secondaryFull" onClick={handleBack}>Back</LongButton>
      <LongButton type="primaryFull" onClick={handleNext}>Next</LongButton>
    </div>
  );
}