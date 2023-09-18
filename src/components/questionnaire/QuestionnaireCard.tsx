import { type Question } from "@/lib/types/question"
import Title from "../Title"
import QuestionInputOption from "../QuestionOption"

import { motion, AnimatePresence } from "framer-motion"
import Dots from "../general/animated/dots"
import { useQuestionnaireContext } from "@/contexts/questionnaire-context"


export default function QuestionnaireCard() {

  let { questionsState, pageState } = useQuestionnaireContext();
  const [questions, setQuestions] = questionsState;
  const [page,] = pageState;

  const questionObj = questions[page];

  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        key={questionObj?.question}
        className="flex flex-col justify-center mx-auto flex-grow"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {
          questionObj === null ? (<LoadingLabel />) : (<>
            <h5 className="text-center mb-4 px-10 font-[400] text-gray-400">Choose all that apply</h5>
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
        Loading next question <Dots />
      </motion.span>
    </>
  )
}