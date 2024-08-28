import { Section } from "@/lib/contexts/ResultsScrollContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ResultScrollBar({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const page = {
    [Section.Overview]: 0,
    [Section.Breakdown]: 1,
    [Section.NextSteps]: 2,
  }[section];

  return (
    <div
      className={cn(
        "sticky top-[114px] flex h-[85vh] w-[4px] flex-col justify-center gap-[13px]",
        className,
      )}
    >
      <div className="relative h-[79px] w-[4px] rounded-full bg-black">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: page * (13 + 4) }}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          className="absolute left-0 top-0 h-full w-full rounded-full bg-black"
        ></motion.div>
      </div>
      <div className="h-[4px] w-[4px] rounded-full bg-[#20222128]" />
      <div className="h-[4px] w-[4px] rounded-full bg-[#20222128]" />
    </div>
  );
}
