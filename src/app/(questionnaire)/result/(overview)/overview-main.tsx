import FlowerBed from "@/components/results/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";
import { fadeUp, fadeUpParent } from "@/lib/motion";
import { motion } from "framer-motion";

export default function OverviewMain() {
  const { grid } = useAIContext();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex h-full flex-col justify-center p-[7%] lg:p-[20%]"
    >
      <FlowerBed grid={grid} />
    </motion.div>
  );
}
