import { blurVariant } from "@/lib/motion";
import secure from "@/lib/entropy"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

export default function QuestionnaireGPT({
  question,
  answer,
  stis_detected,
  className,
}: {
  question: string;
  answer: string;
  stis_detected: string[];
  className?: string;
}) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const data = JSON.stringify({ question, answer, stis_detected })

    const request = {
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24 },

      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Entropy": `${btoa(secure(data))}`
      },
    } as const;

    const serializedRequest = JSON.stringify(request);
    const cachedResponse = window.localStorage.getItem(serializedRequest);
    if (cachedResponse) {
      setResponse(cachedResponse);
      return;
    }

    // Serialize the data
    fetch("/api/v2/getInsight", request)
      .then((res) => res.text())
      .then((res) => {
        setResponse(res);
        window.localStorage.setItem(serializedRequest, res);
      });
  }, [answer, question, stis_detected]);

  return (
    <motion.p
      key={question}
      layout="position"
      className={cn("text-sm text-secondary", className)}
    >
      {response ? (
        <motion.span variants={blurVariant}>{response}</motion.span>
      ) : (
        <motion.div variants={blurVariant} className="opacity-20">
          <Skeleton className="opacity-25" />
          <Skeleton containerClassName="block w-[95%] opacity-25" />
        </motion.div>
      )}
    </motion.p>
  );
}
