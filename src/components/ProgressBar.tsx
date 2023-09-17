import { motion } from 'framer-motion'


export default function ProgressBar({ index, total }: { index: number, total: number }) {
  return (
    <div className="flex justify-center items-center space-x-[5px] pb-[20px]">
      {
        [...Array(total)].map((_, i) =>
          <motion.div key={i}
            className={`h-[3px] bg-[#262626] rounded origin-right`}
            initial={false}
            animate={{
              backgroundColor: i == index ? '#262626' : 'rgb(229 231 235)',
              width: i == index ? '30px' : '15px',
            }}>
          </motion.div>
        )
      }
    </div >
  )
}