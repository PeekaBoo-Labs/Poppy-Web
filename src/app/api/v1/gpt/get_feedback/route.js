import { OpenAI } from "openai";

const MODEL_NAME = "gpt-3.5-turbo";
const MAX_TOKENS = 1024;
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

const instructions = `You are an STI expert who will look at patients' STI screening questionnaire responses to explain why their STI screening responses correspond to a risk for a single or multiple STIs. For symptomatic questions please be detailed on why certain behaviors or symptoms point to an STI(s). For asymptomatic STIs, leverage sexual behavior to help educate users about the existence and possibilities of asymptomatic STIs. `
let prompt1 = `Given the questionnaire questions and user responses, create a list of raw json objects that each explain how the user's response affects the risk to an sti in this format: { question: str, response: str, feedback: str, }: now here is the list:`

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
            "question": "Have you ever had unprotected sex?",
            "response": "Yes",
            "feedback": "Having unprotected sex increases the risk of contracting STIs, as it allows for direct contact with bodily fluids that may contain infections. It is important to always use barrier methods such as condoms to reduce the risk of STI transmission."
        },
        {
            "question": "Have you ever had multiple sexual partners?",
            "response": "Yes",
            "feedback": "Having multiple sexual partners increases the risk of STI transmission, as it increases the likelihood of coming into contact with someone who has an infection. It is important to practice safe sex and get regular STI screenings if you have multiple partners."
        },
        {
            "question": "Have you ever had a previous STI diagnosis?",
            "response": "Yes",
            "feedback": "Having a previous STI diagnosis indicates a higher risk for contracting STIs in the future. Some STIs can recur or increase the susceptibility to other infections. It is important to follow the prescribed treatment and take necessary precautions to prevent future infections."
        },
        {
            "question": "Have you ever shared needles or drug paraphernalia?",
            "response": "Yes",
            "feedback": "Sharing needles or drug paraphernalia significantly increases the risk of contracting blood-borne infections such as HIV or Hepatitis B and C. It is crucial to avoid sharing needles and seek help for substance abuse to reduce the risk of STIs."
        },
        {
            "question": "Have you experienced any unusual genital discharge, sores, or itching?",
            "response": "Yes",
            "feedback": "Experiencing unusual genital discharge, sores, or itching can be indicative of an STI. These symptoms may be caused by infections such as chlamydia, gonorrhea, herpes, or trichomoniasis. It is important to get tested and seek medical attention if you are experiencing these symptoms."
        }
    ]
}
*/