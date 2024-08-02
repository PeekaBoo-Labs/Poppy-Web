"use client";

import Footer from "@/components/general/Footer";
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
      generateGrid(window.innerWidth > 768 ? GARDEN_SIZE : 9);
      console.log("Generating grid...");
    }
  }, []);

  return <FlowerContextProvider>
    {children}

    <div className="md:bg-transparent bg-secondary-background md:mt-10 max-w-[1000px] mx-auto w-full">
      <Footer />
    </div>
  </FlowerContextProvider>;
}
