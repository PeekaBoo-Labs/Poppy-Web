import { TestKit } from "@/app/api/v2/getTestKits/route";
import ArrowUpRight from "@/lib/icons/arrow-up-right";
import Link from "next/link";

export default function TestKitItem({ testKit }: { testKit: TestKit }) {
  return (
    <Link
      href={testKit.resource_link}
      target="_blank"
      className="flex flex-col gap-4 rounded-[13px] border border-border px-[21px] py-[19px]"
    >
      <div className="flex items-center gap-[10px]">
        <span className="flex-1 text-sm font-semibold lg:text-base">
          {testKit.name}
        </span>
        <ArrowUpRight width={16} height={16} />
      </div>
      <div className="flex flex-col gap-[5px] border-t border-border pt-4">
        {testKit.resources.map((resource, i) => (
          <span className="text-xs text-secondary" key={i}>
            {resource[0]}
          </span>
        ))}
      </div>
    </Link>
  );
}
