'use client'

import { StateType } from "../types/types"
import { AIOutput, EffectType, Question, QuestionInput, STI, Tag, ScoreCalculation, calculateScore } from "./questions"
import { createContext, useContext, useState } from "react"

import { Question_SexualActivity } from "./questions"

type AIContextType = {
  questionsLeft: number

  resetQuestions: () => Question
  answerQuestion: (answer: QuestionInput) => Question
  calculateOutput: () => AIOutput
}

export const AIContext = createContext<AIContextType | null>(null);

export default function AIContextProvider({ children }: { children: React.ReactNode }) {

  const [questionsLeft, setQuestionsLeft] = useState(0)

  const [questionsStack, setQuestionsStack] = useState<Question[]>([])
  const [prunedTags, setPrunedTags] = useState<Tag[]>([])
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([])

  const getTopQuestion = () => {
    return questionsStack[0]
  }

  const answerQuestion = (answer: QuestionInput): Question => {
    let current = getTopQuestion()
    let effects = current.effects(answer)

    let newQuestionStack = questionsStack.slice(1)

    for (const effect of effects) {
      if (effect.type === EffectType.AddQuestion) {
        newQuestionStack = [...effect.questions ?? [], ...newQuestionStack]
        setQuestionsStack(newQuestionStack)
      }
      else if (effect.type === EffectType.End) {
        setQuestionsLeft(0)
      }
      else if (effect.type === EffectType.PruneTags) {
        setPrunedTags([...new Set<Tag>([...prunedTags, ...effect.payload ?? []])])
      }
    }

    setAnsweredQuestions(prev => [...prev, current])

    return newQuestionStack[0]
  }

  const calculateOutput = (): AIOutput => {
    let behavioral: ScoreCalculation = { sum: 0, mul: 1, exp: 1 }
    let symptomatic: ScoreCalculation = { sum: 0, mul: 1, exp: 1 }

    // fill with default values
    let risks: Map<STI, ScoreCalculation> = new Map()
    for (const sti of Object.values(STI)) {
      risks.set(sti, { sum: 0, mul: 1, exp: 1 })
    }

    for (const question of answeredQuestions) {
      if (!question.selected) continue;

      const selectedAnswer = question.inputOptions
        .find((option) => option.id === question.selected)

      if (!selectedAnswer) continue;

      const score = selectedAnswer.value * question.weight

      if (question.tags.includes(Tag.Behavioral)) {
        behavioral.sum += score
        behavioral.mul *= score
        behavioral.exp *= score
      } else {
        symptomatic.sum += score
        symptomatic.mul *= score
        symptomatic.exp *= score
      }

      for (const [sti, risk] of question.riskFactors) {
        const riskScore = score * risk
        risks.get(sti)!.sum += riskScore
        risks.get(sti)!.mul *= riskScore
        risks.get(sti)!.exp *= riskScore
      }
    }

    return {
      behavior: calculateScore(behavioral),
      symptomatic: calculateScore(symptomatic),
      risks: new Map([...risks].map(([sti, score]) => [sti, calculateScore(score)]))
    }
  }


  // 261 Hz
  // 

  const resetQuestions = (): Question => {
    let start = new Question_SexualActivity()
    setAnsweredQuestions([])
    setQuestionsStack([start])
    setQuestionsLeft(1)
    return start
  }

  return (
    <AIContext.Provider value={{ resetQuestions, answerQuestion, questionsLeft, calculateOutput }}>
      {children}
    </AIContext.Provider>
  )
}

export function useAIContext() {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAIContext must be used within a AIContextProvider')
  }
  return context
}