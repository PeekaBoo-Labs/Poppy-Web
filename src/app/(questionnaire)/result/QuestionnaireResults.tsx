'use client'

import { useAIContext } from "@/lib/ai/ai-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import QuestionnaireResultBreakdown from "./(results-tabs)/QuestionnaireResultBreakdown";
import QuestionnaireResultOverview from "./(results-tabs)/QuestionnaireResultOverview";
import QuestionnaireResultNextSteps from "./(results-tabs)/QuestionnaireResultNextSteps";

type Page = "breakdown" | "nextsteps"

export default function QuestionnaireResults() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("tab");
  let page: Page;
  if (pageParam == "nextsteps") {
    page = "nextsteps";
  } else {
    page = "breakdown";
  }

  const { answeredQuestions } = useAIContext();

  if (answeredQuestions.length == 0) {
    console.log("No answered questions, redirecting to home");
    router.push("/");
    return null;
  }

  return (
    <div className="z-10 mx-auto w-[calc(100%-50px)] max-w-4xl flex-grow rounded-[20px] border border-border bg-secondary-background p-[7px] shadow-realistic">
      <div className="flex h-full w-full gap-[60px] rounded-[13px] border border-border p-[48px]">
        <div className="flex flex-col gap-[16px]">
          <Link href={"?tab=breakdown"} className={cn("text-left", page == "breakdown" ? "" : "text-secondary")}>Breakdown</Link>
          <Link href={"?tab=nextsteps"} className={cn("text-left", page == "nextsteps" ? "" : "text-secondary")}>Next Steps</Link>
        </div>
        <div className="flex flex-grow flex-col gap-[20px]">
          {page == "nextsteps" ? <QuestionnaireResultNextSteps /> : <QuestionnaireResultBreakdown />}
        </div>
      </div>
    </div>
  )
}