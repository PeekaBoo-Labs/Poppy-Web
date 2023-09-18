'use client'

import React, { createContext, useContext, useState } from "react";
import { type Question } from "@/lib/types/question";
import { StateType } from "@/lib/types/types";
import { continueChat, convertQuestionsToLog, firstQuestion } from "@/lib/api/handler";

type QuestionnaireContextType = {
    pageState: StateType<number>;
    questionsState: StateType<(null | Question)[]>;

    loading: StateType<boolean>;

    start: () => void;

    nextPage: () => void;
    prevPage: () => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

export default function QuestionnaireContextProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(0);
    const [questions, setQuestions] = useState<(null | Question)[]>([null]);
    const [loading, setLoading] = useState(false);

    function prevPage() {
        setPage(Math.max(page - 1, 0));
    }

    async function handleNullQuestion() {
        if (loading) return;
        setLoading(true);

        const nullIndex = questions.length - 1;

        if (questions[nullIndex] !== null) return;

        const chat_log = convertQuestionsToLog(questions);
        const new_question = await continueChat(chat_log);

        if (new_question) {
            const new_questions = [...questions];
            new_questions[nullIndex] = new_question;
            new_questions.push(null);
            setQuestions(new_questions);
            console.info("New question was added!", questions);
        } else {
            console.error("New question was invalid!", questions);
        }

        setLoading(false);
    }

    async function nextPage() {
        setPage(Math.min(page + 1, questions.length - 1));

        if (page >= questions.length - 2)
            handleNullQuestion();
    }

    async function start() {
        if (loading) return;

        setLoading(true);
        const new_question = await firstQuestion();
        setQuestions([new_question, null]);
        setLoading(false);
    }

    return (
        <QuestionnaireContext.Provider
            value={{
                pageState: [page, setPage],
                questionsState: [questions, setQuestions],
                loading: [loading, setLoading],
                start: start,
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