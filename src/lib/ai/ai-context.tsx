"use client";

import {
  WeightType,
  AIOutput,
  EffectType,
  Question,
  QuestionInput,
  STI,
  Tag,
  ScoreCalculation,
  calculateScore,
  getDefaultScore,
} from "./question";
import { createContext, useContext, useEffect, useState } from "react";

import { Question_SexualActivity } from "./questions/behavioral";
import {
  persistentGroupExists,
  persistentKeyExists,
  usePersistentState,
} from "../saves";

type AIContextType = {
  grid: (STI | "tree")[];
  questionsLeft: number;
  answeredQuestions: Question[];

  resetQuestions: () => Question;
  answerQuestion: (answer: QuestionInput) => Question;
  calculateOutput: () => AIOutput;
  getTopQuestion: () => Question | undefined;
  generateGrid: (gridSize: number) => void;
};

export const AIContext = createContext<AIContextType | null>(null);

export const GROUP_AI = "AI_CONTEXT" as const;

export default function AIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questionsLeft, setQuestionsLeft] = usePersistentState(
    GROUP_AI,
    "questionsLeft",
    1,
  );
  const [questionsStack, setQuestionsStack] = usePersistentState(
    GROUP_AI,
    "questionsStack",
    [new Question_SexualActivity()],
  );
  const [prunedTags, setPrunedTags] = usePersistentState<Tag[]>(
    GROUP_AI,
    "prunedTags",
    [],
  );
  const [answeredQuestions, setAnsweredQuestions] = usePersistentState<
    Question[]
  >(GROUP_AI, "answeredQuestions", []);

  const [grid, setGrid, setGridTemp] = usePersistentState<(STI | "tree")[]>(
    GROUP_AI,
    "grid",
    [],
  );

  useEffect(() => {
    // Grid storage indicates user has reached the end of the questionnaire
    // Reset the questions to start over if in the middle of a questionnaire
    if (!persistentKeyExists(GROUP_AI, "grid")) {
      resetQuestions();
    }
  }, []);

  // A function to generate the grid with flower placements
  const generateGrid = (gridSize: number) => {
    const scores = calculateOutput();

    const sti_scores: [STI, number][] = Array.from(scores.risks).sort(
      (a, b) => b[1] - a[1],
    );

    const totalCells = gridSize * gridSize;
    const grid: (STI | "tree")[] = Array(totalCells).fill("tree");

    let remainingCells = totalCells;

    // Ensure at least one flower for each STI tested
    sti_scores.forEach(([sti]) => {
      const randomIndex = Math.floor(Math.random() * totalCells);
      grid[randomIndex] = sti;
      remainingCells--;
    });

    // Distribute the remaining flowers according to their scores
    sti_scores.forEach(([sti, score]) => {
      const flowerCount = Math.max(1, score);
      for (let i = 0; i < flowerCount; i++) {
        let placed = false;
        while (!placed) {
          const randomIndex = Math.floor(Math.random() * totalCells);
          if (grid[randomIndex] == "tree") {
            grid[randomIndex] = sti;
            placed = true;
            remainingCells--;
          }
          if (remainingCells <= 0) break; // Break if no more cells available
        }
      }
    });

    setGrid(grid);
  };

  const getTopQuestion = (): Question | undefined => {
    return questionsStack[0];
  };

  const raise = (msg: string): never => {
    throw new Error(msg);
  };

  const answerQuestion = (answer: QuestionInput): Question => {
    let current = getTopQuestion() ?? raise("Answering without a question!");
    let effects = current.effects(answer);
    let newQuestionStack = questionsStack.slice(1);

    setQuestionsLeft((l) => l - 1);

    for (const effect of effects) {
      if (
        (effect.type === EffectType.AddQuestion ||
          effect.type === EffectType.InsertQuestion) &&
        effect.questions
      ) {
        const prunedQuestions = effect.questions.filter(
          (question) => !prunedTags.some((tag) => question.tags.includes(tag)),
        );

        if (effect.type === EffectType.AddQuestion) {
          newQuestionStack = newQuestionStack.concat(prunedQuestions);
        } else {
          newQuestionStack = prunedQuestions.concat(newQuestionStack);
        }
        setQuestionsLeft(newQuestionStack.length);
      } else if (effect.type === EffectType.End) {
        setQuestionsLeft(0);
      } else if (effect.type === EffectType.PruneTags) {
        setPrunedTags([
          ...new Set<Tag>([...prunedTags, ...(effect.payload ?? [])]),
        ]);
      }
    }

    current.selected = answer.id;
    setAnsweredQuestions((prev) => [...(prev ?? []), current]);
    setQuestionsStack(newQuestionStack);

    return newQuestionStack[0];
  };

  const calculateOutput = (): AIOutput => {
    let behavioral: ScoreCalculation = getDefaultScore();
    let symptomatic: ScoreCalculation = getDefaultScore();

    // fill with default values
    let risks: Map<STI, ScoreCalculation> = new Map();
    for (const sti of Object.values(STI)) {
      risks.set(sti, getDefaultScore());
    }

    for (const question of answeredQuestions) {
      if (!question.selected) continue;

      const selectedAnswer = question.inputOptions.find(
        (option) => option.id === question.selected,
      );

      if (!selectedAnswer) {
        console.log("Skipping question with no selected answer", question);
        continue;
      }

      const score = selectedAnswer.value * question.weight;

      if (question.weightType === WeightType.Additive) {
        if (question.tags.includes(Tag.Behavioral)) behavioral.sum += score;
        if (question.tags.includes(Tag.Symptom)) symptomatic.sum += score;
        for (const [sti, risk] of Object.entries(question.riskFactors)) {
          risks.get(sti as STI)!.sum += score * risk;
        }
      } else if (question.weightType === WeightType.Multiplicative) {
        if (question.tags.includes(Tag.Behavioral)) behavioral.mul *= score;
        if (question.tags.includes(Tag.Symptom)) symptomatic.mul *= score;
        for (const [sti, risk] of Object.entries(question.riskFactors)) {
          risks.get(sti as STI)!.mul *= score * risk;
        }
      } else if (question.weightType === WeightType.Exponential) {
        if (question.tags.includes(Tag.Behavioral)) behavioral.exp *= score;
        if (question.tags.includes(Tag.Symptom)) symptomatic.exp *= score;
        for (const [sti, risk] of Object.entries(question.riskFactors)) {
          risks.get(sti as STI)!.exp *= score * risk;
        }
      }
    }

    const output: AIOutput = {
      behavior: calculateScore(behavioral),
      symptomatic: calculateScore(symptomatic),
      risks: new Map(
        [...risks].map(([sti, score]) => [sti, calculateScore(score)]),
      ),
    };

    return output;
  };

  const resetQuestions = (): Question => {
    let start = new Question_SexualActivity();
    setAnsweredQuestions([]);
    setQuestionsStack([start]);
    setQuestionsLeft(1);
    setGridTemp([]);
    return start;
  };

  return (
    <AIContext.Provider
      value={{
        grid,
        questionsLeft,
        answeredQuestions,

        resetQuestions,
        answerQuestion,
        calculateOutput,
        getTopQuestion,
        generateGrid,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used within a AIContextProvider");
  }
  return context;
}
