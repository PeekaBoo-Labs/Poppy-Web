import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function ResultSection({
  section,
  title,
  subtitle,
  children,
}: {
  section: Section;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { show, hide, currentSection } = useResultsScrollContext();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end 0.5"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest == 1 || latest == 0) {
      hide(section);
    } else {
      show(section);
    }
  });

  return (
    <motion.section layout ref={ref}>
      <div className="flex flex-col gap-[20px] pt-[30px]">
        <div className="space-y-[5px] text-xl font-semibold">
          <h1 className="leading-[1.2em] text-secondary">{title ?? "Title"}</h1>
          <h2 className="leading-[1.2em]">{subtitle ?? "Subtitle"}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}
