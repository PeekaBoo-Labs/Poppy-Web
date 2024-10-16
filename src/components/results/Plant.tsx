import { STI } from "@/lib/ai/question";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { IMAGE, LEARN } from "./STIUI";
import Link from "next/link";
import { motion } from "framer-motion";
import { scaleVariantFast } from "@/lib/motion";

type PlantProps = {
  type: STI | "tree";
  coord: { x: number; y: number };
  center: { x: number; y: number };
  default_opacity: number;
  focusedOnGarden: boolean;
  focusOne: STI | null;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
};

const RADIUS = 5;

const MotionImage = motion(Image);

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
  const flowerScale = focusMe
    ? 1.2
    : focusedOnGarden
      ? gradient ** 5 / 3 + 1
      : 1;
  // const flowerScale = gradient == 1 ? 1.5 : 1;
  const flowerOpacity = focusMe
    ? 1
    : focusedOnGarden
      ? default_opacity + gradient
      : default_opacity;

  const Plant = (
    <div
      onMouseEnter={onMouseEnter}
      className="flex aspect-square items-center justify-center transition-all duration-[5000ms] ease-velocity hover:scale-105 hover:duration-[700ms]"
      style={{
        cursor: type != "tree" ? "pointer" : "default",
        filter: `saturate(${focusOneFlowerType && !focusMe ? 0 : 1}) ${focusMe ? "drop-shadow(0 0 15px #ffcc00)" : ""}`,
        transform: `scale(${flowerScale})`,
        opacity: flowerOpacity,
      }}
    >
      <MotionImage
        variants={scaleVariantFast}
        className="w-full"
        src={IMAGE[type]}
        width={30}
        height={30}
        alt={type}
      />
    </div>
  );

  if (type == "tree") {
    return Plant;
  } else {
    return (
      <Link href={LEARN[type]} target="_blank">
        {Plant}
      </Link>
    );
  }
}
