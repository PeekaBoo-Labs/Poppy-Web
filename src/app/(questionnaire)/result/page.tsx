"use client";

import QuestionnaireResults from "./(result)/QuestionnaireResults";
import { FlowerContextProvider } from "@/lib/contexts/FlowerContext";
import AIContextProvider from "@/lib/ai/ai-context";

export default function ResultPage() {
  return (
    <div className="mt-[105px] flex flex-grow flex-col">
      <AIContextProvider>
        <FlowerContextProvider>
          <QuestionnaireResults />
        </FlowerContextProvider>
      </AIContextProvider>
    </div>
  );
}
