import React from 'react';
import QuestionOption from '@/components/QuestionOption';
import ProfileOption from '@/components/ProfileOption';
import Caption from '@/components/Caption';
import HeaderText from '@/components/HeaderText';
import { LongButton } from '@/components/Buttons';
import NavBar from '@/components/NavBar';
import Image from 'next/image'

function QuestionBlock({ className = '' }) {
  return (
    <div className={`flex justify-center p-2 rounded-2xl border-2 border-black overflow-hidden h-[600px] mb-[-580px] ${className}`}>
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

      <div className="flex flex-col mb-[580px]">
        <div className="flex flex-col justify-between p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[600px] z-[6] mb-[-580px]">
          <div className="flex-grow"></div>
          <div className="flex flex-col justify-center mx-auto">
            <h1 className="text-center mb-3 px-10">What are the symptoms in the affected area?</h1>
            <Caption className="text-center mb-10 px-10">Choose all that apply</Caption>

            <div className="flex flex-wrap justify-center items-center opacity-50">
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

      <div className="flex flex-col my-8">
        <div className="flex flex-wrap justify-initial items-center">
          {["18-4", "Male", "AB+", "120 lbs", "5'7\""].map((text, index) => (
            <ProfileOption text={text} selected={index == 0} key={index} />
          ))}
        </div>

        <p className="p-2 pt-6">As a company that has achieved ISO 27001, SOC 2, CCPA, GDPR and HIPAA certifications, we understand the critical importance of information security in today's digital landscape. The increasing frequency and sophistication of cyber attacks highlight the necessity for businesses to prioritize security to safeguard their data and ensure the trust and confidence of their clients. By implementing industry-standard security measures and best practices, we demonstrate our unwavering commitment to the protection of sensitive information and the preservation of the integrity of our operations. We take pride in the rigorous security protocols we have in place and are dedicated to maintaining the highest standards of security excellence.</p>
      </div>

      <div className="flex justify-center p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[350px] mt-4">
        <div className="flex-grow"></div>
      </div>
    </div>

      <div className="p-4">
        <div className="bg-gray-300 h-px mt-4 mb-[30px]"></div>

          <Image width={4} height={4} className="w-24 my-4" src="/poppyFull.svg" alt="Poppy" />

          <Caption>Poppy.com® is a registered trademark by Poppy.com, Inc. All rights reserved.</Caption>

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


        <div className="flex w-full mt-8">
          <div className="w-1/2">
            <div className="flex flex-col items-start">
             <HeaderText>COMPANY</HeaderText>
              <h3>About us</h3>
              <h3>Terms</h3>
              <h3>Privacy</h3>
            </div>
          </div>
          <div className="w-1/2">
           <div className="flex flex-col items-start">
              <HeaderText>RESOURCES</HeaderText>
              <h3>FAQ</h3>
              <h3>Downloads</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
