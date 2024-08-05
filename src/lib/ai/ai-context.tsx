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
import { createContext, useContext, useState } from "react";

import { Question_SexualActivity } from "./questions/behavioral";
import { usePersistentState } from "../saves";

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

const GROUP_ID = "AI_CONTEXT" as const;

export default function AIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questionsLeft, setQuestionsLeft] = usePersistentState(
    GROUP_ID,
    "questionsLeft",
    1,
  );
  const [questionsStack, setQuestionsStack] = usePersistentState(
    GROUP_ID,
    "questionsStack",
    [new Question_SexualActivity()],
  );
  const [prunedTags, setPrunedTags] = usePersistentState<Tag[]>(
    GROUP_ID,
    "prunedTags",
    [],
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);

  const [grid, setGrid] = useState<(STI | "tree")[]>([]);

  // Custom save state!
  useEffect(() => {}, []);

  // A function to generate the grid with flower placements
  const generateGrid = (gridSize: number) => {
    const scores = calculateOutput();
    console.log(scores);

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
    setAnsweredQuestions((prev) => [...prev, current]);
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
        for (const [sti, risk] of question.riskFactors) {
          risks.get(sti)!.sum += score * risk;
        }
      } else if (question.weightType === WeightType.Multiplicative) {
        if (question.tags.includes(Tag.Behavioral)) behavioral.mul *= score;
        if (question.tags.includes(Tag.Symptom)) symptomatic.mul *= score;
        for (const [sti, risk] of question.riskFactors) {
          risks.get(sti)!.mul *= score * risk;
        }
      } else if (question.weightType === WeightType.Exponential) {
        if (question.tags.includes(Tag.Behavioral)) behavioral.exp *= score;
        if (question.tags.includes(Tag.Symptom)) symptomatic.exp *= score;
        for (const [sti, risk] of question.riskFactors) {
          risks.get(sti)!.exp *= score * risk;
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
