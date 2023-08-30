export function LongButton(
  {
    children, type, loading, prefix, suffix
  }:
    {
      children?: React.ReactNode,
      type?: "primary" | "primaryFull" | "secondary" | "secondaryFull",
      loading?: boolean,
      prefix?: React.ReactNode,
      suffix?: React.ReactNode
    }
) {
  return <>
    {
      type == "secondary" && (
        <div className="px-7 py-2.5 m-1 select-none cursor-default" >
          {prefix}
          <h4 className="text-center font-[400]">{children}</h4>
          {suffix}
        </div>
      )
    }

    {
      type == "primary" && (
        <div className="px-7 py-2.5 m-1 bg-[#262626] rounded-[15px] select-none cursor-default" >
          {prefix}
          <h4 className="text-center text-[#F7F7F7] font-[500]">{children}</h4>
          {suffix}
        </div>
      )
    }

    {
      type == "primaryFull" && (
        <div className="flex-grow justify-between px-[3px] py-[9px] m-1 bg-[#262626] rounded-[15px] border-[2px] border-black select-none cursor-default">
          {prefix}
          <h4 className="text-center text-[#F7F7F7] font-[400]">{children}</h4>
          {suffix}
        </div>
      )
    }

     {
      type == "secondaryFull" && (
        <div className="flex-grow justify-between px-[9px] py-[9px] m-1 select-none cursor-default">
          {prefix}
          <h4 className="text-center text-[#262626] font-[400]">{children}</h4>
          {suffix}
        </div>
      )
    }
  </>
}

