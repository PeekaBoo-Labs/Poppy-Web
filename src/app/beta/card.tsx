'use client'

import { motion } from "framer-motion"
import { CardState } from "./page"

export default function FlipCard({ state, width, children }: { state: CardState, width: number, children?: React.ReactNode }) {

  const cardAnimation = {
    leftChosen: {
      transform: `translateX(-${width}px) rotateY(-75deg) rotateX(-12deg) translateZ(80px) rotate(0deg)`,
      transition: transition,
    },

    rightChosen: {
      transform: `translateX(${width}px) rotateY(75deg) rotateX(-12deg) translateZ(80px) rotate(0deg)`,
      transition: transition,
    },

    left: {
      transform: "translateX(-250px) rotateY(-45deg) rotateX(-12deg) translateZ(80px) rotate(0deg)",
      transition: transition,
    },
    right: {
      transform: "translateX(250px) rotateY(45deg) rotateX(-12deg) translateZ(80px) rotate(0deg)",
      transition: transition,
    },
    none: {
      transform: "translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px) rotate(0deg)",
      transition: transition,
    },
    init: {
      transform: "translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(0.5) rotate(0deg)",
      transition: transition,
    },
    second: {
      transform: "translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px) rotate(6deg)",
      transition: transition,
    },

    third: {
      transform: "translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px) rotate(12deg)",
      transition: transition,
    }
  }

  const shadowAnimation = {
    leftChosen: {
      transform: `translateY(60px) translateX(-${width}px) skew(12deg, 30deg) scaleY(0.87) scaleX(1) rotate(0deg)`,
      transition: transition,
    },

    rightChosen: {
      transform: `translateY(60px) translateX(${width}px) skew(-12deg, -30deg) scaleY(0.87) scaleX(1) rotate(0deg)`,
      transition: transition,
    },

    left: {
      transform: "translateY(60px) translateX(-100px) skew(12deg, 18deg) scaleY(0.87) scaleX(1.2) rotate(0deg)",
      transition: transition,
    },
    right: {
      transform: "translateY(60px) translateX(100px) skew(-12deg, -18deg) scaleY(0.87) scaleX(1.2) rotate(0deg)",
      transition: transition,
    },
    none: {
      transform: "translateY(0px) translateX(0px) skew(0deg, 0deg) scaleY(1) scaleX(1) rotate(0deg)",
      transition: transition,
    },
    init: {
      transform: "translateY(0px) translateX(0px) skew(0deg, 0deg) scaleY(1) scaleX(0.5) rotate(0deg)",
      transition: transition,
    },
    second: {
      transform: "translateY(0px) translateX(0px) skew(0deg, 0deg) scaleY(1) scaleX(1) rotate(6deg)",
      transition: transition,
    },
    third: {
      transform: "translateY(0px) translateX(0px) skew(0deg, 0deg) scaleY(1) scaleX(1) rotate(12deg)",
      transition: transition,
    }
  }

  return <>
    {/* Shadow */}
    <motion.div
      className="absolute flex aspect-[11/15] h-full items-center justify-center rounded-[20px] border-zinc-700 bg-[rgba(0,0,0,0.08)] text-3xl font-bold blur-[8px]"
      variants={shadowAnimation}
      initial={"init"}
      animate={state}
    />
    {/* Card */}
    <motion.div
      variants={cardAnimation}
      initial={"init"}
      animate={state}
      style={{
        transition: "border 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        borderLeft: state == "right" ? "6px solid rgba(0,0,0,0.05)" : "0px solid rgba(0,0,0,0.05)",
        borderRight: state == "left" ? "6px solid rgba(0,0,0,0.05)" : "0px solid rgba(0,0,0,0.05)",
        boxShadow: state != "none" ? "0 0 0 rgba(0,0,0,0)" : ""
      }}
      className="absolute flex aspect-[11/15] h-full flex-col items-center justify-around rounded-[20px] border-zinc-700 bg-stone-100"
    >
      {children}
    </motion.div>
  </>
}


const transition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
}