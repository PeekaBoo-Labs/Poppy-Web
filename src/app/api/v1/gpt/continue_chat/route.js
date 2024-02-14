// pages/api/continue_chat.js
import { OpenAI } from "openai";

const MODEL_NAME = "gpt-3.5-turbo";
const MAX_TOKENS = 1024;
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const QUESTIONNAIRE_PROMPT = `You're a virtual health screener. Your task is to hone in on a potential sexually transmitted infection (STI) preliminary diagnosis using the user's shared data. Try to gain more information about the patient's condition by providing up to five single-word or concise options, plus an 'other' choice. All responses should be formatted with a question followed by numerically formatted answers. Do NOT ask for specific STI names, but aim to identify the symptoms, risk factors, or sexual behaviors leading towards a potential STI, which can be symptomatic or asymptomatic. It may be helpful to follow the 5P's approach to taking a sexual history. If a user skips a question, continue asking another. NEVER repeat questions. Ask at least 6 questions. IMPORTANT: if you cannot continue answering questions, you must say "STOP", and a short explanation.`;
const DIAGNOSIS_PROMPT = `${"Utilizing all the information shared by the user, your task is to infer the particular sexually transmitted infections (STI) in question. Output should be in Markdown. Here is an example response, which should have a probability followed by an sti for that probability:"} ${'\n' +
    '- 80% probability of Gonorrhea\n' +
    '- 60% probability of Trichomoniasis\n' +
    '- 40% probability of Bacterial vaginosis\n' +
    '- 20% probability of Chlamydia\n' +
    '\n'}`;
export async function POST(req) {
    if (req.method === 'POST') {
        const rawData = await req.body.getReader().read();
        const bodyString = new TextDecoder().decode(rawData.value);
        const requestBody = JSON.parse(bodyString);

        if (!requestBody['messages'] || !Array.isArray(requestBody['messages'])) {
            console.log('oh no somethings wrong... ');
            return Response.json({
                message: 'Invalid messages format'
            });

        }

        const all_messages = [
            { role: "system", content: QUESTIONNAIRE_PROMPT },
            ...requestBody['messages'],
        ];

        try {
            const response = await openai.chat.completions.create({
                model: MODEL_NAME,
                messages: all_messages,
                temperature: 0.05,
                max_tokens: MAX_TOKENS,
            });

            const response_message = response.choices[0].message;
            const new_all_messages = [...all_messages, response_message];
            const finished_questions = response_message["content"].includes("STOP") ||
                response_message["content"].includes("NATHANLOVESPAUL") ||
                response_message["content"].includes("Based on the symptoms") ||
                !response_message["content"].includes("1.");
            if (finished_questions) {
                const the_diagnosis_res = await find_diagnosis(requestBody)
                return the_diagnosis_res
            }

            return Response.json({
                gpt_response: response_message,
                conversation_log: new_all_messages,
                end_of_convo: false
            });
        } catch (error) {
            console.error(error);
            return Response.json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function find_diagnosis(parsedRequestBody) {
    if (!parsedRequestBody.messages || !Array.isArray(parsedRequestBody.messages)) {
        console.log('ruh roh start')
        return res.status(400).send("Invalid messages format");
    }

    const all_messages = [
        ...parsedRequestBody.messages,
        { role: "assistant", content: DIAGNOSIS_PROMPT },
    ];

    try {
        const response = await openai.chat.completions.create({
            model: MODEL_NAME,
            messages: all_messages,
            temperature: 0,
            max_tokens: MAX_TOKENS,
        });

        const response_message = response.choices[0].message;
        const new_all_messages = [...all_messages, response_message];

        return Response.json({
            gpt_response: response_message,
            conversation_log: new_all_messages,
            end_of_convo: true
        });

    } catch (error) {
        console.log('ruh roh end')
        return Response.json({
            message: 'error ruh roh '
        });
    }

}
