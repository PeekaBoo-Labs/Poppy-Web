import React from 'react'

const ProgressBar = () => {
  return (
    <div className="flex justify-center items-center space-x-[5px] pb-[20px]">
              <div className="w-[15px] h-[3px] bg-gray-300 rounded"></div>
              <div className="w-[30px] h-[3px] bg-[#262626] rounded"></div>
              <div className="w-[15px] h-[3px] bg-gray-300 rounded"></div>
              <div className="w-[15px] h-[3px] bg-gray-300 rounded"></div>
              <div className="w-[15px] h-[3px] bg-gray-300 rounded"></div>
          </div>
  )
}

export default ProgressBar