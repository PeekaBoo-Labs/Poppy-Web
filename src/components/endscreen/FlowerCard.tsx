import { STI } from "@/lib/ai/question";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { DESC, IMAGE } from "./STIUI";

type FlowerCardProps = {
  type: STI;
  focused: boolean;
  count: number;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
};

export default function FlowerCard({
  type,
  focused,
  count,
  onMouseLeave,
  onMouseEnter,
}: FlowerCardProps) {
  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      data-focused={focused}
      className="flex cursor-pointer gap-5 rounded-lg border bg-white p-4 transition-all duration-1000 ease-velocity data-[focused=true]:shadow-lg"
    >
      <div className="relative aspect-square self-start rounded-full border bg-white shadow-sm">
        <Image
          className="p-2"
          src={IMAGE[type]}
          width={60}
          height={60}
          alt=""
        />
        <span className="absolute bottom-[-8px] right-[-8px] rounded-full border px-2 text-xs shadow-sm backdrop-blur-sm">
          &times;{count}
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        <h2 className="text-lg font-medium">{type}</h2>
        <p className="text-xs text-secondary">{DESC[type]}</p>
      </div>
    </div>
  );
}
