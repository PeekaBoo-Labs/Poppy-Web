import Image from 'next/image'
import './page.css'
import './fonts.css'

export default function Home() {
  return (
    <body>
      <div className="flex flex-col m-4">
        <div className="flex justify-between items-center mb-4">
          <img className="w-16" src="/poppyFull.svg" alt="Poppy"></img>

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

                <h1 className="text-center mb-3  px-10">What are the symptoms in the affected area?</h1>
                <caption className="text-center mb-10 px-10">Choose one or more options</caption>

                <div className="flex flex-wrap justify-center items-center">
                  <div className="px-5 py-3 m-1 bg-[#FFFAF0] rounded-full border-2 border-black">
                    <p className="text-center">18-24</p>
                  </div>

                  <div className="px-5 py-3 m-1 bg-[#FFFAF0] rounded-full border-2 border-black">
                    <p className="text-center">Male</p>
                  </div>

                  <div className="px-5 py-3 m-1 bg-[#FFFAF0] rounded-full border-2 border-black">
                    <p className="text-center">AB+</p>
                  </div>

                  <div className="px-5 py-3 m-1 bg-[#FFFAF0] rounded-full border-2 border-black">
                    <p className="text-center">120 lbs</p>
                  </div>

                  <div className="px-5 py-3 m-1 bg-[#FFFAF0] rounded-full border-2 border-black">
                    <p className="text-center">5'7"</p>
                  </div>
                </div>

                <div className="flex-grow"></div>

                <div className="flex w-full">
                  <div className="flex-grow justify-between px-5 py-3 m-1 bg-[#FFFAF0] rounded-[10px] border-2 border-black">
                    <p className="text-center">Back</p>
                  </div>

                  <div className="flex-grow justify-between px-5 py-3 m-1 bg-[#000] rounded-[10px] border-2 border-black">
                    <p className="text-center invert">Next</p>
                  </div>
                </div>
            </div>
            <div className="flex-grow"></div>
        </div>

      </div>
    </body>
  )
}