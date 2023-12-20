// pages/api/start_chat.js
import { OpenAI } from "openai";

const MODEL_NAME = "gpt-3.5-turbo";
const MAX_TOKENS = 1024;
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const QUESTIONNAIRE_PROMPT = `You're a virtual health screener. Your task is to hone in on a potential sexually transmitted infection (STI) preliminary diagnosis using the user's shared data. Try to gain more information about the patient's condition by providing up to five single-word or concise options, plus an 'other' choice. All responses should be formatted with a question followed by numerically formatted answers. Do NOT ask for specific STI names, but aim to identify the symptoms, risk factors, or sexual behaviors leading towards a potential STI, which can be symptomatic or asymptomatic. It may be helpful to follow the 5P's approach to taking a sexual history. If a user skips a question, continue asking another. NEVER repeat questions. Ask at least 6 questions. IMPORTANT: if you cannot continue answering questions, you must say "STOP", and a short explanation.`;
const FIRST_QUESTION = `Do you have any of the following symptoms?\n1. Discharge\n2. Itching\n3. Pain\n4. Rash\n5. None of the above\n6. Other`

export async function GET(req) {
    if (req.method === 'GET') {
        const all_messages = [
            { role: "system", content: QUESTIONNAIRE_PROMPT },
            { role: "assistant", content: FIRST_QUESTION }
        ];

        try {
            return Response.json({ conversation_log: all_messages });
        } catch (error) {
            console.error(error);
            return Response.json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.end(`Method ${req.method} Not Allowed`);
    }
}