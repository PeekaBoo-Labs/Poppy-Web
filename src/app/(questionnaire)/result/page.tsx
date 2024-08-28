"use client";

import Footer from "@/components/general/Footer";
import ResultContainer from "./result-container";

export default function ResultPage() {
  return (
    <>
      <ResultContainer />
      <div className="mx-auto w-full max-w-[1300px] md:mt-10">
        <Footer />
      </div>
    </>
  );
}
