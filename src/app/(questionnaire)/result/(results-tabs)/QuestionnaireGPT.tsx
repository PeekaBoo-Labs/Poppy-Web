import { getInsight } from "@/lib/openai";
import { useEffect, useState } from "react";

export default function QuestionnaireGPT({
  question, answer, stis_detected
}: {
  question: string,
  answer: string,
  stis_detected: string[]
}) {
  const [response, setResponse] = useState("")

  useEffect(() => {
    const request = {
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24 },

      method: "POST",
      body: JSON.stringify({ question, answer, stis_detected }),
      headers: {
        'Content-Type': 'application/json'
      }
    } as const;

    const serializedRequest = JSON.stringify(request)
    const cachedResponse = window.localStorage.getItem(serializedRequest)
    if (cachedResponse) {
      setResponse(cachedResponse)
      return
    }

    // Serialize the data
    fetch("/api/v2/getInsight", request)
      .then(res => res.text())
      .then(res => {
        setResponse(res)
        window.localStorage.setItem(serializedRequest, res)
      })
  }, [])

  return <p className="text-sm text-secondary">{response}</p>
}