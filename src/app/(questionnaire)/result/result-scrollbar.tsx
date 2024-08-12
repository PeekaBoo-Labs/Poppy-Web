import { Section } from "@/lib/contexts/ResultsScrollContext";

export default function ResultScrollBar({ section }: { section: Section }) {
  return (
    <div className="absolute top-[50vh] flex h-[113px] w-[4px] flex-col">
      <div className="h-[4px] w-[4px] rounded-full bg-secondary" />
    </div>
  );
}
