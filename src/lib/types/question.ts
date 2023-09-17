export type Question = {
    question: string;
    options: QuestionOption[]
}

export type QuestionOption = {
    content: string;
    index: string;
    selected: boolean;
    user_input: string | null;
}