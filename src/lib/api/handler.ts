import { START_CHAT_URL } from "../constants";
import { QuestionOption, type Question } from "../types/question";


export async function firstQuestion(): Promise<Question> {
  const url = START_CHAT_URL;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.conversation_log) {
    throw new Error("No conversation log found in response");
  }

  const data = json.conversation_log;

  const question = data[1].content.split('\n')[0]
  const options = data[1].content.split('\n').slice(1)
    .map((option: string): QuestionOption => {

      const index = option.split('. ')[0];
      const content = option.split('. ')[1];

      return {
        content: content,
        index: index,
        user_input: null
      }
    });

  return {
    question: question,
    options: options
  }
}