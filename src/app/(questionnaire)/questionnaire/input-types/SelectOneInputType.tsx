import QuestionInputOption from "@/components/QuestionOption";
import type { Question, QuestionInput } from "@/lib/ai/questions";

export default function SelectOneInputType({ inputOptions, answer, setAnswer }: {
  inputOptions: QuestionInput[],
  answer: string | undefined
  setAnswer: (answer: string) => void
}) {
  return (
    <div className="flex flex-col gap-1 ">
      {
        inputOptions.map(option => (
          <QuestionInputOption
            key={option.id}
            text={option.label}
            selected={answer === option.id}
            onClick={() => setAnswer(option.id)}
          />
        ))
      }
    </div>
  )
}