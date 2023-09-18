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
        backgroundColor: selected ? 'rgba(0, 122, 225, 0.1)' : '#F7F7F7',
        color: '#262626',
        borderColor: selected ? accent : 'rgb(209 213 219)',
      }}
      whileHover={{
        y: -1
      }}
      initial={false}
      onClick={onClick}
      className={`px-5 py-3 m-1 rounded-full border-[2px] select-none cursor-pointer`}
    >
      <p className="text-center">{text}</p>
    </motion.button>
  );
}
