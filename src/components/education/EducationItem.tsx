import React from "react";

const EducationItem = ({ index, question, answered, feedback, related_stis }: {
  index: number,
  question: string,
  answered: boolean,
  feedback: string,
  related_stis: string[]
}) => {
  return (
    <div>
      <div className='flex flex-row gap-4 pt-[30px] pr-1'>
        <div className="min-w-[28px] h-[28px] bg-black rounded-full flex items-center justify-center text-[#F1EFED] font-bold font-mono">
          <p className="text-xs">{index}</p>
        </div>
        <div>
          <p className="text-[17px] font-semibold">{question}</p>
          <div className="flex flex-row justify-between pt-[8px] pb-[15px]">
            <p className="text-[13px] font-normal">{
              related_stis.length != 0 ?
                related_stis.join(", ") : "Multiple Possible STI's"
            }</p>
            <p className="text-[9px] font-normal  opacity-[39%] text-[#202221]">{answered ? "ANSWERED" : "NOT ANSWERED"}</p>
          </div>
          <div className="border-2 border-[#202221]/[.13] text-[#202221] rounded-xl text-[13px] px-[10px] py-[16px]">
            <p className="text-[13px] opacity-[100%] text-[#202221] ">{feedback}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
