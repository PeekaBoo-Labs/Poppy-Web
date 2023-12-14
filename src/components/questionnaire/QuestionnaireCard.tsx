import { type Question } from "@/lib/types/question"
import Title from "../Title"
import QuestionInputOption from "../QuestionOption"

import { motion, AnimatePresence } from "framer-motion"
import Dots from "../general/animated/dots"

import { type StateType } from "@/lib/types/types"

import { useQuestionnaireContext } from "@/contexts/questionnaire-context"
import { Diagnosis } from "@/lib/types/diagnosis"

import { LongButton } from "../Buttons"


export default function QuestionnaireCard({
  questionsState, page, diagnosisState
}: {
  questionsState: StateType<(null | Question)[]>,
  page: number,
  diagnosisState: StateType<(null | Diagnosis)>,
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

            <div className="flex flex-grow flex-row w-[900px] max-h-[550px] gap-4">
              <div className="bg-[#FFCC00] rounded-3xl p-10 text-left flex flex-col justify-between max-w-[65%] flex-grow">
                <div>
                  <p className="mb-7 font-semibold text-left">Based on screening results, you are at risk of contracting the following STIs.</p>

                  <div className="flex text-left">
                    <div>
                      <ul>
                          {diagnosis.percentages.map((percentage, index) => {
                              const sti = diagnosis.possible_stis[index];
                              return (
                                  <li key={`${diagnosis.id}-${index}`}>
                                      <p className='text-sm uppercase	mb-2'><span className="font-semibold text-2xl">{percentage}</span>% chance of {sti}</p>
                                  </li>
                              );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <p className="text-xs">
                    Poppy’s recommendations are based on the data provided and should be confirmed with further medical consultation.
                    </p>
                    <img src='sample_qr.svg'></img>
                  </div>
              </div>
              <div className="flex flex-col justify-between px-5 flex-grow">
                <div>
                  <p className="text-3xl font-semibold">Choose your</p>
                  <p className="text-3xl font-semibold mb-5">next steps</p>
                  <div className="flex flex-col gap-5">
                    <div className="border p-5 border-[#D9D9D9] rounded-xl flex flex-col">
                      <p className="text-sm font-semibold">
                        Contact Local Clinics
                      </p>
                      <p className="border-b w-[100%] my-3 border-[#D9D9D9]"></p>
                      
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-xs">
                          UCI Student Health Center
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          1mi
                        </p>
                      </div>
                    </div>

                    <div className="border p-5 bg-[#FFCC00] border-[#D9D9D9] rounded-xl flex flex-col">
                      <p className="text-sm font-semibold ">
                        Request test kits
                      </p>
                      <p className="border-b w-[100%] my-3 border-[#D9D9D9]"></p>
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-xs">
                          Everlywell STD Test
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          x1
                        </p>
                      </div>
                      
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-xs">
                          CVS STD Test
                        </p>
                        <p className="text-xs text-[#202221] text-opacity-[39%]">
                          x2
                        </p>
                      </div>

                      <div className="flex flex-row justify-between">
                        <p className="text-xs">
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
                  <LongButton type="primaryFull" onClick={()=>{}}>Next</LongButton>
                </div>
              </div>
            </div>
            
            {/* <h1 className="text-center mb-8 px-10">Based on screening results, you are at risk of contacting the following STIs.</h1>

            <div className="flex flex-wrap justify-center items-center w-4/6 mx-auto">
                <div>
                <ul>
                    {diagnosis.percentages.map((percentage, index) => {
                        const sti = diagnosis.possible_stis[index];
                        return (
                            <li key={`${diagnosis.id}-${index}`}>
                                <h1>{percentage}% chance of {sti}</h1>
                            </li>
                        );
                    })}
                </ul>
            </div>
            </div> */}

          </> : (
          <>
            <h5 className="text-center mb-4 px-10 font-[400] text-gray-400 mt-[70px]">Choose all that apply</h5>
            <Title className="text-center mb-8 px-10">{questionObj.question}</Title>

            <div className="flex flex-wrap justify-center items-center w-4/6 mx-auto">
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
          </>)
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