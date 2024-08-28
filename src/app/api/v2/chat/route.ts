import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";
import { z } from "zod";

export const maxDuration = 10;

const minimalQuestionContextSchema = z.object({
  question: z.string().min(1),
  label: z.string().min(1),
});

const userContextSchema = z.object({
  behavior_score: z.number().gte(0),
  symptomatic_score: z.number().gte(0),
  sti_score: z.tuple([z.string(), z.number()]).array(),

  healthy: minimalQuestionContextSchema.array(),
  risky: minimalQuestionContextSchema.array(),
});

type MinimalQuestionContext = z.infer<typeof minimalQuestionContextSchema>;
type UserContext = z.infer<typeof userContextSchema>;

function generateContext(context: UserContext) {
  let output = "<UserContext>\n";

  output += `
  NOTE: score of 0 means little risk high score means high risk.

  Risky Behavior Score: ${context.behavior_score};
  Risky Symptoms Score: ${context.symptomatic_score};
  STI SCORES: ${context.sti_score};

  Unhealthy Screening Results:
  ${context.risky.map((r) => `${r.question}: ${r.label}`).join("\n")}

  Healthy Screening Results:
  ${context.healthy.map((h) => `${h.question}: ${h.label}`).join("\n")}
  `;

  return output + "\n</UserContext>";
}

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    const data = userContextSchema.parse(context);

    const contextString = generateContext(data);

    console.log(context);

    // const result = await streamText({
    //   model: anthropic("claude-3-5-sonnet-20240620"),
    //   system:
    //     "You are a sexual health medical assistant that responds in Github Flavoured Markdown. You are concise. You do not wrap your response in backticks. If user does not ask a question or is related in any way, just say the phrase: I cannot answer. Do not wrap your res",
    //
    //   messages: convertToCoreMessages(messages),
    // });

    // return result.toDataStreamResponse();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Something bad:", e.message);
    }
    return new Response("Um what happened...", { status: 500 });
  }
}
