import React, { useState, useEffect, useCallback } from 'react';
import EducationItem from './EducationItem';

function EducationScrollView({ feedback_list }: { feedback_list: any[] }) {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = useCallback((e: any) => {
    const target = e.currentTarget; // Use currentTarget for consistency
    // Adjust the calculation to account for possible fractional values by rounding
    const bottomReached = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight;
    setIsBottom(bottomReached);
  }, []);

  return (
    <div>
      <p className="text-3xl font-medium">Break Down</p>
      <div className="relative">
        <div className="overflow-y-auto relative max-h-[500px] pr-3" onScroll={handleScroll}>
          {feedback_list.map((feedback, index) => (
            <EducationItem
              key={index}
              index={index + 1}
              question={feedback.question}
              feedback={feedback.feedback}
              answered={feedback.answered}
              related_stis={feedback.related_stis}
            />
          ))}
        </div>
        {/* Only show this div if !isBottom */}
        {!isBottom && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F1EFED] to-transparent opacity-100 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

export default EducationScrollView

/*

*/