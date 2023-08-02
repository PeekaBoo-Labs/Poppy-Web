import QuestionOption from '@/components/QuestionOption'
import Caption from '@/components/Caption'
import { LongButton } from '@/components/Buttons'

import Image from 'next/image'

import './page.css'
import './fonts.css'

export default function Home() {
  return (
    <body>
      <div className="flex flex-col m-4">
        <div className="flex justify-between items-center mb-4">
          <Image width={4} height={4} className="w-16" src="/poppyFull.svg" alt="Poppy"></Image>

          <div className="flex flex-col justify-between h-3.5 w-5">
            <div className="h-[2.5px] bg-black w-full"></div>
            <div className="h-[2.5px] bg-black w-full"></div>
            <div className="h-[2.5px] bg-black w-full"></div>
          </div>
        </div>

        <div className="bg-gray-300 h-px"></div>

        <div className="flex justify-between my-4">
          <div></div>
          <div className="space-x-10 flex">
            <p>Screening</p>
            <p>About</p>
          </div>
        </div>

        <div className="flex justify-between p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[85vh]">
          <div className="flex-grow"></div>
          <div className="flex flex-col justify-between">
            <div className="flex-grow"></div>

            <h1 className="text-center mb-3 px-10">What are the symptoms in the affected area?</h1>
            <Caption>Choose all that apply</Caption>

            <div className="flex flex-wrap justify-center items-center">
              {
                ["18-4", "Male", "AB+", "120 lbs", "5'7\""].map((text, index) => (
                  <QuestionOption text={text} selected={index == 0} key={index} />
                ))
              }
            </div>

            <div className="flex-grow"></div>

            <div className="flex w-full">
              <LongButton type="secondary">Back</LongButton>
              <LongButton type="primary">Next</LongButton>
            </div>
          </div>
          <div className="flex-grow"></div>
        </div>

      </div>
    </body>
  )
}