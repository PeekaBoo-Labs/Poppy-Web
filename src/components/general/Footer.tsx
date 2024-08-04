import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ border }: { border?: boolean }) {
  return (
    <footer className={cn(
      border && "md:border-0 border-t border-border",
      "flex text-xs flex-col md:flex-row md:justify-between gap-8 justify-center py-8 px-4 md:px-8"
    )}>
      {/* Made in Irvine and Santa Cruz */}

      <section className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Image src="/poppyPLogo.svg" className="object-contain w-[15px] h-[18]" alt="" width={35} height={35} />
          <span>Made in Irvine and Santa Cruz</span>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <Link href="https://github.com/Peekaboo-Labs">
            <Image src="/socials/github.svg" className="object-contain" alt="" width={16} height={16} />
          </Link>
          <Image src="/socials/twitter.svg" className="object-contain" alt="" width={16} height={16} />
          <Link href="mailto:https://nnathanchoi@gmail.com" className="contents">
            <Image src="/socials/email.svg" className="object-contain" alt="" width={16} height={12} />
          </Link>
        </div>

      </section>

      {/* Links */}

      <section className="flex gap-4 text-secondary md:text-right md:gap-28">
        <div className="flex flex-col gap-[10px] flex-grow">
          <h3 className="font-medium text-primary">Product</h3>
          <Link href="https://poppyml.com/research">Research</Link>
          <span className="blur-[3px] pointer-events-none">APIs</span>
          <Link href="https://poppyml.com/terms&privacy">Terms & Privacy</Link>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow">
          <h3 className="font-medium text-primary">Resources</h3>
          <span className="blur-[3px] pointer-events-none">Documentation</span>
          <span className="blur-[3px] pointer-events-none">Change Log</span>
          <span className="blur-[3px] pointer-events-none">Contact Us</span>
        </div>
      </section>

      {/* Preferences (heck no) */}

    </footer>
  );
}
