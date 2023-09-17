'use client'

import { useEffect, useState } from 'react';

import { type QuestionOption } from '@/lib/types/questionOption';
import { QuestionType } from '../lib/types/question';
import QuestionCard from './QuestionCard';

import { type ChatType } from '@/lib/types/chat';

import { LongButton } from './Buttons';

export default function QuestionnairePage() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gptConversationLog, setConversationLog] = useState([]);

  const callStartGPTAPI = async () => {
    const res = await fetch('http://localhost:6900/api/v1/gpt/start_chat')
      .then((response) => response.json())
      .then((response) => {
        // store this as context for the next gpt call 
        const gpt_convo_log = response['conversation_log'];
        console.log('gpt_convo_log', response['conversation_log']);

        // this is the concern of this function 
        const most_recent_gpt_response = gpt_convo_log.slice(-1)[0]['content'];
        console.log('most recent GPT API question: ', most_recent_gpt_response)

        // parsing the data
        const splitted = most_recent_gpt_response.split('\n')
        const question = splitted[0];

        // create options list
        const answer_options = splitted
          .splice(1)
          .map((option: string): QuestionOption => {
            const option_split = option.split('. ');
            const new_option: QuestionOption = {
              content: option_split[1],
              index: option_split[0],
              user_input: null,
            }
            return new_option;
          })

        const newCurrentQuestion: QuestionType = {
          question: question,
          options: answer_options,
        };

        setConversationLog(gpt_convo_log)
        setQuestions([newCurrentQuestion]);
        setCurrentQuestionIndex(0);
      })
      .catch((error) => console.error(error))
  }
  const callContinueGPTAPI = async (user_response: string) => {
    // continues the user API conversation
    const newChat: ChatType = {
      role: 'user',
      content: user_response
    }
    const newGPTConversationLog = [...gptConversationLog, newChat];
    console.log('new chat convo', newGPTConversationLog)

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'messages': newGPTConversationLog }),
    }

    const res = await fetch('http://localhost:6900/api/v1/gpt/continue_chat', opts)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        // store this as context for the next gpt call 
        const gpt_convo_log = response['conversation_log'];
        console.log('gpt_convo_log', response['conversation_log']);
        if (response['end_of_convo']) {
          const newCurrentQuestion: QuestionType = {
            question: 'diagnosis done, hey nathan check log to see how to manage this',
            options: [],
          };
          setConversationLog(gpt_convo_log)
          setQuestions([...questions, newCurrentQuestion]);
          return;
        }

        // this is the concern of this function 
        const most_recent_gpt_response = gpt_convo_log.slice(-1)[0]['content'];
        console.log('most recent GPT API question: ', most_recent_gpt_response)

        // parsing the data
        const splitted = most_recent_gpt_response.split('\n')
        const question = splitted[0];

        // create options list
        const answer_options = splitted.splice(1).map((option: string): QuestionOption => {
          const option_split = option.split('. ');
          const new_option: QuestionOption = {
            content: option_split[1],
            index: option_split[0],
            user_input: null,
          }
          return new_option;
        })

        const newCurrentQuestion: QuestionType = {
          question: question,
          options: answer_options,
        };

        setConversationLog(gpt_convo_log)
        setQuestions([...questions, newCurrentQuestion]);
      })
      .catch((error) => { console.log(error) })
  }

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      const options_to_iterate = questions[currentQuestionIndex]['options'];
      let userResponse = ''

      options_to_iterate.forEach(option => {
        if (option['user_input']) {
          userResponse += option['user_input'] + ', '
        }
      })

      console.log('user responses: ', userResponse)
      callContinueGPTAPI(userResponse)
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  useEffect(() => {
    callStartGPTAPI();
  }, [])

  useEffect(() => {
    console.log('switched')
  }, [currentQuestionIndex])

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between h-[87vh]">

        <div className="flex-grow"></div>

        <div>
          {currentQuestion &&
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              question_index={currentQuestionIndex}
              questions={questions}
              setQuestions={setQuestions}
            />
          }
        </div>

        <div className="flex-grow"></div>

        <div className="flex w-full">
          <LongButton type="secondaryFull" onClick={handleBack}>Back</LongButton>
          <LongButton type="primaryFull" onClick={handleNext}>Next</LongButton>
        </div>
      </div>
    </div>
  );
};