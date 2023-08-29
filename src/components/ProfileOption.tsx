export default function ProfileOption({ text, selected }: { text: string, selected: boolean }) {
    return (
      <div className="px-3 py-1 m-1 bg-[#F7F7F7] rounded-full border-2 border-black select-none cursor-default">
        <p className="text-center">{text}</p>
      </div>
    )
  }