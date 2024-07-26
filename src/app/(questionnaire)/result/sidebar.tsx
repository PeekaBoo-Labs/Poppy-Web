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
    <div className="z-10 flex-grow border-border bg-secondary-background pt-[70px] md:mt-[120px] md:rounded-[20px] md:border md:p-[7px] md:shadow-realistic">
      <div className="h-full w-full md:flex md:gap-[100px] md:rounded-[13px] md:border md:border-border md:p-[48px]">
        <div className="relative my-4 flex justify-around md:my-0 md:flex-col md:justify-start md:gap-[16px]">
          {PAGES.map((p, i) => (
            <Link
              key={i}
              href={`/result/${p.slug}`}
              className={cn(
                "text-left",
                p.slug != slug
                  ? "text-secondary"
                  : "underline underline-offset-4 md:no-underline",
                "bg-secondary-background px-1",
              )}
              prefetch={true}
            >
              {p.label}
            </Link>
          ))}

          <span className="absolute left-0 right-0 top-[50%] z-[-1] m-auto w-[70%] border-b-2 md:hidden"></span>
        </div>
        <div className="flex flex-grow flex-col gap-[20px] overflow-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
