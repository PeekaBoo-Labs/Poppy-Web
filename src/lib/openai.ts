import OpenAI from "openai";

export async function getInsight(
  question: string,
  answer: string,
  stis_detected: string[],
) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are generating helpful captions for QA pairs for a STI screening application.
                  Given the question, answer, and related STIs, give a SHORT, ONE SENTENCE insight relating to the question/answer combination.
                  DO NOT simply say its risky behavior but include HOW that particular action can lead to infection. 
                  Do not include the names of specific STIs unless you are referencing something specific about it.
                  `,
      },
      {
        role: "user",
        content: `
        Question: ${question}
        My answer: ${answer}
        STIs related to answer: ${stis_detected.join(", ")}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
}
