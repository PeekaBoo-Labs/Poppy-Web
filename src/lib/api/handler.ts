import { CONTINUE_CHAT_URL, START_CHAT_URL } from "../constants/urls";
import { QuestionOption, type Question } from "../types/question";
import { ChatEntry, type ChatLog } from "../types/chat";


export function convertQuestionsToLog(questions: (Question | null)[]): ChatLog {
  const log: ChatLog = {
    messages: []
  };

  questions.forEach((question: Question | null) => {
    if (!question) { return; }

    let assistantMessage = question.question + "\n";
    question.options.forEach((option: QuestionOption) => {
      assistantMessage += option.index + ". " + option.content + "\n";
    });

    log.messages.push({
      role: "assistant",
      content: assistantMessage
    })

    let userMessage = "";
    question.options.forEach((option: QuestionOption) => {
      if (option.selected) {
        userMessage += option.content + ",";
      }
    });

    if (userMessage.length == 0)
      userMessage = "User skipped this question";

    log.messages.push({
      role: "user",
      content: userMessage
    })
  });

  return log;
}

export function convertEntryToQuestion(entry: ChatEntry): Question {
  const question = entry.content.split('\n')[0]
  const options = entry.content.split('\n').slice(1)
    .map((option: string): QuestionOption => {

      const index = option.split('. ')[0];
      const content = option.split('. ')[1];

      return {
        content: content,
        index: index,
        selected: false,
        user_input: null
      }
    });

  return {
    id: Math.random().toString(36).substring(7),
    question: question,
    options: options
  }
}

export async function firstQuestion(): Promise<Question> {
  const url = START_CHAT_URL;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.conversation_log) {
    throw new Error("No conversation log found in response");
  }

  const questionEntry = json.conversation_log[1];
  return convertEntryToQuestion(questionEntry);
}

export async function continueChat(log: ChatLog): Promise<Question> {
  const url = CONTINUE_CHAT_URL;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await res.json();
  const gpt_response: ChatEntry = json["gpt_response"]

  return convertEntryToQuestion(gpt_response);
}