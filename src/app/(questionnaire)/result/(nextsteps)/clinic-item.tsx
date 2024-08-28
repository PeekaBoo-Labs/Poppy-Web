import { Clinic } from "@/app/api/v2/getClinics/route";
import ArrowUpRight from "@/lib/icons/arrow-up-right";
import { blurVariant, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion(Link);

export default function ClinicItem({ clinic }: { clinic: Clinic }) {
  return (
    <MotionLink
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex flex-col gap-[16px] overflow-hidden rounded-[13px] border border-border"
      href={clinic.link}
      target="_blank"
    >
      <img
        src={clinic.images[0]}
        className="h-[180px] w-full overflow-hidden object-cover"
        alt=""
        height={180}
      />

      <div className="flex items-center px-[21px]">
        <h3 className="flex-1 font-semibold">{clinic.name}</h3>
        <ArrowUpRight width={16} height={16} />
      </div>

      <div className="mx-[21px] space-y-[5px] border-t border-border pb-[19px] pt-4 text-[14px] text-secondary">
        <div>
          {clinic.city}, {clinic.state}
        </div>

        <div>{clinic.phone}</div>
      </div>
    </MotionLink>
  );
}
