import { STI } from "@/lib/ai/question";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { DESC, IMAGE, LEARN } from "./STIUI";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Variants, motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

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
    <Link href={LEARN[type]} target="_blank">
      <motion.div
        variants={fadeUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        data-focused={focused}
        className={cn(
          "group relative flex cursor-pointer flex-col gap-2 border-t p-4 md:rounded-[12px] md:border md:border-transparent",
          "data-[focused=true]:border-border data-[focused=true]:bg-white data-[focused=true]:shadow-realistic",
        )}
      >
        <span
          className={cn(
            "absolute right-4 top-4 flex items-center gap-1 transition-all duration-1000 ease-velocity md:translate-y-5 md:opacity-0",
            "group-data-[focused=true]:translate-y-0 group-data-[focused=true]:opacity-100",
          )}
        >
          <span className="text-[11px] text-secondary hover:underline">
            <span className="md:hidden">Click to learn</span>
            <span className="hidden md:inline">Learn</span>
          </span>
          <Image src={"/arrowUpRight.svg"} width={11} height={11} alt="" />
        </span>
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
      </motion.div>
    </Link>
  );
}
