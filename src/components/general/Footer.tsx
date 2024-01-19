import Title from "../Title"
import Caption from "../Caption"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className='w-full flex-grow flex justify-center bg-[#F1EFED]'>
      <div className='flex flex-col items-center max-w-[1050px] w-full font-black'>
        {/* Upper section for logo and navigation links */}
        <div className='flex justify-between w-full py-[70px]'>
          {/* Placeholder for the logo */}
          <div className='flex align-top items-start'>
            <Image src='/poppyPLogo.svg' alt='Logo' width={15} height={15} />
          </div>
          {/* Navigation links */}
          <div className='flex space-x-10 gap-2'>
            <div className='flex flex-col items-start gap-2'>
              <span className="subheadline font-normal">Resources</span>
              <span className="subheadline font-normal text-[#ACACAC]">Research</span>
              <span className="subheadline font-normal text-[#ACACAC]">Documentation</span>
              <span className="subheadline font-normal text-[#ACACAC]">FAQs</span>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <span className="subheadline font-normal">Product</span>
              <span className="subheadline font-normal text-[#ACACAC]">Poppy</span>
              <span className="subheadline font-normal text-[#ACACAC]">API</span>
              <span className="subheadline font-normal text-[#ACACAC]">Change Log</span>
            </div>
            <div className='flex flex-col items-star gap-2'>
              <span className="subheadline font-normal">Company</span>
              <span className="subheadline font-normal text-[#ACACAC]">About</span>
              <span className="subheadline font-normal text-[#ACACAC]">Contact</span>
              <span className="subheadline font-normal text-[#ACACAC]">Terms & Privacy</span>
            </div>
          </div>
          {/* Social icons placeholder */}
          <div className="flex flex-col items-end gap-3">
            <div className=''>
              <span className='subheadline font-normal text-[#ACACAC]'>🧑🏻‍💻 with ❤️ from Irvine and Santa Cruz</span>
            </div>
            <div className='flex items-center gap-3'>
              <Image src='/github.svg' alt='Icon' width={18} height={18} />
              <Image src='/twitter.svg' alt='Icon' width={18} height={18} />
              <Image src='/email.svg' alt='Icon' width={18} height={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}