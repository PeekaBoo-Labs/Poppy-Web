"use client";

import { useAIContext } from "@/lib/ai/ai-context";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import QuestionnaireResultBreakdown from "./QuestionnaireResultBreakdown";
import QuestionnaireResultNextSteps from "./QuestionnaireResultNextSteps";
import QuestionnaireResultOverview from "./QuestionnaireResultOverview";
import { useMemo } from "react";

const PAGES_LABEL = ["Overview", "Breakdown", "Next Steps"] as const;
const PAGES_SLUG = ["overview", "breakdown", "next-steps"] as const;
const GARDEN_SIZE = 11;

type SLUG_UNIONS = (typeof PAGES_SLUG)[number];

export default function QuestionnaireResults() {
  const { generateGrid, answeredQuestions } = useAIContext();

  useMemo(() => {
    generateGrid(GARDEN_SIZE);
    console.log("Calculating Scores...");
  }, [answeredQuestions]);

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("tab");
  const page: SLUG_UNIONS = (pageParam as SLUG_UNIONS) ?? PAGES_SLUG[0];

  const router = useRouter();

  if (answeredQuestions.length == 0) {
    console.log("No answered questions, redirecting to home");
    router.push("/");
    return null;
  }

  return (
    <div className="z-10 mx-auto w-[calc(100%-50px)] max-w-5xl flex-grow rounded-[20px] border border-border bg-secondary-background p-[7px] shadow-realistic">
      <div className="flex h-full w-full gap-[60px] rounded-[13px] border border-border p-[48px]">
        <div className="flex flex-col gap-[16px]">
          {PAGES_SLUG.map((p, i) => (
            <Link
              href={`?tab=${p}`}
              className={cn("text-left", page != p && "text-secondary")}
            >
              {PAGES_LABEL[i]}
            </Link>
          ))}
        </div>
        <div className="flex flex-grow flex-col gap-[20px]">
          {page == "next-steps" ? (
            <QuestionnaireResultNextSteps />
          ) : page == "overview" ? (
            <QuestionnaireResultOverview />
          ) : page == "breakdown" ? (
            <QuestionnaireResultBreakdown />
          ) : (
            <span>broken</span>
          )}
        </div>
      </div>
    </div>
  );
}
