import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Page = {
  label: string;
  slug: string;
};

const PAGES: Page[] = [
  {
    label: "Overview",
    slug: "",
  },
  {
    label: "Breakdown",
    slug: "breakdown",
  },
  {
    label: "Next Steps",
    slug: "nextsteps",
  },
];

export default function ResultSidebar({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) {
  return (
    <div className="z-10 mt-[120px] flex-grow rounded-[20px] border border-border bg-secondary-background p-[7px] shadow-realistic">
      <div className="flex h-full w-full gap-[100px] rounded-[13px] border border-border p-[48px]">
        <div className="flex flex-col gap-[16px]">
          {PAGES.map((p, i) => (
            <Link
              key={i}
              href={`/result/${p.slug}`}
              className={cn("text-left", p.slug != slug && "text-secondary")}
              prefetch={true}
            >
              {p.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-grow flex-col gap-[20px]">{children}</div>{" "}
      </div>
    </div>
  );
}
