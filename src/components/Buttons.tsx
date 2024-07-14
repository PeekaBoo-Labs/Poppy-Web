export function LongButton({
  children,
  type,
  onClick,
  loading,
  prefix,
  suffix,
}: {
  children?: React.ReactNode;
  type?:
    | "primary"
    | "primaryFull"
    | "secondary"
    | "secondaryFull"
    | "secondaryFullBack"
    | "primaryFullNext";
  onClick?: () => any;
  loading?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <>
      {type === "secondary" && (
        <div
          className="m-1 cursor-pointer select-none px-7 py-2.5"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-center font-[400]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "primary" && (
        <div
          className="m-1 cursor-pointer select-none rounded-[13px] bg-[#262626] px-7 py-2.5"
          onClick={onClick} // Pass the onClick handler here
        >
          {prefix}
          <h4 className="text-center font-[500] text-[#F7F7F7]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "primaryFull" && (
        <div
          className="m-1 flex-grow cursor-pointer select-none justify-between rounded-[13px] border-[1.5px] border-black bg-[#262626] px-[3px] py-[9px]"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-center font-[400] text-[#F7F7F7]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "secondaryFull" && (
        <div
          className="m-1 flex-grow cursor-pointer select-none justify-between px-[9px] py-[9px]"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-center font-[400] text-[#262626]">{children}</h4>
          {suffix}
        </div>
      )}

      {type === "secondaryFullBack" && (
        <div
          className="min-w-5 m-1 flex flex-grow cursor-pointer select-none flex-row items-center justify-center rounded-xl border-[1.5px] border-[#D9D9D9] px-4 py-2.5 align-middle"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-left font-[400] text-[#FFFFFF]">{children}</h4>
          <img className="min-w-4 h-7 w-4" src={"arrowBack.svg"} alt=""></img>
          {suffix}
        </div>
      )}

      {type === "primaryFullNext" && (
        <div
          className="m-1 flex flex-grow cursor-pointer select-none flex-row justify-between rounded-[13px] border-[1.5px] border-black bg-[#202221] px-4 py-2"
          onClick={onClick}
        >
          {prefix}
          <h4 className="text-left font-[400] text-[#FFFFFF]">
            {children}
          </h4>{" "}
          <img className="w-4 invert" src={"arrowRight.svg"} alt=""></img>
          {suffix}
        </div>
      )}
    </>
  );
}
