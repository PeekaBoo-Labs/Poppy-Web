import { cn } from "@/lib/utils";

export default function QuestionInputOption({
  text, selected, onClick
}: {
  text: string,
  selected: boolean,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative px-[16px] py-[13px] rounded-[13px] min-w-[75px]",
        selected ? 'bg-accent' : 'hover:text-accent-darker'
      )}
    >
      <div className={cn(
        "absolute inset-0 rounded-[13px] border border-border group-hover:border-[2px] ",
        selected ? 'border-accent' : 'group-hover:border-accent-darker'
      )} />
      {text}
    </button>
  );
}
