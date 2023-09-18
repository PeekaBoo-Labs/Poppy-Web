import { LongButton } from "../Buttons";

export default function QuestionnaireControls({
  loading, handleBack, handleNext
}: {
  loading: boolean,
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