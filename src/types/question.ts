import { QuestionOptionType } from "./questionOption";

export interface QuestionType {
    question: string;
    options: QuestionOptionType[]
}