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
        <div className="px-7 py-2.5 m-1 bg-[#F7F7F7] rounded-[13px] border-[2px] border-black select-none cursor-default" >
          {prefix}
          <h4 className="text-center">{children}</h4>
          {suffix}
        </div>
      )
    }

    {
      type == "primary" && (
        <div className="flex-grow justify-between px-5 py-2.5 m-1 bg-[#262626] rounded-[13px] border-[2px] border-black select-none cursor-default">
          {prefix}
          <h4 className="text-center text-[#F7F7F7]">{children}</h4>
          {suffix}
        </div>
      )
    }
  </>
}

