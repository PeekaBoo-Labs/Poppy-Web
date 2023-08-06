import React from 'react';
import QuestionOption from '@/components/QuestionOption';
import Caption from '@/components/Caption';
import { LongButton } from '@/components/Buttons';
import NavBar from '@/components/NavBar';
import Image from 'next/image'

function QuestionBlock({ className = '' }) {
  return (
    <div className={`flex justify-center p-2 rounded-2xl border-2 border-black overflow-hidden h-[600px] mb-[-500px] ${className}`}>
      <div className="flex-grow"></div>
      <div className="flex flex-col justify-between h-full items-start">
        <div className="flex-grow"></div>
        <Caption className="text-center mb-10 px-10">Choose all that apply</Caption>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
}


export default function Home() {
  return (
    <div className="flex flex-col bg-[#FFFAF0] text-[#262626]">

    <div className="flex flex-col m-4">
      {/* <ScrollHeader/> */}

      <NavBar />
      <div className="bg-gray-300 h-px"></div>

      <div className="flex justify-between my-4">
        <div></div>
        <div className="space-x-10 flex">
          <p>Screening</p>
          <a href="/company/about"><p>About</p></a>
        </div>
      </div>

      <div className="flex flex-col mb-[500px]">
      <div className="flex flex-col justify-between p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[600px] z-[6] mb-[-500px]">
          <div className="flex-grow"></div>
          <div className="flex flex-col justify-center mx-auto">
            <h1 className="text-center mb-3 px-10">What are the symptoms in the affected area?</h1>
            <Caption className="text-center mb-10 px-10">Choose all that apply</Caption>

            <div className="flex flex-wrap justify-center items-center">
              {["18-4", "Male", "AB+", "120 lbs", "5'7\""].map((text, index) => (
                <QuestionOption text={text} selected={index == 0} key={index} />
              ))}
            </div>
          </div>
          <div className="flex-grow"></div>

          <div className="flex w-full">
            <LongButton type="secondary">Back</LongButton>
            <LongButton type="primary">Next</LongButton>
          </div>
        </div>

        <QuestionBlock className="bg-[#FFFAF0] z-[5]" />
        <QuestionBlock className="bg-[#FFFAF0] z-[4]" />
        <QuestionBlock className="bg-[#FFA701] z-[3]" />
        <QuestionBlock className="bg-[#FFA701] z-[2]" />
        <QuestionBlock className="bg-[#FFFAF0] z-[1]" />
      </div>

      <div className="flex justify-center p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[350px] mt-4">
        <div className="flex-grow"></div>
      </div>
    </div>

      <div className="p-4">
        <div className="bg-gray-300 h-px mt-4"></div>

        <Image width={4} height={4} className="w-32 my-8" src="/poppyFull.svg" alt="Poppy" />

        <div className="flex w-full">
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <Caption className="text-gray-400">Overview</Caption>
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

        <div className="bg-gray-300 h-px my-4"></div>

        <div className="flex">
          <Caption>Copyright ©2023 Boom Supersonic. All rights reserved. Except as otherwise expressly permitted, no images or other content displayed on this website may be copied, reprinted, republished, modified, or distributed in any form without the express written permission of the copyright owner.</Caption>
        </div>
      </div>
    </div>
  );
}
