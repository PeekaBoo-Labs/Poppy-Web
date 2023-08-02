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
        <div className="flex-grow justify-between px-5 py-3 m-1 bg-[#FFFAF0] rounded-[10px] border-2 border-black select-none cursor-default" >
          {prefix}
          <p className="text-center">{children}</p>
          {suffix}
        </div>
      )
    }

    {
      type == "primary" && (
        <div className="flex-grow justify-between px-5 py-3 m-1 bg-[#000] rounded-[10px] border-2 border-black select-none cursor-default">
          {prefix}
          <p className="text-center invert">{children}</p>
          {suffix}
        </div>
      )
    }
  </>
}

