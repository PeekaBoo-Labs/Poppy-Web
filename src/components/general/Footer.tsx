import Title from "../Title";
import Caption from "../Caption";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex h-[234px] w-full justify-center bg-[#F1EFED] py-[60px] opacity-0">
      <div className="flex w-full flex-col items-center font-black">
        {/* Upper section for logo and navigation links */}
        <div className="flex w-full justify-between">
          {/* Placeholder for the logo */}
          <div className="flex items-start align-top">
            <Image src="/poppyPLogo.svg" alt="Logo" width={15} height={15} />
          </div>
          {/* Navigation links */}
          <div className="flex gap-2 space-x-10">
            <div className="flex flex-col items-start gap-2">
              <span className="subheadline font-normal">Resources</span>
              <span className="subheadline font-normal text-[#ACACAC]">
                Research
              </span>
              <span className="subheadline font-normal text-[#ACACAC]">
                Documentation
              </span>
              <span className="subheadline font-normal text-[#ACACAC]">
                FAQs
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="subheadline font-normal">Product</span>
              <span className="subheadline font-normal text-[#ACACAC]">
                Poppy
              </span>
              <span className="subheadline font-normal text-[#ACACAC]">
                API
              </span>
              <span className="subheadline font-normal text-[#ACACAC]">
                Change Log
              </span>
            </div>
            <div className="items-star flex flex-col gap-2">
              <span className="subheadline font-normal">Company</span>
              <span className="subheadline font-normal text-[#ACACAC]">
                About
              </span>
              <span className="subheadline font-normal text-[#ACACAC]">
                Contact
              </span>
              <span className="subheadline font-normal text-[#ACACAC]">
                Terms & Privacy
              </span>
            </div>
          </div>
          {/* Social icons placeholder */}
          <div className="flex flex-col items-end gap-3">
            <div className="">
              <span className="subheadline font-normal text-[#ACACAC]">
                🧑🏻‍💻 with ❤️ from Irvine and Santa Cruz
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/github.svg" alt="Icon" width={18} height={18} />
              <Image src="/twitter.svg" alt="Icon" width={18} height={18} />
              <Image src="/email.svg" alt="Icon" width={18} height={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

