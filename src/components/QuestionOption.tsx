import React, { useState } from 'react';

function QuestionInputOption({ text, selected }: { text: string, selected: boolean }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`px-5 py-3 m-1 rounded-full border-[2px] select-none cursor-pointer ${isSelected
        ? 'bg-orange-100 text-orange-500 border-orange-500'
        : 'bg-[#F7F7F7] text-[#262626] border-gray-300'
        }`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <p className="text-center">{text}</p>
    </div>
  );
}

export default QuestionInputOption;
