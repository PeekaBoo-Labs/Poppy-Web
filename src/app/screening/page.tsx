import React from 'react';
import { Drawer } from 'vaul';
import QuestionInputOption from '@/components/QuestionOption';
import ProfileOption from '@/components/ProfileOption';
import Title from '@/components/Title';
import Caption from '@/components/Caption';
import HeaderText from '@/components/HeaderText';
import { LongButton } from '@/components/Buttons';
import NavBar from '@/components/NavBar';
import Image from 'next/image'

function QuestionBlock({ className = '' }) {
  return (
    <div className={`flex justify-center items-center p-2 rounded-3xl overflow-hidden h-[230px] mb-[-175px] ${className}`}>
      <h1 className="text-center px-10">In Progress</h1>
    </div>
  );
}

function QuestionBlockUnder({ className = '' }) {
  return (
    <div className={`relative flex items-center p-2 rounded-3xl overflow-hidden h-[230px] mb-[-175px] ${className}`}>
      <h1 className="text-center px-10 w-full">In Progress</h1>
      <h5 className="absolute bottom-[14px] left-5">September 1, 2023</h5>
    </div>
  );
}

export default function Test() {
  return (

    <body className="bg-[#F7F7F7]">
      <div className="flex flex-col justify-center items-center bg-[#F7F7F7] text-[#262626]">
        {/*
    <ScrollHeader /> */}

        <NavBar />
        <div className="flex flex-col px-4 mt-[50px] w-full">
          {/* <div className="flex justify-between mt-6 px-[3px] w-full">
        <h3 className="font-[500]">Profile</h3>
        <h5 className="font-[400] text-gray-400">Switch User</h5>
      </div> */}

          <div className="flex flex-col mt-5 mb-2 w-full">
            <div
              className="relative flex items-end rounded-3xl overflow-hidden h-[230px] bg-[#FFF] border-[2px] border-gray-200">
              <div className="absolute flex justify-between items-center top-[20px] px-5 w-full">
                <h3 className="text-[1.3rem] font-[500]">Polarizz</h3>
                <h5 className="font-[400] text-gray-400">Edit Profile</h5>
              </div>

              <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-3 p-5 w-full text-gray-400">
                <div className="flex"><span className="mr-2 font-[400] text-gray-300">1.</span>
                  <div className="border-b border-gray-200 w-full pb-[3px]">18-24</div>
                </div>
                <div className="flex"><span className="mr-2 font-[400] text-gray-300">2.</span>
                  <div className="border-b border-gray-200 w-full pb-[3px]">Male</div>
                </div>
                <div className="flex"><span className="mr-2 font-[400] text-gray-300">3.</span>
                  <div className="border-b border-gray-200 w-full pb-[3px]">Asian</div>
                </div>
                <div className="flex"><span className="mr-2 font-[400] text-gray-300">4.</span>
                  <div className="border-b border-gray-200 w-full pb-[3px]">AB+</div>
                </div>
                <div className="flex"><span className="mr-2 font-[400] text-gray-300">5.</span>
                  <div className="border-b border-gray-200 w-full pb-[3px]">125 lbs</div>
                </div>
                <div className="flex"><span className="mr-2 font-[400] text-gray-300">6.</span>
                  <div className="border-b border-gray-200 w-full pb-[3px]">170cm</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6 px-[3px] w-full">
            <h3 className="font-[500]">Screening Results</h3>
            <h3 className="font-[400] text-gray-400">4</h3>
          </div>

          <div className="flex flex-col mt-4 mb-[180px] pb-4">
            <QuestionBlock className="bg-[#FFF] border-[2px] border-gray-200 z-[5]" />
            <QuestionBlockUnder className="text-gray-400 bg-[#FFF] border-[2px] border-gray-200 z-[4]" />
            <QuestionBlockUnder className="text-white bg-[#FFA701] border-[2px] border-orange-200 z-[3]" />
            <QuestionBlockUnder className="text-white bg-[#FFA701] border-[2px] border-orange-200 z-[2]" />
            <QuestionBlockUnder className="text-gray-400 bg-[#FFF] border-[2px] border-gray-200 z-[1]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-[#FFE819] text-[#262626] p-4 pt-16 w-full">
        <div className="flex flex-col justify-center mx-auto">
          <Title className="text-center px-10 mb-8">Want results saved and sent straight to your inbox?</Title>
        </div>

        <div
          className="flex flex-grow justify-between items-center px-4 py-2.5 rounded-[15px] border-[2px] border-black select-none cursor-default">
          <h4 className="text-[#262626] font-[400]">Enter your email</h4>
          <Caption className="text-[#262626] font-[500]">SEND</Caption>
        </div>

        <Caption className="flex justify-center align-center text-center text-[#262626] opacity-50 mt-16 mb-4 px-4">By
          clicking send you'll receive occasional emails from Poppy. You always have the choice to unsubscribe within every
          email you receive.</Caption>

      </div>

      <div className="flex flex-col justify-center bg-[#262626] text-[#F7F7F7] p-4 w-full">
        <Image width={60} height={100} className="mt-4" src="/poppyFullWhite.svg" alt="Poppy" />

        <div className="flex flex-col my-8">
          <h4>Stories</h4>
          <h4>Listen</h4>
          <h4>Team</h4>
          <h4>Tools</h4>
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
    </body>
  );
}