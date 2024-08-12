import { STI } from "@/lib/ai/question";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { DESC, IMAGE, LEARN } from "./STIUI";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Variants, motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import ArrowUpRight from "@/lib/icons/arrow-up-right";

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
          "group relative flex cursor-pointer flex-col items-center justify-center gap-2 border-t px-[21px] py-[19px] md:rounded-[12px] md:border-none",
        )}
      >
        <div className="flex items-center gap-[21px]">
          <Image
            className="aspect-square object-contain"
            src={IMAGE[type]}
            width={39}
            height={39}
            alt=""
          />
          <div className="flex flex-1 flex-col">
            <h3 className="text-sm font-medium transition-all group-hover:text-[#F1BC00]">
              {type}
            </h3>
            <p className="text-sm text-secondary transition-all group-hover:text-[#F1BC00]">
              {DESC[type]}
            </p>
          </div>
          <ArrowUpRight className="text-primary group-hover:text-[#F1BC00]" />
        </div>

        <div className="absolute box-border h-full w-full rounded-[12px] border border-border transition-all group-hover:border-2 group-hover:border-[#F1BC00]" />
      </motion.div>
    </Link>
  );
}
