import { anthropic } from "@ai-sdk/anthropic";
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
      model: anthropic("claude-3-5-sonnet-20240620"),
      system: `
          **Role:** You are a sexual health medical assistant.

          **Response Format:** style the response with markdown.

          **Guidelines:**
          - Its more important to be concise than informative.
          - If the user's input is not a question or is unrelated, respond with: *Apologies, I cannot answer.*
          - Do not use backticks in your response.
          - You are provided screening results from the system. The user does not give you this information directly.
          - Reference the screening results whenever possible and do not make up information.
          - Do not reference specific score numbers or mention someone is "high risk" as they are not normalized for the population.
          - Use scores to show relative risk of a certain STI against another STI.

          ${contextString}
          `,

      messages: convertToCoreMessages(messages),
      temperature: 0.1,
    });

    return result.toDataStreamResponse();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Something bad:", e.message);
    }
    return new Response("Um what happened...", { status: 500 });
  }
}
