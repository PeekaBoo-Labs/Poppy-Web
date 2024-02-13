import { LongButton } from "../../../components/Buttons";
import { type Diagnosis } from "@/lib/types/diagnosis";
import { StateType } from "@/lib/types/types";
export default function QuestionnaireControls({
  loading, handleBack, handleNext, diagnosisState
}: {
  loading: boolean,
  handleBack: () => void,
  handleNext: () => void,
  diagnosisState: StateType<(null | Diagnosis)>;
}) {
  const [diagnosis,] = diagnosisState
  return (
    <div className="flex w-full">
      {diagnosis !== null ? <>

      </> :
        <>
          <LongButton type="secondaryFull" onClick={handleBack}>Back</LongButton>
          <LongButton type="primaryFull" onClick={handleNext}>Next</LongButton>
        </>
      }
    </div>
  );
}