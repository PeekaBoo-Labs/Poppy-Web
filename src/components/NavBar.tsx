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

      <div className="mobile-menu pt-20">
        <div className="p-4">
          <div className="bg-gray-300 h-px mt-4"></div>

          <Image width={4} height={4} className="w-32 my-8" src="/poppyFullWhite.svg" alt="Poppy" />

          <div className="flex w-full">
            <div className="w-1/2">
              <div className="flex flex-col items-start space-y-1.5">
                <h3>Over</h3>
                <h3>Over</h3>
              </div>
            </div>
            <div className="w-1/2">
            <div className="flex flex-col items-start space-y-1.5">
                <h3>Over</h3>
                <h3>Over</h3>
              </div>
            </div>
          </div>

          <div className="bg-gray-300 h-px my-4"></div>

          <div className="flex">
            <Caption>Copyright ©2023 Boom Supersonic. All rights reserved. Except as otherwise expressly permitted, no images or other content displayed on this website may be copied, reprinted, republished, modified, or distributed in any form without the express written permission of the copyright owner.</Caption>
          </div>
        </div>
      </div>
    </div>
  )
}
