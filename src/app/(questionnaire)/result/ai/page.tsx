"use client";

import { Section } from "@/lib/contexts/ResultsScrollContext";
import ChatBox, { PRESETS } from "../(breakdown)/chatbox";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AIPage() {
  return (
    <div className="flex flex-grow flex-col">
      <ChatBox
        presets={[...PRESETS[Section.Breakdown], ...PRESETS[Section.NextSteps]]}
      />
    </div>
  );
}
