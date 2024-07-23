import { STI } from "@/lib/ai/question";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { IMAGE } from "./STIUI";

type PlantProps = {
  type: STI | "tree";
  coord: { x: number; y: number };
  center: { x: number; y: number };
  default_opacity: number;
  focusedOnGarden: boolean;
  focusOne: STI | null;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
};

const RADIUS = 6;

export default function Plant(props: PlantProps) {
  const {
    type,
    coord,
    center,
    default_opacity,
    focusedOnGarden,
    focusOne,
    onMouseEnter,
  } = props;

  const focusOneFlowerType = focusOne != null;
  const focusMe = focusOne == type;

  const magnitude = (center.x - coord.x) ** 2 + (center.y - coord.y) ** 2;
  const gradient = Math.max(0, 1 - magnitude / RADIUS ** 2);

  // CSS values
  // const flowerScale = focusMe ? 1.2 : focusedOnGarden ? gradient / 5 + 1 : 1;
  const flowerScale = gradient == 1 ? 1.5 : 1;
  const flowerOpacity = focusMe
    ? 1
    : focusedOnGarden
      ? gradient + default_opacity
      : focusOneFlowerType
        ? 0.5
        : 1;

  return (
    <div
      onMouseEnter={onMouseEnter}
      className="aspect-square hover:scale-105"
      style={{
        filter: `saturate(${focusOneFlowerType && !focusMe ? 0 : 1})`,
        transform: `scale(${flowerScale})`,
        opacity: flowerOpacity,
        transition: "all 2s cubic-bezier(.07,.83,.13,.92)",
      }}
    >
      <Image
        className="w-full"
        src={IMAGE[type]}
        width={30}
        height={30}
        alt={type}
      />
    </div>
  );
}
