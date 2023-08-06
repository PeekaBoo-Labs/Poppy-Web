import React from 'react';
import QuestionOption from '@/components/QuestionOption';
import Caption from '@/components/Caption';
import { LongButton } from '@/components/Buttons';
import NavBar from '@/components/NavBar';

// You can use dynamic import if ScrollHeader is client-only
// import dynamic from 'next/dynamic';
// const ScrollHeader = dynamic(() => import('@/components/ScrollHeader'), { ssr: false });

import './page.css';
import '../styles/fonts.css';

function QuestionBlock({ bgColor = '#FFFAF0', zIndex = 5 }) {
  return (
    <div className={`flex justify-center p-2 bg-[${bgColor}] rounded-2xl border-2 border-black overflow-hidden h-[85vh] z-[${zIndex}]`}>
      <div className="flex-grow"></div>
      <div className="flex flex-col justify-between h-full items-start">
        <div className="flex-grow"></div>
        <Caption>Choose all that apply</Caption>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col m-4">
      {/* <ScrollHeader/> */}

      <NavBar/>
      <div className="bg-gray-300 h-px"></div>
      
      <div className="flex justify-between my-4">
        <div></div>
        <div className="space-x-10 flex">
          <p>Screening</p>
          <a href="/company/about"><p>About</p></a>
        </div>
      </div>

      <div className="flex flex-col space-y-[-190%]">
        <QuestionBlock bgColor="#FFFAF0" zIndex={5} />
        <QuestionBlock bgColor="#FFFAF0" zIndex={4} />
        <QuestionBlock bgColor="#FFA701" zIndex={3} />
        <QuestionBlock bgColor="#FFA701" zIndex={2} />
        <QuestionBlock bgColor="#FFFAF0" zIndex={1} />
      </div>

      <div className="flex justify-center p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[40vh] mt-4">
        <div className="flex-grow"></div>
      </div>

      <div className="bg-gray-300 h-px my-4 mt-10"></div>

      <div className="flex w-full">
        <div className="w-1/2">
          <div className="flex flex-col items-start">
            <caption>Overview</caption>
            <p>Over</p>
            <p>Over</p>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col items-start">
            <caption>Overview</caption>
            <p>Over</p>
            <p>Over</p>
          </div>
        </div>
      </div>
    </div>
  );
}
