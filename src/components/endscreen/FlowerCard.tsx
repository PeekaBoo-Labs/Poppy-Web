import { STI } from "@/lib/ai/question";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { DESC, IMAGE } from "./STIUI";
import { cn } from "@/lib/utils";

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
      className={cn(
        "flex cursor-pointer flex-col gap-2 rounded-[12px] border border-transparent p-4 transition-all ease-velocity",
        "data-[focused=true]:border-border data-[focused=true]:bg-white data-[focused=true]:shadow-realistic",
      )}
    >
      <div className="flex items-center gap-2">
        <Image
          className="aspect-square object-contain"
          src={IMAGE[type]}
          width={22}
          height={22}
          alt=""
        />
        <h3 className="font-medium">{type}</h3>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-xs text-secondary">{DESC[type]}</p>
      </div>
    </div>
  );
}
