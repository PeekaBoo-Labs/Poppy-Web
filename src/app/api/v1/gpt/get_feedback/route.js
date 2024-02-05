import { OpenAI } from "openai";

const MODEL_NAME = "gpt-3.5-turbo";
const MAX_TOKENS = 1024;
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const instructions = `You are an STI expert who will look at patients' STI screening questionnaire responses to explain why their STI screening responses correspond to a risk for a single or multiple STIs. For symptomatic questions please be detailed on why certain behaviors or symptoms point to an STI(s). For asymptomatic STIs, leverage sexual behavior to help educate users about the existence and possibilities of asymptomatic STIs. `
let prompt1 = `Given the questionnaire questions and user responses, create a list of raw json objects that each explain how the user's response affects the risk to an sti in this format: { question: str, response: str, feedback: str, related_stis[str] }: now here is the list:`

export async function POST(req){
    if(req.method !== 'POST'){
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
   
    const rawData = await req.body.getReader().read();
    const bodyString = new TextDecoder().decode(rawData.value);
    const requestBody = JSON.parse(bodyString);

    const all_messages = [
        { role: "system", content: instructions },
        { role: "user", content: prompt1 + requestBody.questions_list}
    ];

    try{
        const response = await openai.chat.completions.create({
            model: MODEL_NAME,
            messages: all_messages,
            temperature: 0.05,
            max_tokens: MAX_TOKENS,
        });

        const response_message = response.choices[0].message.content;
        const response_object = JSON.parse(response_message)
        console.log(response_object)
        
        return Response.json({
            feedback_list: response_object
        });
    } catch(error){
        console.log('d')
        console.error(error);
        return Response.json({ error: 'Internal Server Error' });
    }
}
/* 
// example POST body:
{
   "questions_list": [
    {
        "question": "Have you had unprotected sexual intercourse in the last 6 months?",
        "response_weight": 1.0,
        "answer_choices": ["Yes", "No"],
        "answer": "Yes",
        "answer_weights": {
            "Yes": 0.8,
            "No": 0.2
        }
    },
    {
        "question": "Do you experience any unusual symptoms such as itching, discharge, or pain in the genital area?",
        "response_weight": 0.9,
        "answer_choices": ["Yes", "No"],
        "answer": "No",
        "answer_weights": {
            "Yes": 0.7,
            "No": 0.3
        }
    },
    {
        "question": "Have you been diagnosed with an STI in the past?",
        "response_weight": 0.7,
        "answer_choices": ["Yes", "No"],
        "answer": "No",
        "answer_weights": {
            "Yes": 0.6,
            "No": 0.4
        }
    },
    {
        "question": "Have you had new or multiple sexual partners in the last year?",
        "response_weight": 0.8,
        "answer_choices": ["Yes", "No"],
        "answer": "Yes",
        "answer_weights": {
            "Yes": 0.75,
            "No": 0.25
        }
    },
    {
        "question": "Select any of the following symptoms you are currently experiencing: sores or bumps on the genitals or in the oral or rectal area, painful or burning urination, unusual discharge from the penis or vagina, unusual vaginal bleeding, sore, swollen lymph nodes, particularly in the groin area, and a rash, particularly on the trunk, hands, or feet.",
        "response_weight": 1.0,
        "answer_choices": ["Sores or bumps", "Painful urination", "Unusual discharge", "Unusual vaginal bleeding", "Swollen lymph nodes", "Rash", "None of the above"],
        "answer": "None of the above",
        "answer_weights": {
            "Sores or bumps": 0.6,
            "Painful urination": 0.5,
            "Unusual discharge": 0.7,
            "Unusual vaginal bleeding": 0.6,
            "Swollen lymph nodes": 0.4,
            "Rash": 0.3,
            "None of the above": 0.1
        }
    }]
}

// Example api response: 
{
    "feedback_list": [
    {
        "question": "Have you had unprotected sexual intercourse in the last 6 months?",
        "response": "Yes",
        "answered": true,
        "feedback": "Having unprotected sexual intercourse increases the risk of contracting STIs. It is important to use barrier methods such as condoms to reduce the risk of transmission.",
        "related_stis": ["Chlamydia", "Gonorrhea", "HIV", "Syphilis"]
    },
    {
        "question": "Do you experience any unusual symptoms such as itching, discharge, or pain in the genital area?",
        "response": "No",
        "answered": true,
        "feedback": "While not experiencing any unusual symptoms is a good sign, it is important to note that some STIs can be asymptomatic. Regular STI screenings are still recommended.",
        "related_stis": []
    },
    {
        "question": "Have you been diagnosed with an STI in the past?",
        "response": "No",
        "answered": true,
        "feedback": "Not having been diagnosed with an STI in the past reduces the risk of having a current infection. However, it is still important to practice safe sex and get regular screenings.",
        "related_stis": []
    },
    {
        "question": "Have you had new or multiple sexual partners in the last year?",
        "response": "Yes",
        "answered": true,
        "feedback": "Having new or multiple sexual partners increases the risk of exposure to STIs. It is important to use barrier methods and get regular screenings.",
        "related_stis": ["Chlamydia", "Gonorrhea", "HIV", "Syphilis"]
    },
    {
        "question": "Select any of the following symptoms you are currently experiencing: sores or bumps on the genitals or in the oral or rectal area, painful or burning urination, unusual discharge from the penis or vagina, unusual vaginal bleeding, sore, swollen lymph nodes, particularly in the groin area, and a rash, particularly on the trunk, hands, or feet.",
        "response": "None of the above",
        "answered": true,
        "feedback": "Not experiencing any of the listed symptoms is a good sign. However, it is important to note that some STIs can be asymptomatic. Regular screenings are still recommended.",
        "related_stis": []
    }
]
}
*/