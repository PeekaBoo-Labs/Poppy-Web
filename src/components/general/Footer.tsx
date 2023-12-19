import Title from "../Title"
import Caption from "../Caption"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className='w-full flex-grow flex justify-center'>
      <div className='flex flex-col items-center max-w-[800px] w-full font-black'>
        {/* Upper section for logo and navigation links */}
        <div className='flex justify-between w-full p-6'>
          {/* Placeholder for the logo */}
          <div className='flex align-top items-start'>
            <Image src='/poppyPLogo.svg' alt='Logo' width={15} height={15} />
          </div>
          {/* Navigation links */}
          <div className='flex space-x-10 gap-2'>
            <div className='flex flex-col items-start gap-1'>
              <p className="text-xs font-semibold">Resources</p>
              <p className="text-xs text-[#ACACAC]">Research</p>
              <p className="text-xs text-[#ACACAC]">Documentation</p>
              <p className="text-xs text-[#ACACAC]">FAQs</p>
            </div>
            <div className='flex flex-col items-start gap-1'>
              <p className="text-xs font-semibold">Product</p>
              <p className="text-xs text-[#ACACAC]">Poppy</p>
              <p className="text-xs text-[#ACACAC]">APIs</p>
              <p className="text-xs text-[#ACACAC]">Change Log</p>
            </div>
            <div className='flex flex-col items-star gap-1'>
              <p className="text-xs font-semibold">Company</p>
              <p className="text-xs text-[#ACACAC]">About</p>
              <p className="text-xs text-[#ACACAC]">Contact</p>
              <p className="text-xs text-[#ACACAC]">Terms & Privacy</p>
            </div>
          </div>
          {/* Social icons placeholder */}
          <div className="flex flex-col items-end gap-2">
            <div className=''>
              <p className='text-xs text-[#ACACAC]'>🧑🏻‍💻 with ❤️ from Irvine and Santa Cruz</p>
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