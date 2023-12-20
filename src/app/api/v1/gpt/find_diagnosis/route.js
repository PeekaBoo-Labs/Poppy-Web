// pages/api/find_diagnosis.js
import { OpenAI } from "openai";

const MODEL_NAME = "gpt-3.5-turbo";
const MAX_TOKENS = 1024;
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const DIAGNOSIS_PROMPT = `${"Utilizing all the information shared by the user, your task is to infer the particular sexually transmitted infections (STI) in question. Output should be in Markdown. Here is an example response, which should have a probability followed by an sti for that probability:"} ${'\n' +
'- 80% probability of Gonorrhea\n' +
'- 60% probability of Trichomoniasis\n' +
'- 40% probability of Bacterial vaginosis\n' +
'- 20% probability of Chlamydia\n' +
'\n'}`;

export async function POST(req, res) {
    if (req.method === 'POST') {
        const rawData = await req.body.getReader().read();
        const bodyString = new TextDecoder().decode(rawData.value);
        const requestBody = JSON.parse(bodyString);
        
        if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
            return res.status(400).send("Invalid messages format");
        }

        const all_messages = [
            ...requestBody.messages,
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
            console.log('diagnosis', {
                gpt_response: response_message,
                conversation_log: new_all_messages,
                end_of_convo: true
            })
            return Response.json({ 
                gpt_response: response_message, 
                conversation_log: new_all_messages, 
                end_of_convo: true 
            });

            
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
