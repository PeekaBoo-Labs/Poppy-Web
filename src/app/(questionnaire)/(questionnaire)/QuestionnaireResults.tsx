import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/questions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function QuestionnaireResults() {

  const router = useRouter();

  const { calculateOutput, answeredQuestions } = useAIContext();
  const output: AIOutput = calculateOutput();

  const searchParams = useSearchParams();
  const page: "overview" | "breakdown" | "nextsteps" | string | null = searchParams.get("tab");

  if (answeredQuestions.length == 0) {
    router.push("/");
    return null;
  }

  return (
    <div className="z-10 mx-auto w-[calc(100%-50px)] flex-grow rounded-[20px] border border-border bg-secondary-background p-[7px] shadow-realistic">
      <div className="flex h-full w-full gap-[60px] rounded-[13px] border border-border p-[48px]">
        <div className="flex flex-col gap-[16px]">
          <Link href={"?tab=overview"} className={cn("text-left", page == "overview" || page == null ? "" : "text-secondary")}>Overview</Link>
          <Link href={"?tab=breakdown"} className={cn("text-left", page == "breakdown" ? "" : "text-secondary")}>Breakdown</Link>
          <Link href={"?tab=nextsteps"} className={cn("text-left", page == "nextsteps" ? "" : "text-secondary")}>Next Steps</Link>
        </div>
        <div className="flex flex-grow flex-col gap-[20px] px-[60px]">
          <h1 className="text-xl font-medium">Your screening results:</h1>

          <div className="flex flex-col">
            {
              Array.from(output.risks).toSorted((a, b) => b[1] - a[1]).map(([sti, score]) => {
                return (
                  <div key={sti} className="flex items-center gap-[16px]">
                    <h2 className="text-md font-medium">{sti}</h2>
                    <p className="text-base">{score}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

let test_list = [
  {
    question:
      "Have you had unprotected sexual intercourse in the last 6 months?",
    response: "Yes",
    answered: true,
    feedback:
      "Having unprotected sexual intercourse increases the risk of contracting STIs. It is important to use barrier methods such as condoms to reduce the risk of transmission.",
    related_stis: ["Chlamydia", "Gonorrhea", "HIV", "Syphilis"],
  },
  {
    question:
      "Do you experience any unusual symptoms such as itching, discharge, or pain in the genital area?",
    response: "No",
    answered: true,
    feedback:
      "While not experiencing any unusual symptoms is a good sign, it is important to note that some STIs can be asymptomatic. Regular STI screenings are still recommended.",
    related_stis: [],
  },
  {
    question: "Have you been diagnosed with an STI in the past?",
    response: "No",
    answered: true,
    feedback:
      "Not having been diagnosed with an STI in the past reduces the risk of having a current infection. However, it is still important to practice safe sex and get regular screenings.",
    related_stis: [],
  },
  {
    question: "Have you had new or multiple sexual partners in the last year?",
    response: "Yes",
    answered: true,
    feedback:
      "Having new or multiple sexual partners increases the risk of exposure to STIs. It is important to use barrier methods and get regular screenings.",
    related_stis: ["Chlamydia", "Gonorrhea", "HIV", "Syphilis"],
  },
  {
    question:
      "Select any of the following symptoms you are currently experiencing: sores or bumps on the genitals or in the oral or rectal area, painful or burning urination, unusual discharge from the penis or vagina, unusual vaginal bleeding, sore, swollen lymph nodes, particularly in the groin area, and a rash, particularly on the trunk, hands, or feet.",
    response: "None of the above",
    answered: true,
    feedback:
      "Not experiencing any of the listed symptoms is a good sign. However, it is important to note that some STIs can be asymptomatic. Regular screenings are still recommended.",
    related_stis: [],
  },
];