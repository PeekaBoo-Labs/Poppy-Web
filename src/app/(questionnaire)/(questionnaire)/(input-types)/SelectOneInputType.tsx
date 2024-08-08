import QuestionInputOption from "@/components/QuestionOption";
import type { QuestionInput } from "@/lib/ai/question";

export default function SelectOneInputType({
  inputOptions,
  answer,
  setAnswer,
}: {
  inputOptions: QuestionInput[];
  answer: string | undefined;
  setAnswer: (answer: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-[13px]">
      {inputOptions.map((option) => (
        <QuestionInputOption
          key={option.id + option.label}
          text={option.label}
          selected={answer === option.id}
          equalWidth={inputOptions.length < 3}
          onClick={() => setAnswer(option.id)}
        />
      ))}
    </div>
  );
}
