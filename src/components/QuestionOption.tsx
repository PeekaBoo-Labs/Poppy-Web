import { ANIMATION, cn } from "@/lib/utils";

export default function QuestionInputOption({
  text,
  selected,
  equalWidth,
  onClick,
}: {
  text: string;
  selected: boolean;
  equalWidth?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative min-w-[75px] rounded-[13px] px-[16px] py-[13px] font-medium",
        equalWidth && "flex-grow",
        ANIMATION,
        selected ? "bg-accent" : "hover:text-accent-darker",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[13px] border border-border transition-all group-hover:border-2",
          ANIMATION,
          selected ? "border-accent" : "group-hover:border-accent-darker",
        )}
      />
      {text}
    </button>
  );
}
