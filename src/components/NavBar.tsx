import Image from 'next/image'

import './NavBar.css'
import '../styles/fonts.css'
import Caption from './Caption'

export default function NavBar() {
  return (
    <div className="flex justify-between items-center mb-4 z-[99]">
      <Image width={4} height={4} className="w-16 mix-blend-difference" src="/poppyFull.svg" alt="Poppy"/>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="x">
        <div className="flex flex-col justify-between h-3.5">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </label>

      <div className="mobile-menu p-5 pt-20">
        <div className="flex w-full">
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <Caption>Overview</Caption>
              <p>Over</p>
              <p>Over</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <Caption>Overview</Caption>
              <p>Over</p>
              <p>Over</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
