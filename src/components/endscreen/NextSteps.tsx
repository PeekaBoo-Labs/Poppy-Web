import React from 'react'

const NextSteps = () => {
  return (
    <div>
                  <p className="text-3xl font-medium">Choose your</p>
                  <p className="text-3xl font-medium mb-5">next steps</p>
                  <div className="flex flex-col gap-5">
                    <div className="border p-5 border-[#D9D9D9] rounded-[13px] flex flex-col">
                      <p className="font-medium">
                        Contact Local Clinics
                      </p>
                      <p className="border-b w-[100%] my-3 border-[#D9D9D9]"></p>
                      
                      <div className="flex flex-row justify-between items-center">
                        <p className="footnote">
                          UCI Student Health Center
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          1mi
                        </p>
                      </div>
                    </div>

                    <div className="border p-5 bg-[#FFCC00] border-[#D9D9D9] rounded-[13px] flex flex-col">
                      <p className="font-medium">
                        Request test kits
                      </p>
                      <p className="border-b w-[100%] my-3 border-[#D9D9D9]"></p>
                      <div className="flex flex-row justify-between items-center mb-2">
                        <p className="footnote">
                          Everlywell STD Test
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          x1
                        </p>
                      </div>
                      
                      <div className="flex flex-row justify-between items-center mb-2">
                        <p className="footnote">
                          CVS STD Test
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          x2
                        </p>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <p className="footnote">
                          UCI SHC STD Test
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          x3
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  
                </div>
  )
}

export default NextSteps