'use client'

import React, { createContext, useContext, useState } from "react";
import { type Question } from "@/lib/types/question";
import { type Diagnosis } from "@/lib/types/diagnosis";
import { StateType } from "@/lib/types/types";
import { continueChat, convertQuestionsToLog, firstQuestion } from "@/lib/api/handler";

type QuestionnaireContextType = {
    pageState: StateType<number>;
    questionsState: StateType<(null | Question)[]>;
    diagnosisState: StateType<(null | Diagnosis)>;

    loading: StateType<boolean>;

    start: () => void;

    nextPage: () => void;
    prevPage: () => void;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

export default function QuestionnaireContextProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(0);
    const [questions, setQuestions] = useState<(null | Question | Diagnosis)[]>([null]);
    const [diagnosis, setDiagnosis] = useState<(null | Diagnosis)>(null);
    const [loading, setLoading] = useState(false);

    function prevPage() {
        setPage(Math.max(page - 1, 0));
        console.log(questions, Math.max(page - 1, 0))
    }

    async function handleNullQuestion() {
        if (loading) return;
        setLoading(true);

        const nullIndex = questions.length - 1;

        if (questions[nullIndex] !== null) return;

        const chat_log = convertQuestionsToLog(questions);
        const new_question = await continueChat(chat_log);

        // check if the new_question is of type 'Diagnosis', if it is, then the UI needs to change to diagnosis format

        if (new_question) {
            if('possible_stis' in new_question){
                // new question is actually a diagnosis 
                console.info("Diagnosis has been made!", new_question)
                const new_questions = [...questions];
                new_questions[nullIndex] = new_question;
                new_questions.push(null);
                setQuestions(new_questions);
                setDiagnosis(new_question)
                return;

            }
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
        console.log(questions, Math.min(page + 1, questions.length - 1))

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
                diagnosisState: [diagnosis, setDiagnosis],
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