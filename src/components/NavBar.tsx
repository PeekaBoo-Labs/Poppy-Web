import Image from 'next/image'

import './NavBar.css';
import '../styles/fonts.css';
import Caption from './Caption';
import Title from '@/components/Title';

export default function NavBar({wide_mode}) {
  return (
      <div className={`flex flex-col justify-between w-[100vw] fixed top-0 bg-[#F7F7F7] z-[999] sm:z-1 sm:bg-opacity-75 md:bg-opacity-100 min-[320px]:z-1 ${wide_mode ? "80vw" : "max-w-[1100px]"}`}>
      <div className="flex justify-between items-center mb-4 z-[99] m-4">
        <a href="./home">
          <Image priority={true} width={60} height={100} className="mix-blend-exclusion z-[99]" src="/poppyFull.svg" alt="Poppy" />
        </a>

        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="x">
          <div className="flex flex-col justify-between h-[10px]">
            <span></span>
            <span></span>
          </div>
        </label>

        <div className="mobile-menu z-[9999]">
          <div className="flex flex-col p-4 mt-4 justify-between">

            <div className="flex flex-col h-[80vh] justify-center mt-8 space-y-[20px]">
              <a href="./app">
                <Title>Stories</Title>
              </a>
              <Title>Listen</Title>
              <Title>Team</Title>
              <Title>Tools</Title>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <svg width="21" height="21" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>

              <a className="[&amp;>svg]:fill-primary-300 [&amp;>svg]:transition-fill [&amp;>svg]:duration-150 [&amp;>svg]:hover:fill-white"
                aria-label="Discord" target="_blank" rel="noopener" href="https://go.cal.com/discord">
                <svg className="mt-0.5" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36">
                  <path
                    d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z">
                  </path>
                </svg>
              </a>
              <a className="[&amp;>svg]:fill-primary-300 [&amp;>svg]:transition-fill [&amp;>svg]:duration-150 [&amp;>svg]:hover:fill-white"
                aria-label="Twitter" target="_blank" rel="noopener" href="https://twitter.com/calcom">
                <svg className="mt-1" width="22" height="22" viewBox="0 0 26 26" aria-label="X formerly known as Twitter"
                  fill="currentColor">
                  <path
                    d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z">
                  </path>
                </svg>
              </a>
            </div>

            <Caption className="mt-4">© 2023 Poppy</Caption>

          </div>
        </div>
      </div>

      <div className="bg-gray-300 h-px mx-4"></div>
      <div className="flex-grow"></div>

    </div>

    
  )
}