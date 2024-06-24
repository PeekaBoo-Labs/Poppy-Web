import OpenAI from "openai";

export async function getInsight(question: string, answer: string, stis_detected: string[]) {
  console.log("OpenAI API Key", process.env.OPENAI_API_KEY)

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-hIPJ7iCny72wWDjS2jNC3FY7",
    project: "proj_dYUzamo5YH4aVfBltLyPVzBS"
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a gentle and friendly STI doctor. Given the question, answer, and related STIs, give a SHORT, ONE SENTENCE insight relating to the question/answer combination. Do not repeat the given information."
      },
      {
        role: "user",
        content: `
        Question: ${question}
        My answer: ${answer}
        STIs related to answer: ${stis_detected.join(", ")}
        `
      }
    ]
  });

  return response.choices[0].message.content;
}