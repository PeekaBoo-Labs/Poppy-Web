import React from 'react'
import Title from '@/components/Title';
import QuestionOption from './QuestionOption';
import { QuestionOptionType } from '@/types/questionOption';
import {QuestionType} from '@/types/question'

const QuestionCard = ({question, options, question_index, questions, setQuestions}:
  {question:string, options: QuestionOptionType[], question_index:number, questions:QuestionType[], setQuestions:Function}) => {
  
  const handleOptionClick = (e) => {
    const selectedOption = e.target.innerText;
    // we want to mutate the current question and set the questions bank with updated question
    const currentQuestion = questions[question_index];
    const question_options = currentQuestion['options'];
    const optionIndex = options.findIndex(elem => elem.content === selectedOption);

    console.log('event: ', e.target.innerText)
    console.log('current question: ', currentQuestion)
    console.log('current options: ', question_options)
    console.log('optionIndex: ', optionIndex)

    question_options[optionIndex]['user_input'] = typeof question_options[optionIndex]['user_input'] === 'boolean' ? selectedOption : false; 
    console.log('updated options: ', question_options)
    questions[question_index]['options'] = question_options;
    setQuestions(questions)
  }
  
  return (
    <div>   
      <div>         
        <div className="flex flex-col justify-center mx-auto">
          <h5 className="text-center mb-4 px-10 font-[400] text-gray-400">Choose all that apply</h5>
          <Title className="text-center mb-8 px-10">{`${question}`}</Title>

          <div className="flex flex-wrap justify-center items-center">
          {options.map((option, index) => (
              <div 
                    className={`w-1/3 p-2 ${index % 3 === 0 ? 'clear-left' : ''}`}
                    key={option.index}
                    onClick={handleOptionClick}
                    >
                    <QuestionOption text={option.content} selected={option.user_input} />

              </div>
          ))}
          </div>
        </div>     
       </div>
    </div>
  )
}

export default QuestionCard