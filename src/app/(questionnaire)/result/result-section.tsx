import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function ResultSection({
  section,
  children,
}: {
  section: Section;
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
    <section ref={ref} className="outline">
      {children}
    </section>
  );
}
