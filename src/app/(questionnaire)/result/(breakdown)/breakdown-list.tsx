import { useAIContext } from "@/lib/ai/ai-context";
import PlusCircle from "@/lib/icons/plus-circle";

export default function BreakdownList() {
  const { answeredQuestions } = useAIContext();

  return (
    <div className="flex flex-col gap-[10px]">
      {answeredQuestions.map((question, index) => (
        <div
          className="flex items-center gap-[21px] rounded-[13px] border border-border px-[21px] py-[19px]"
          key={index}
        >
          <div className="flex-grow basis-0 font-semibold">
            {question.label}
          </div>
          <PlusCircle className="h-[16px] w-[16px] text-primary" />
        </div>
      ))}
    </div>
  );
}
