"use client";

import QuestionnaireResults from "./(result)/QuestionnaireResults";
import { FlowerContextProvider } from "@/lib/contexts/FlowerContext";
import AIContextProvider from "@/lib/ai/ai-context";
import { Suspense } from "react";

export default function ResultPage() {
  return (
    <div className="mt-[105px] flex flex-grow flex-col">
      <AIContextProvider>
        <FlowerContextProvider>
          <Suspense>
            <QuestionnaireResults />
          </Suspense>
        </FlowerContextProvider>
      </AIContextProvider>
    </div>
  );
}
