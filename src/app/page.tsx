import QuestionOption from '@/components/QuestionOption'
import Caption from '@/components/Caption'
import { LongButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'

import './page.css'
import '../styles/fonts.css'

export default function Home() {
  return (
    <body>
      <div className="flex flex-col m-4">
        <NavBar/>
        <div className="bg-gray-300 h-px"></div>

        <div className="flex justify-between my-4">
          <div></div>
          <div className="space-x-10 flex">
            <p>Screening</p>
            <a href="/company/about"><p>About</p></a>
          </div>
        </div>

        <div className="flex flex-col space-y-[-190%]  z-[-1]">
          <div className="flex justify-between p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[85vh] z-[5]">
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

          <div className="flex justify-center p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[85vh] z-[4]">
            <div className="flex-grow"></div>
            <div className="flex flex-col justify-between h-full items-start">
              <div className="flex-grow"></div>
              <Caption>Choose all that apply</Caption>
            </div>
            <div className="flex-grow"></div>
          </div>

          <div className="flex justify-center p-2 bg-[#FFA701] rounded-2xl border-2 border-black overflow-hidden h-[85vh] z-[3]">
            <div className="flex-grow"></div>
            <div className="flex flex-col justify-between h-full items-start">
              <div className="flex-grow"></div>
              <Caption>Choose all that apply</Caption>
            </div>
            <div className="flex-grow"></div>
          </div>

          <div className="flex justify-center p-2 bg-[#FFA701] rounded-2xl border-2 border-black overflow-hidden h-[85vh] z-[2]">
            <div className="flex-grow"></div>
            <div className="flex flex-col justify-between h-full items-start">
              <div className="flex-grow"></div>
              <Caption>Choose all that apply</Caption>
            </div>
            <div className="flex-grow"></div>
          </div>

          <div className="flex justify-center p-2 bg-[#FFFAF0] rounded-2xl border-2 border-black overflow-hidden h-[85vh] z-[1]">
            <div className="flex-grow"></div>
            <div className="flex flex-col justify-between h-full items-start">
              <div className="flex-grow"></div>
              <Caption>Choose all that apply</Caption>
            </div>
            <div className="flex-grow"></div>
          </div>
        </div>

        <div className="h-[306px] flex flex-col justify-between">
            <div className="flex justify-between">
                <div className="flex space-x-6">
                    <div>
                        <div className="font-semibold text-sm text-gray-500">Products</div>
                        <ul className="list-none">
                            <li>
                                <a href="/opal-c1" className="text-gray-700 hover:text-gray-600">
                                    <span>Opal C1</span>
                                </a>
                            </li>
                            <li>
                                <a href="/opal-composer" className="text-gray-700 hover:text-gray-600">
                                    <span>Opal Composer</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold text-sm text-gray-500">Company</div>
                        <ul className="list-none">
                            <li>
                                <a href="/about" className="text-gray-700 hover:text-gray-600">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-gray-700 hover:text-gray-600">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-gray-700 hover:text-gray-600">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-semibold text-sm text-gray-500">Resources</div>
                        <ul className="list-none">
                            <li>
                                <a href="mailto:support@opalcamera.com" target="_blank" rel="noopener" className="text-gray-700 hover:text-gray-600">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="/media-kit" className="text-gray-700 hover:text-gray-600">
                                    Media Kit
                                </a>
                            </li>
                            <li>
                                <a href="/opal-composer/download" className="text-gray-700 hover:text-gray-600">
                                    Downloads
                                </a>
                            </li>
                            <li>
                                <a href="/newsletter" className="text-gray-700 hover:text-gray-600">
                                    Newsletter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


      </div>
    </body>
  )
}