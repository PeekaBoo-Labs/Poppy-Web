'use client'
import Image from 'next/image';
import { LongButton } from './Buttons';
import Link from 'next/link';
import '../styles/fonts.css';
import './NavBar.css';
import { usePathname } from 'next/navigation'

function NavDropdown({ text, children }: { text: string, children?: React.ReactNode }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='font-regular text-sm'>{text}</span>
      <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 5.53857C4.1748 5.53857 3.91992 5.42432 3.64307 5.14746L0.540527 1.979C0.355957 1.78125 0.263672 1.56152 0.263672 1.29346C0.263672 0.739746 0.716309 0.282715 1.26123 0.282715C1.53809 0.282715 1.79297 0.401367 2.0083 0.616699L4.50879 3.21387L6.9917 0.616699C7.20264 0.392578 7.46191 0.282715 7.73438 0.282715C8.2749 0.282715 8.73193 0.739746 8.73193 1.29346C8.73193 1.56592 8.64404 1.78564 8.45068 1.979L5.35693 5.14746C5.08008 5.41553 4.82959 5.53418 4.5 5.53857Z" fill="#202221" />
      </svg>

      <div className='flex flex-col gap-2'>
        {children}
      </div>
    </div>
  )
}

export default function NavBar() {
  const pathname = usePathname()
  return (
    <div className={`fixed left-0 top-0 z-[999] flex h-[70px] w-[100dvw] items-center justify-center border-b border-[#D9D9D9] bg-[#F1EFED]`}>
      <div className="flex w-full items-center justify-between px-[35px]">
        <a href="./home" className="flex flex-row gap-[10px]">
          <Image priority={true} width={65.02} height={19} src="/poppyFull.svg" alt="Poppy" />
        </a>

        <div className='flex cursor-default flex-row gap-[35px]'>
          <div className="flex flex-row items-center gap-[7px]">
            <span className="subheadline">Product</span>

            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
              <path d="M4.50244 5.45361C4.22998 5.45361 4.01025 5.35693 3.78174 5.12402L0.608887 1.88525C0.446289 1.71387 0.367188 1.5249 0.367188 1.29199C0.367188 0.817383 0.753906 0.421875 1.22412 0.421875C1.46143 0.421875 1.68115 0.522949 1.86133 0.70752L4.51123 3.44531L7.14795 0.70752C7.32812 0.518555 7.54785 0.421875 7.78076 0.421875C8.25098 0.421875 8.6377 0.817383 8.6377 1.29199C8.6377 1.5249 8.56299 1.71826 8.396 1.88086L5.22754 5.12402C4.99902 5.35254 4.78369 5.45361 4.50244 5.45361Z" fill="#202221" />
            </svg>
          </div>

          <div className="flex flex-row items-center gap-[7px]">
            <span className="subheadline">Resources</span>

            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
              <path d="M4.50244 5.45361C4.22998 5.45361 4.01025 5.35693 3.78174 5.12402L0.608887 1.88525C0.446289 1.71387 0.367188 1.5249 0.367188 1.29199C0.367188 0.817383 0.753906 0.421875 1.22412 0.421875C1.46143 0.421875 1.68115 0.522949 1.86133 0.70752L4.51123 3.44531L7.14795 0.70752C7.32812 0.518555 7.54785 0.421875 7.78076 0.421875C8.25098 0.421875 8.6377 0.817383 8.6377 1.29199C8.6377 1.5249 8.56299 1.71826 8.396 1.88086L5.22754 5.12402C4.99902 5.35254 4.78369 5.45361 4.50244 5.45361Z" fill="#202221" />
            </svg>
          </div>

          <div className='rounded-[10px] bg-[#202221] px-[21px] py-[12px] text-xs text-white'>Screen Now</div>
        </div>
      </div>
    </div>
  )
}