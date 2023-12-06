'use client'

import { useMotionValueEvent, useScroll, motion } from "framer-motion"
import { useRef, useState } from "react"

export default function Hero() {

  const text = "Take the guesswork out of your sexual health with Poppy."
  const textArray = text.split(" ")

  const scrollTarget = useRef(null)

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start", "end start"]
  })

  const [percentProgress, setPercentProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setPercentProgress(progress)
  })

  return (
    <section className='flex flex-col items-center justify-center min-h-[200vh] mb-16'>

      <div className='h-[100vh] flex flex-col justify-center items-center sticky top-0'>
        <span className='largeTitle max-w-2xl text-center'>
          {
            textArray.map((word, index) => (
              <motion.span
                key={index}
                animate={{
                  opacity: index / textArray.length < percentProgress ? 1 : 0.09,
                }}
                transition={{
                  duration: 0.2
                }}
              >{word} </motion.span>
            ))
          }
        </span>
      </div>

      <div className='h-[100vh] absolute top-0 w-52' ref={scrollTarget}></div>

      <span className='flex-grow'></span>

      <span className='bg-[#202221] text-[#F1EFED] p-4 text-sm rounded-[13px] w-[275px] text-center'>Screen now</span>

    </section>
  )
}