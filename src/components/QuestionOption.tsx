export default function QuestionOption({ text, selected }: { text: string, selected: boolean }) {
  return (
    <div className="px-5 py-3 m-1 bg-[#FFFAF0] rounded-full border-[2px] border-gray-700 select-none cursor-default">
      <p className="text-center text-gray-900">{text}</p>
    </div>
  )
}