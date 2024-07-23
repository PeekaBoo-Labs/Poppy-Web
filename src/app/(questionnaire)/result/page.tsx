"use client";

import { useAIContext } from "@/lib/ai/ai-context";
import ResultOverview from "./overview";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GARDEN_SIZE = 14;

export default function ResultPage() {
  const { generateGrid, answeredQuestions } = useAIContext();
  const router = useRouter();

  useEffect(() => {
    if (answeredQuestions.length == 0) {
      console.log("No answered questions, redirecting to screening page");
      router.push("/");
    } else {
      generateGrid(GARDEN_SIZE);
      console.log("Generating grid...");
    }
  }, []);

  return <ResultOverview />;
}
