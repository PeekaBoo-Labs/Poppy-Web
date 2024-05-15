'use client'

import { motion } from "framer-motion"
import { CardState } from "./page"
import { useEffect, useState } from "react"

export default function FlipCard({ state, children }: { state: CardState, children?: React.ReactNode }) {

  const [cardAnimation, setCardAnimation] = useState({})
  const [shadowAnimation, setShadowAnimation] = useState({})

  useEffect(() => {
    setCardAnimation({
      leftChosen: {
        transform: `translateX(-${window.innerWidth}px) rotateY(-75deg) rotateX(-12deg) translateZ(80px) rotate(0deg)`,
        transition: transition,
      },

      rightChosen: {
        transform: `translateX(${window.innerWidth}px) rotateY(75deg) rotateX(-12deg) translateZ(80px) rotate(0deg)`,
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
      second: {
        transform: "translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px) rotate(6deg)",
        transition: transition,
      },

      third: {
        transform: "translateX(0px) rotateY(0deg) rotateX(0deg) translateZ(0px) rotate(12deg)",
        transition: transition,
      }
    })

    setShadowAnimation({
      leftChosen: {
        transform: `translateY(60px) translateX(-${window.innerWidth}px) skew(12deg, 30deg) scaleY(0.87) scaleX(1) rotate(0deg)`,
        transition: transition,
      },

      rightChosen: {
        transform: `translateY(60px) translateX(${window.innerWidth}px) skew(-12deg, -30deg) scaleY(0.87) scaleX(1) rotate(0deg)`,
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
      second: {
        transform: "translateY(0px) translateX(0px) skew(0deg, 0deg) scaleY(1) scaleX(1) rotate(6deg)",
        transition: transition,
      },
      third: {
        transform: "translateY(0px) translateX(0px) skew(0deg, 0deg) scaleY(1) scaleX(1) rotate(12deg)",
        transition: transition,
      }
    })

  }, [])

  return <>
    <motion.div
      className="absolute flex h-[550px] w-[350px] items-center justify-center rounded-[30px] border-zinc-700 bg-[rgba(0,0,0,0.08)] text-3xl font-bold blur-[8px]"
      variants={shadowAnimation}
      initial="none"
      animate={state}
    />
    <motion.div
      variants={cardAnimation}
      initial="none"
      animate={state}
      style={{
        transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        borderLeft: state == "right" ? "6px solid rgba(0,0,0,0.05)" : "0px solid rgba(0,0,0,0.05)",
        borderRight: state == "left" ? "6px solid rgba(0,0,0,0.05)" : "0px solid rgba(0,0,0,0.05)",
        boxShadow: state != "none" ? "0 0 0 rgba(0,0,0,0)" : ""
      }}
      className="absolute flex h-[550px] w-[350px] flex-col items-center justify-around rounded-[30px] border-zinc-700 bg-stone-100 text-3xl font-bold"
    >
      Flip the Card

      {children}

      <img src="https://source.unsplash.com/random" className="object-fit h-[250px] w-[250px]" alt="" />
    </motion.div>
  </>
}


const transition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
}