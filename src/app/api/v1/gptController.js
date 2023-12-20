const asyncHandler = require('express-async-handler');
const OpenAI = require("openai");

//gpt setup
const MODEL_NAME = "gpt-3.5-turbo"; // change this before commmit, i dont have GPT 4 access lol
const MAX_TOKENS = 1024;
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

// gpt prompts
const DIAGNOSIS_PROMPT = `${"Utilizing all the information shared by the user, your task is to infer the particular sexually transmitted infections (STI) in question. Output should be in Markdown. Here is an example response, which should have a probability followed by an sti for that probability:"} ${'\n' +
'- 80% probability of Gonorrhea\n' +
'- 60% probability of Trichomoniasis\n' +
'- 40% probability of Bacterial vaginosis\n' +
'- 20% probability of Chlamydia\n' +
'\n'}`;
const QUESTIONNAIRE_PROMPT = `You're a virtual health screener. Your task is to hone in on a potential sexually transmitted infection (STI) preliminary diagnosis using the user's shared data. Try to gain more information about the patient's condition by providing up to five single-word or concise options, plus an 'other' choice. All responses should be formatted with a question followed by numerically formatted answers. Do NOT ask for specific STI names, but aim to identify the symptoms, risk factors, or sexual behaviors leading towards a potential STI, which can be symptomatic or asymptomatic. It may be helpful to follow the 5P's approach to taking a sexual history. If a user skips a question, continue asking another. NEVER repeat questions. Ask at least 6 questions. IMPORTANT: if you cannot continue answering questions, you must say "STOP", and a short explanation.`;
const FIRST_QUESTION = `Do you have any of the following symptoms?\n1. Discharge\n2. Itching\n3. Pain\n4. Rash\n5. None of the above\n6. Other`

// GET - get starter conversation log 
exports.start_chat = asyncHandler(async (req, res, next) => {
    // user should be able to post information about the patient - female, 24 year old, etc 
    const all_messages = [
        { role: "system", content: QUESTIONNAIRE_PROMPT },
        { role: "assistant", content: FIRST_QUESTION }
    ];
    try {
        return res.status(200).json({ conversation_log: all_messages });
    } catch (error) {
        return next(error);
    }
});

// POST 
exports.continue_chat = asyncHandler(async (req, res, next) => {
    if (!req.body.messages || !Array.isArray(req.body.messages)) {
        return res.status(400).send("Invalid messages format");
    }

    const all_messages = [
        { role: "system", content: QUESTIONNAIRE_PROMPT },
        ...req.body.messages,
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
        const finished_questions = response_message["content"].includes("STOP") || response_message["content"].includes("NATHANLOVESPAUL") || response_message["content"].includes("Based on the symptoms")
        console.log(response_message)
        // If questions are finished, return the diagnosis instead of continuing the conversation
        if (finished_questions) {
            // Pass the current conversation log to the find_diagnosis function
            console.log('wee woo works')
            return await exports.find_diagnosis(req, res);
        }

        return res.status(200).json({
            gpt_response: response_message,
            conversation_log: new_all_messages,
            end_of_convo: finished_questions
        });

    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// POST
exports.find_diagnosis = asyncHandler(async (req, res, next) => {
    if (!req.body.messages || !Array.isArray(req.body.messages)) {
        return res.status(400).send("Invalid messages format");
    }
    const all_messages = [
        ...req.body.messages,
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
        console.log('response', response);
        console.log('response message', response_message);

        return res.status(200).json({ gpt_response: response_message, conversation_log: new_all_messages, end_of_convo: true });
    } catch (error) {
        return next(error);
    }
})