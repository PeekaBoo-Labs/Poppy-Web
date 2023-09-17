import { motion } from 'framer-motion';

export default function QuestionInputOption({
  text, selected
}: {
  text: string, selected: boolean
}) {
  return (
    <motion.div
      animate={{
        backgroundColor: selected ? 'rgb(255 237 213)' : '#F7F7F7',
        color: selected ? 'rgb(249 115 22)' : '#262626',
        borderColor: selected ? 'rgb(249 115 22)' : 'rgb(209 213 219)',
      }}

      initial={false}

      className={`px-5 py-3 m-1 rounded-full border-[2px] select-none cursor-pointer`}
    >
      <p className="text-center">{text}</p>
    </motion.div>
  );
}
