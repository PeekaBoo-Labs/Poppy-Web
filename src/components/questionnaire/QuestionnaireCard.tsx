import { type Question } from "@/lib/types/question"
import Title from "../Title"
import QuestionInputOption from "../QuestionOption"

import { motion, AnimatePresence } from "framer-motion"
import Dots from "../general/animated/dots"

import { type StateType } from "@/lib/types/types"

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import { Diagnosis } from "@/lib/types/diagnosis"

import { LongButton } from "../Buttons"
import ProgressBar from "../ProgressBar"


export default function QuestionnaireCard({
  questionsState, page, diagnosisState, handleBack, handleNext,
}: {
  questionsState: StateType<(null | Question)[]>,
  page: number,
  diagnosisState: StateType<(null | Diagnosis)>,
  handleBack: () => void,
  handleNext: () => void,
}) {
  const [questions, setQuestions] = questionsState;
  const [diagnosis, setDiagnosis] = diagnosisState;
  const questionObj = questions[page];

  return (
    <AnimatePresence initial={false} mode="wait" >
      <motion.div
        key={questionObj?.id}
        className="flex flex-col justify-center mx-auto flex-grow"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {
          questionObj === null ? (<LoadingLabel />) : diagnosis !== null ?  <> 

            <div className="flex flex-grow flex-row bg-[#F1EFED] w-[1050px] h-[600px] gap-4">
              <div className="bg-[#FFCC00] rounded-[20px] p-10 text-left flex flex-col justify-between w-[55%] flex-grow">
                <div>
                  <div className="title mb-[40px] text-left">Based on screening results, you are at risk of contracting the following STIs.</div>

                  <div className="flex text-left">
                    <div>
                      <ul>
                          {diagnosis.percentages.map((percentage, index) => {
                              const sti = diagnosis.possible_stis[index];
                              return (
                                  <li key={`${diagnosis.id}-${index}`}>
                                      <p className='mb-2'><span className="title font-medium">{percentage}</span>% chance of {sti}</p>
                                  </li>
                              );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <p className="footnote">
                    Poppy’s recommendations are based on the data provided and should be confirmed with further medical consultation.
                    </p>
                    <img src='sample_qr.svg'></img>
                  </div>
              </div>
              <div className="flex flex-col justify-between px-5 flex-grow">
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
                <div>
                  <LongButton type="primaryFullNext" onClick={()=>{}}>Next</LongButton>
                </div>
              </div>
            </div>
          </> : (
            <> 

            <div className="flex flex-row flex-grow bg-[#F1EFED] w-[1050px] h-[600px] gap-4">
              <div className="rounded-[20px] border border-[#D9D9D9] p-1 flex flex-col w-[55%]">
                <div className="flex-grow flex align-middle items-center justify-center">
                  <Title className="text-center mb-8 px-10 text-3xl align-middle">{questionObj.question}</Title>
                </div>
                <ProgressBar index={page} total={Math.max(1, questions.length)} diagnosisState={diagnosisState} />
              </div>


              <div className="flex flex-col justify-between px-5 flex-grow">
                <div>
                  <p className="text-3xl font-semibold">Choose one or</p>
                  <p className="text-3xl font-semibold mb-5">more options</p>
                  <div className="flex flex-col gap-1">
                  {questionObj.options.map((option, index) => (
                      <QuestionInputOption
                        key={index}
                        text={option.content}
                        selected={option.selected}
                        onClick={() => {
                          option.selected = !option.selected
                          let newQuestions = [...questions]
                          newQuestions[page] = questionObj
                          setQuestions(newQuestions)
                        }}
                      />
                    ))}

                  </div>
                  
                  
                </div>
                <div className="grid grid-cols-10 items-center justify-center">
                  <div className="col-span-2 text-left">
                    <LongButton type="secondaryFullBack" onClick={handleBack}></LongButton>
                  </div>
                  <div className="col-span-8 text-left">
                    <LongButton type="primaryFullNext" onClick={handleNext}>Next Question</LongButton>
                  </div>
                </div>
              </div>
            </div>
          </>)
          // <>
            
          //   <h5 className="text-center mb-4 px-10 font-[400] text-gray-400 mt-[70px]">Choose all that apply</h5>
          //   <Title className="text-center mb-8 px-10">{questionObj.question}</Title>

          //   <div className="flex flex-wrap justify-center items-center w-4/6 mx-auto">
          //     {questionObj.options.map((option, index) => (
          //       <QuestionInputOption
          //         key={index}
          //         text={option.content}
          //         selected={option.selected}
          //         onClick={() => {
          //           option.selected = !option.selected
          //           let newQuestions = [...questions]
          //           newQuestions[page] = questionObj
          //           setQuestions(newQuestions)
          //         }}
          //       />
          //     ))}
          //   </div>
          // </>)
        }
      </motion.div>
    </AnimatePresence >
  )
}

function LoadingLabel() {
  return (
    <>
      <motion.h5
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-4 px-10 font-[400] text-gray-400 opacity-0"
      >Working to give you the best results</motion.h5>
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="title text-center mb-8 px-10">
        Loading<Dots />
      </motion.span>
    </>
  )
}