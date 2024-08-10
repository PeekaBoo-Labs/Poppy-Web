import {
  Section,
  useResultsScrollContext,
} from "@/lib/contexts/ResultsScrollContext";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";

export default function ResultSection({ section }: { section: Section }) {
  const { show, hide, visibleSections } = useResultsScrollContext();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end 0.5"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest == 1 || latest == 0) {
      if (visibleSections.includes(section)) {
        hide(section);
      }
    } else {
      if (!visibleSections.includes(section)) {
        show(section);
      }
    }
  });

  return <section ref={ref} className="min-h-screen outline"></section>;
}
