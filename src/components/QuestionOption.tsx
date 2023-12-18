import { motion } from 'framer-motion';
import { accent } from '@/lib/constants/colors';

export default function QuestionInputOption({
  text, selected, onClick
}: {
  text: string,
  selected: boolean,
  onClick: () => void
}) {
  return (
    <motion.button
      animate={{
        backgroundColor: selected ? '#FFCC00' : '#F7F7F7',
        color: '#262626',
        borderColor: selected ? '#FFCC00' : 'rgb(209 213 219)',
      }}
      whileHover={{
        y: -1,
        borderColor: '#FFCC00',
        color: selected ? '#262626': '#FFCC00'
      }}
      initial={false}
      onClick={onClick}
      className={`px-5 py-3 m-1 rounded-xl border-[2px] select-none cursor-pointer`}
    >
      <p className="text-left">{text}</p>
    </motion.button>
  );
}
