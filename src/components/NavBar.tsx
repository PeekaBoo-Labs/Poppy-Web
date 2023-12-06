import Image from 'next/image';

import '../styles/fonts.css';
import './NavBar.css';

function NavDropdown({ text, children }: { text: string, children?: React.ReactNode }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm font-regular'>{text}</span>
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
  return (
    <div className={`w-[100vw] fixed top-0 z-[999] px-5 bg-[#F1EFED]`}>
      <div className="flex justify-between items-center max-w-4xl mx-auto py-5 border-b border-[#D9D9D9]">
        <a href="./home">
          <Image priority={true} width={60} height={100} src="/poppyFull.svg" alt="Poppy" />
        </a>
        <div className='flex flex-row gap-10'>
          <NavDropdown text='Resources'></NavDropdown>
          <NavDropdown text='Get Started'></NavDropdown>
        </div>
      </div>
    </div>
  )
}