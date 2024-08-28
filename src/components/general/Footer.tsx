import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ border }: { border?: boolean }) {
  return (
    <footer
      className={cn(
        border && "border-t border-border md:border-0",
        "flex flex-col justify-center gap-8 px-4 py-8 text-xs md:flex-row md:justify-between md:px-8",
      )}
    >
      {/* Made in Irvine and Santa Cruz */}

      <section className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Image
            src="/poppyPLogo.svg"
            className="h-[18] w-[15px] object-contain"
            alt=""
            width={35}
            height={35}
          />
          <span>Made in Irvine and Santa Cruz</span>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <Link href="https://github.com/Peekaboo-Labs">
            <Image
              src="/socials/github.svg"
              className="object-contain"
              alt=""
              width={16}
              height={16}
            />
          </Link>
          <Image
            src="/socials/twitter.svg"
            className="object-contain"
            alt=""
            width={16}
            height={16}
          />
          <Link
            href="mailto:https://nnathanchoi@gmail.com"
            className="contents"
          >
            <Image
              src="/socials/email.svg"
              className="object-contain"
              alt=""
              width={16}
              height={12}
            />
          </Link>
        </div>
      </section>

      {/* Links */}

      <section className="flex gap-4 text-secondary md:gap-28 md:text-right">
        <div className="flex flex-grow flex-col gap-[10px]">
          <h3 className="font-medium text-primary">Product</h3>
          <Link href="https://poppyml.com/research">Research</Link>
          <span className="pointer-events-none blur-[3px]">APIs</span>
          <Link href="https://poppyml.com/terms&privacy">Terms & Privacy</Link>
        </div>
        <div className="flex flex-grow flex-col gap-[10px]">
          <h3 className="font-medium text-primary">Resources</h3>
          <span className="pointer-events-none blur-[3px]">Documentation</span>
          <span className="pointer-events-none blur-[3px]">Change Log</span>
          <Link href="https://poppyml.com/contact">Contact Us</Link>
        </div>
      </section>

      {/* Preferences (heck no) */}
    </footer>
  );
}
