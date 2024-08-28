import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { z } from "zod";

export const maxDuration = 10;

const minimalQuestionContextSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
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
  let output = "<Screening Results>\n";

  output += `
  **Risk Assessment (0 = low risk, high score = high risk):**
  - Risky Behavior Score: ${context.behavior_score};
  - Risky Symptoms Score: ${context.symptomatic_score};

  **STI Risk Scores:**
  ${context.sti_score.map((s) => `- ${s[0]}: ${s[1]}`).join("\n  ")};

  **Unhealthy Screening Results:**
  ${context.risky.map((r) => `- ${r.question}: ${r.answer}`).join("\n  ")}

  **Healthy Screening Results:**
  ${context.healthy.map((h) => `- ${h.question}: ${h.answer}`).join("\n  ")}
  `;

  return output + "\n</Screening Results>";
}

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    const data = userContextSchema.parse(context);

    const contextString = generateContext(data);

    const result = await streamText({
      model: openai("gpt-4o"),
      system: `
          **Role:** You are a sexual health medical assistant personalized to the paitient.

          **Response Format:** style the response with markdown.

          **Guidelines:**
          - Be concise and digestable.
          - If the user's input is unrelated to sexual health, respond with: *Apologies, I cannot answer.*
          - Reference the screening results whenever possible.
          - Do not reference specific score numbers because they are not normalized.
          - Only use scores compare risk of a certain STI against another STI.
          - REMEMBER THE REPRODUCTIVE ORGAN OF THE PATIENT do not generalize to others!

          **Notes:**
          - It is not recommended to use external condoms for female reproductive organ and vise versa!

          ${contextString}
          `,

      messages: convertToCoreMessages(messages),
      temperature: 0.2,
    });

    return result.toDataStreamResponse();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Something bad:", e.message);
    }
    return new Response("Um what happened...", { status: 500 });
  }
}
