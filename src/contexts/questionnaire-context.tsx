'use client'

import React, { createContext, useContext, useState } from "react";
import { type QuestionType } from "@/lib/types/question";
import { StateType } from "@/lib/types/types";
import { firstQuestion } from "@/lib/api/handler";

type QuestionnaireContextType = {
    pageState: StateType<number>;
    questionsState: StateType<(null | QuestionType)[]>;

    loading: StateType<boolean>;

    nextPage: () => void;
    prevPage: () => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

export default function QuestionnaireContextProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(0);
    const [questions, setQuestions] = useState<(null | QuestionType)[]>([null]);
    const [loading, setLoading] = useState(false);

    function prevPage() {
        setPage(Math.max(page - 1, 0));
    }

    async function handleNullQuestion() {
        const nullIndex = questions.length - 1;

        if (nullIndex == 0) {
            const question = await firstQuestion();
            setQuestions([question, null]);
        } else {
            console.error("New question needs to be implemented.")
        }
    }

    async function nextPage() {
        setPage(Math.min(page + 1, questions.length - 1));
        handleNullQuestion();
    }

    return (
        <QuestionnaireContext.Provider
            value={{
                pageState: [page, setPage],
                questionsState: [questions, setQuestions],
                loading: [loading, setLoading],
                prevPage: prevPage,
                nextPage: nextPage,
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