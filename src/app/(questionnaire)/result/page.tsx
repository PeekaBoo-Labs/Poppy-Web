"use client";

import QuestionnaireResults from "./(result)/QuestionnaireResults";
import { FlowerContextProvider } from "@/lib/contexts/FlowerContext";

export default function ResultPage() {
  return (
    <div className="mt-[105px] flex flex-grow flex-col">
      <FlowerContextProvider>
        <QuestionnaireResults />
      </FlowerContextProvider>
    </div>
  );
}

