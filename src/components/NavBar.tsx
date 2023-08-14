import Image from 'next/image'

import './NavBar.css';
import '../styles/fonts.css';
import Caption from './Caption';
import HeaderText from '@/components/HeaderText';
import Title from '@/components/Title';

export default function NavBar() {
  return (
    <div className="flex flex-col justify-between w-full max-w-[1100px] fixed top-0 bg-[#F7F7F7] z-[99999]">
    <div className="flex justify-between items-center mb-4 z-[99] m-4">
      <Image width={4} height={4} className="w-14 mix-blend-exclusion z-[99]" src="/poppyFull.svg" alt="Poppy"/>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="x">
        <div className="flex flex-col justify-between h-[10px]">
          <span></span>
          <span></span>
        </div>
      </label>

      <div className="mobile-menu z-[10]">
        <div className="flex flex-col p-4 mt-4 justify-between">

          <div className="flex flex-col h-[80vh] justify-center mt-8 space-y-[20px]">
            <Title>Stories</Title>
            <Title>Listen</Title>
            <Title>Team</Title>
            <Title>Tools</Title>
          </div>

          <div className="mt-4 flex gap-4">
              <a className="[&amp;>svg]:fill-primary-300 [&amp;>svg]:transition-fill [&amp;>svg]:duration-150 [&amp;>svg]:hover:fill-white" aria-label="Discord" target="_blank" rel="noopener" href="https://go.cal.com/discord">
                  <svg className="mt-0.5" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
                      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"></path>
                  </svg>
              </a>
              <a className="[&amp;>svg]:fill-primary-300 [&amp;>svg]:transition-fill [&amp;>svg]:duration-150 [&amp;>svg]:hover:fill-white" aria-label="Twitter" target="_blank" rel="noopener" href="https://twitter.com/calcom">
                  <svg className="mt-1" width="22" height="22" viewBox="0 0 26 26" aria-label="X formerly known as Twitter" fill="currentColor">
                      <path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"></path>
                  </svg>
              </a>
            </div>
        </div>
      </div>
      </div>

      <div className="bg-gray-300 h-px mx-4"></div>
      <div className="flex-grow"></div>

    </div>
  )
}
