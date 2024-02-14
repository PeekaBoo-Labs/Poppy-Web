
export function LongButton({
  children,
  type,
  onClick,
  loading,
  prefix,
  suffix
}: {
  children?: React.ReactNode,
  type?: "primary" | "primaryFull" | "secondary" | "secondaryFull" | "secondaryFullBack" | "primaryFullNext",
  onClick?: () => any,
  loading?: boolean,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode
}) {
  return (
    <>
      {type === "secondary" && (
        <div
          className="px-7 py-2.5 m-1 select-none cursor-pointer"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-center font-[400]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "primary" && (
        <div
          className="px-7 py-2.5 m-1 bg-[#262626] rounded-[13px] select-none cursor-pointer"
          onClick={onClick} // Pass the onClick handler here
        >
          {prefix}
          <h4 className="text-center text-[#F7F7F7] font-[500]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "primaryFull" && (
        <div
          className="flex-grow justify-between px-[3px] py-[9px] m-1 bg-[#262626] rounded-[13px] border-[1.5px] border-black select-none cursor-pointer"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-center text-[#F7F7F7] font-[400]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "secondaryFull" && (
        <div
          className="flex-grow justify-between px-[9px] py-[9px] m-1 select-none cursor-pointer"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-center text-[#262626] font-[400]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "secondaryFullBack" && (
        <div
          className="flex-grow flex flex-row px-4 py-2.5 justify-center align-middle items-center min-w-5  m-1 rounded-xl border-[1.5px] select-none cursor-pointer border-[#D9D9D9]"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-left text-[#FFFFFF] font-[400]">{children}</h4><img className='w-4 min-w-4 h-7' src={'arrowBack.svg'}></img>
          {suffix}
        </div>
      )}

      {type === "primaryFullNext" && (
        <div
          className="flex-grow flex flex-row justify-between px-4 py-2 m-1 bg-[#202221] rounded-[13px] border-[1.5px] border-black select-none cursor-pointer"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-left text-[#FFFFFF] font-[400]">{children}</h4> <img className='w-4' src={'arrowRight.svg'}></img>
          {suffix}
        </div>
      )}
    </>
  );
}
