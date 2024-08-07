"use client";

import Footer from "@/components/general/Footer";
import { GROUP_AI, useAIContext } from "@/lib/ai/ai-context";
import { FlowerContextProvider } from "@/lib/contexts/FlowerContext";
import { persistentKeyExists } from "@/lib/saves";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const GARDEN_SIZE = 14;
export default function ResultLayout({ children }: { children: ReactNode }) {
  const { grid, generateGrid, questionsLeft } = useAIContext();
  const router = useRouter();

  useEffect(() => {
    if (questionsLeft != 0 && !persistentKeyExists(GROUP_AI, "grid")) {
      console.log("No results, redirecting to screening page");
      router.push("/");
    } else if (!persistentKeyExists(GROUP_AI, "grid")) {
      generateGrid(window.innerWidth > 768 ? GARDEN_SIZE : 9);
      console.log("Need a new grid; Generating grid...");
    }
  }, []);

  return (
    <FlowerContextProvider>
      {children}

      <div className="mx-auto w-full max-w-[1000px] bg-secondary-background md:mt-10 md:bg-transparent">
        <Footer />
      </div>
    </FlowerContextProvider>
  );
}
