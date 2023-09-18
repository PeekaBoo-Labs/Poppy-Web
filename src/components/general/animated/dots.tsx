
import { motion } from "framer-motion"

export default function Dots() {

  let dotsAnimation = {
    hidden: {
      y: -2,
    },
    visible: {
      y: 1,
    }
  }


  return (

    <motion.div
      transition={{
        staggerChildren: 0.2,
      }}
      initial="hidden"
      animate="visible"
      className="inline-flex gap-0.5"
    >
      {
        [1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            variants={dotsAnimation}
            className="w-1.5 h-1.5 rounded-full bg-black"
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 0.5,
              ease: "easeInOut",
            }}
          ></motion.div>
        ))
      }
    </motion.div>
  )
}