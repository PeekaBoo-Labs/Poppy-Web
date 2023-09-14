export default function ProgressBar({ index, total }: { index: number, total: number }) {
  return (
    <div className="flex justify-center items-center space-x-[5px] pb-[20px]">
      {
        [...Array(total)].map((_, i) =>
          index === i ?
            <div key={i} className="w-[30px] h-[3px] bg-[#262626] rounded"></div> :
            <div key={i} className="w-[30px] h-[3px] bg-gray-300 rounded"></div>
        )
      }
    </div>
  )
}