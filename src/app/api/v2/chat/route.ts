import { AIStream } from "ai";

export const maxDuration = 10;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("LOCAL API REQUEST", messages);
  console.log(process.env.SERVER_URL);

  const res = await fetch(`${process.env.SERVER_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
    cache: "no-store",
  });

  return res;
}
