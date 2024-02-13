import { LongButton } from "@/components/Buttons";
import EducationScrollView from "@/components/education/EducationScrollView";
import Image from "next/image";
import { useAIContext } from "@/lib/ai/ai-context";
import { AIOutput } from "@/lib/ai/questions";

export default function QuestionnaireResults() {

  const { calculateOutput } = useAIContext();

  const output: AIOutput = calculateOutput();

  console.log("FROM THE VIEW", output)

  return (
    <div className="flex flex-grow flex-row bg-[#F1EFED] w-[1050px] h-[600px] gap-4">
      <div className="bg-[#FFCC00] rounded-[20px] p-10 text-left flex flex-col justify-between min-w-[55%] flex-grow">
        <div>
          <div className="title mb-[40px] text-left">
            Based on screening results, you are at risk of contracting
            the following STIs.
          </div>

          <div className="flex text-left">
            <div>
              <ul>
                {<p>{JSON.stringify(output)}</p>}
                {
                  [...output.risks.entries()].map(([sti, value]) => {
                    return (
                      <li key={sti}>
                        <p className="mb-2">
                          <span className="title font-medium">
                            {value.toFixed(0)}
                          </span>
                          % chance of {sti}
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="footnote">
            Poppy’s recommendations are based on the data provided and
            should be confirmed with further medical consultation.
          </p>
          <Image src="sample_qr.svg" alt="" width={500} height={500} />
        </div>
      </div>
      <div className="flex flex-col justify-between px-5 flex-grow max-h-[600px]">
        {/* <NextSteps /> */}
        <EducationScrollView feedback_list={test_list} />
        <div>
          <LongButton type="primaryFullNext" onClick={() => { }}>
            Next
          </LongButton>
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