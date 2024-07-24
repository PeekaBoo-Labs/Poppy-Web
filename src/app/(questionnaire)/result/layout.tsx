"use client";

import { useAIContext } from "@/lib/ai/ai-context";
import { FlowerContextProvider } from "@/lib/contexts/FlowerContext";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const GARDEN_SIZE = 14;
export default function ResultLayout({ children }: { children: ReactNode }) {
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

  return <FlowerContextProvider>{children}</FlowerContextProvider>;
}
