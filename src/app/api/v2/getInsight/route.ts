import { getInsight } from "@/lib/openai";

export async function POST(request: Request) {
  const res = await request.json();
  const response = await getInsight(res.question, res.answer, res.stis_detected)

  return new Response(response, {
    status: 200,
    //TODO: restrict to only the domain that will be using this API
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}