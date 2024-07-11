import type { STI } from "@/lib/ai/question";
import Image from "next/image";
import { MouseEventHandler } from "react";

type PlantProps = {
  type: STI | "tree";
  coord: { x: number; y: number };
  center: { x: number; y: number };
  default_opacity: number;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
};

const RADIUS = 5;

export default function Plant(props: PlantProps) {
  const { type, coord, center, default_opacity, onMouseEnter } = props;

  const magnitude = (center.x - coord.x) ** 2 + (center.y - coord.y) ** 2;

  return (
    <div
      onMouseEnter={onMouseEnter}
      style={{
        opacity: Math.max(0, 1 - magnitude / RADIUS ** 2) + default_opacity,
        transition: "opacity 0.2s",
      }}
    >
      <Image src="/tree.png" width={30} height={30} alt={type} />
      {/* {`${coord.x},${coord.y}`} */}
    </div>
  );
}
