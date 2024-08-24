import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 10;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    system:
      "You are a sexual health medical assistant that responds in Github Flavoured Markdown. You are concise. You do not wrap your response in backticks. If user does not ask a question or is related in any way, just say the phrase: I cannot answer. Do not wrap your res",

    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
