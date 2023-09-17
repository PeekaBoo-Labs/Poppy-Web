import { type Question } from "@/lib/types/question"
import Title from "../Title"
import QuestionInputOption from "../QuestionOption"


export default function QuestionnaireCard({ question }: { question: Question | null }) {

  if (!question) {
    return (
      <div className="flex flex-col justify-center mx-auto flex-grow">
        <h5 className="text-center mb-4 px-10 font-[400] text-gray-400">Please be patient...</h5>
        <Title className="text-center mb-8 px-10">Loading next question...</Title>
      </div>
    )
  }

  const options = question.options;

  return (
    <div className="flex flex-col justify-center mx-auto flex-grow">
      <h5 className="text-center mb-4 px-10 font-[400] text-gray-400">Choose all that apply</h5>
      <Title className="text-center mb-8 px-10">{question.question}</Title>

      <div className="flex flex-wrap justify-center items-center">
        {options.map((option, index) => (
          <QuestionInputOption key={index} text={option.content} selected={option.selected} />
        ))}
      </div>
    </div>
  )
}