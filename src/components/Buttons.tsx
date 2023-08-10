export function LongButton(
  {
    children, type, loading, prefix, suffix
  }:
    {
      children?: React.ReactNode,
      type?: "primary" | "secondary",
      loading?: boolean,
      prefix?: React.ReactNode,
      suffix?: React.ReactNode
    }
) {
  return <>
    {
      type == "secondary" && (
        <div className="px-7 py-3 m-1 bg-[#FFFAF0] rounded-[13px] border-[2px] border-black select-none cursor-default" >
          {prefix}
          <p className="text-center">{children}</p>
          {suffix}
        </div>
      )
    }

    {
      type == "primary" && (
        <div className="flex-grow justify-between px-5 py-3 m-1 bg-[#262626] rounded-[13px] border-[2px] border-black select-none cursor-default">
          {prefix}
          <p className="text-center text-[#FFFAF0]">{children}</p>
          {suffix}
        </div>
      )
    }
  </>
}

