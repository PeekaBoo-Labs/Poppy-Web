import { STI } from "@/lib/ai/question";
import Image from "next/image";
import { MouseEventHandler } from "react";

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

  const focusMode = focusOne != null;
  const focusMe = focusOne == type;

  const magnitude = (center.x - coord.x) ** 2 + (center.y - coord.y) ** 2;
  const gradient = Math.max(0, 1 - magnitude / RADIUS ** 2);

  // CSS values
  const flowerScale = focusedOnGarden ? gradient / 5 + 1 : 1;
  const flowerOpacity = focusedOnGarden ? gradient + default_opacity : 1;

  return (
    <div
      onMouseEnter={onMouseEnter}
      className="aspect-square hover:scale-105"
      style={{
        transform: `scale(${flowerScale})`,
        opacity: flowerOpacity,
        transition: "all 2s cubic-bezier(.07,.83,.13,.92)",
      }}
    >
      {type == "tree" ? (
        <Image
          className="w-full"
          src="/emojis/tree.png"
          width={30}
          height={30}
          alt={type}
        />
      ) : type == STI.Syphilis ? (
        <Image
          className="w-full"
          src="/emojis/hibiscus.png"
          width={30}
          height={30}
          alt={type}
        />
      ) : type == STI.Gonorrhoea ? (
        <Image
          className="w-full"
          src="/emojis/blossom.png"
          width={30}
          height={30}
          alt={type}
        />
      ) : type == STI.Chlamydia ? (
        <Image
          className="w-full"
          src="/emojis/cherry.png"
          width={30}
          height={30}
          alt={type}
        />
      ) : type == STI.GenitalWarts ? (
        <Image
          className="w-full"
          src="/emojis/lotus.png"
          width={30}
          height={30}
          alt={type}
        />
      ) : (
        <div className="text-center">{type[0]}</div>
      )}
    </div>
  );
}
