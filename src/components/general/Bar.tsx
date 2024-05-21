import { cn } from "@/lib/utils";

export default function Bar({ className, percent }: { className?: string, percent: number }) {

  const color = percent > 50 ? "bg-primary" : "bg-[#D9D9D9]";

  return (
    <div className={cn("h-[5px] w-full rounded-full", className)}>
      <div className={cn("h-full rounded-full", color)} style={{ width: `${percent}%` }} />
    </div>
  )
}