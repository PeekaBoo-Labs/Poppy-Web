import { motion, AnimatePresence } from 'framer-motion'
import { type Diagnosis } from "@/lib/types/diagnosis";
import { StateType } from "@/lib/types/types";

export default function ProgressBar({ index, total, diagnosisState }: { index: number, total: number, diagnosisState: StateType<(null | Diagnosis)>}) {
  const [diagnosis, ] = diagnosisState
  return (
    <div className="flex justify-center items-center space-x-[5px] pb-[20px]">
      {diagnosis === null ?
      <div>
        <AnimatePresence>
          {
            [...Array(total)].map((_, i) =>
              <motion.div key={i}
                className={`h-[3px] bg-[#262626] rounded origin-right`}
                initial={{ opacity: 0, width: '0px' }}
                animate={{
                  opacity: 1,
                  backgroundColor: i == index ? '#262626' : 'rgb(229 231 235)',
                  width: i == index ? '30px' : '15px',
                }}>
              </motion.div>
            )
          }
        </AnimatePresence>
      </div>
      : 
      <>
      
      </>
      }
    </div >
  )
}