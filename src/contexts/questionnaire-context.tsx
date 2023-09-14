'use client'

import React, { createContext, useContext, useState } from "react";
import { type QuestionType } from "@/types/question";
import { StateType } from "@/types/types";

type QuestionnaireContextType = {
    pageState: StateType<number>;
    questionsState: StateType<QuestionType[]>;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

export default function QuestionnaireContextProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(0);
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    return (
        <QuestionnaireContext.Provider
            value={{
                pageState: [page, setPage],
                questionsState: [questions, setQuestions],
            }}
        >
            {children}
        </QuestionnaireContext.Provider>
    )
}

export function useQuestionnaireContext() {
    const context = useContext(QuestionnaireContext)

    if (!context) {
        throw new Error(
            "useQuestionnaireContext cannot be used outside the provider."
        )
    }

    return context;
}