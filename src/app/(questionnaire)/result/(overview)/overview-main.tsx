import FlowerBed from "@/components/results/FlowerBed";
import { useAIContext } from "@/lib/ai/ai-context";

export default function OverviewMain() {
  const { grid } = useAIContext();

  return (
    <div className="flex h-full flex-col justify-center p-[7%] lg:p-[20%]">
      <FlowerBed grid={grid} />
    </div>
  );
}
