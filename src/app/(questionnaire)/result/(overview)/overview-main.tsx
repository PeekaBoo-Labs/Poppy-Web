import FlowerBed from "@/components/results/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";

export default function OverviewMain() {
  const { grid } = useAIContext();

  return (
    <div className="p-[120px]">
      <FlowerBed grid={grid} />
    </div>
  );
}
