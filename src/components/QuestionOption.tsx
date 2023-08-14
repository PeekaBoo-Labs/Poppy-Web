export default function QuestionOption({ text, selected }: { text: string, selected: boolean }) {
  return (
    <div className="px-5 py-3 m-1 bg-[#F7F7F7] rounded-full border-[2px] border-gray-300 select-none cursor-default">
      <p className="text-center text-[#262626]">{text}</p>
    </div>
  )
}