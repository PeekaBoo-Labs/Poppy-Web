import { getInsight } from "@/lib/openai";
import { verify } from "@/lib/entropy-src";

export async function POST(request: Request) {
  const res = await request.json();

  if (!verify(JSON.stringify(res), request.headers.get("Entropy"))) {
    return new Response("Um what happened...", { status: 500 });
  }

  const response = await getInsight(
    res.question,
    res.answer,
    res.stis_detected,
  );

  return new Response(response, {
    status: 200,
    //TODO: restrict to only the domain that will be using this API
    headers: {
      "Access-Control-Allow-Origin": "https://screening.poppyml.com",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
      NOTE: "This is just a MVP, please don't abuse this API or I'll have to lock it up :(",
    },
  });
}

