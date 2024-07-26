"use client";

import QuestionnaireForm from "@/app/(questionnaire)/(questionnaire)/QuestionnaireForm";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1000);
  }, []);
  // if (isMobile) {
  //   return (
  //     <div className="flex h-full flex-col items-center justify-center gap-4">
  //       <Image
  //         src={"/pc.svg"}
  //         width={36}
  //         height={36}
  //         alt=""
  //         className="object-fit"
  //       />
  //       <p className="font-medium text-secondary">
  //         Mobile not supported yet, please view on desktop.
  //       </p>
  //     </div>
  //   );
  // }
  //
  return <QuestionnaireForm />;
}
