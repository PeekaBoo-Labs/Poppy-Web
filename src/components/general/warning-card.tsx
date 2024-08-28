import Warning from "@/lib/icons/warning";

type WarningCardProps = {
  title: string;
  body: string;
};

export default function WarningCard({ title, body }: WarningCardProps) {
  return (
    <div className="flex items-center gap-[28px] rounded-[13px] border border-border bg-tertiary px-[19px] py-[21px]">
      <div className="flex flex-1 flex-col gap-[5px]">
        <span className="text-sm font-semibold">{title}</span>
        <p className="text-sm">{body}</p>
      </div>

      <Warning />
    </div>
  );
}
