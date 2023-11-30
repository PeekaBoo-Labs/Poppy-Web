import React from 'react';
import { Drawer } from 'vaul';
import QuestionInputOption from '@/components/QuestionOption';
import ProfileOption from '@/components/ProfileOption';
import LargeTitle from '@/components/LargeTitle';
import Title from '@/components/Title';
import Caption from '@/components/Caption';
import HeaderText from '@/components/HeaderText';
import { LongButton } from '@/components/Buttons';
import NavBar from '@/components/NavBar';
import Image from 'next/image'


export default function HomePage() {
    return (
        <body>
            
            <div className='flex flex-col justify-between items-center text-[#262626] '> 
                <NavBar wide_mode={false}/>
                <div className='max-w-[750px] flex flex-col items-center text-center'>
                    <img className='mt-[-27rem] w-[400px] min-[426px]:z-[10000]' src='results_phone.svg'></img>
                    <LargeTitle className="text-center mb-12 px-10 pt-10 flex flex-col items-center gap-10">
                        <div className='flex flex-row'>
                            <span>D</span>
                            <span className="text-[2.9rem] tracking-wide rotate-[-20deg]">🍑</span>
                            <span> I have </span>
                        </div>
                        <div className='flex flex-row'>
                            <span>an ST</span>
                            <span className="text-[3rem] rotate-[220deg] translate-x-[-0.5rem] translate-y-[0.3rem]  ">🍆</span><span className='translate-x-[-1rem]'>?</span>
                        </div>
                    </LargeTitle>
                    <h3 className="max-w-[560px] text-center px-10 mb-12 font-[400] flex flex-col">
                        <span className='font-bold'>Take the guesswork out of your sexual health with Poppy,</span> 
                        <span> the AI-powered STI screening service that offers confidential and fast support.</span>
                    </h3>
                    <div className='flex flex-row gap-5 items-center'>
                        <button className='shadow-2xl border border-[#c2c2c2] border-opacity-40 rounded-2xl w-[100px] h-[60px] flex flex-col justify-center items-center'>
                            <img className="h-[16px] w-[16px]"src='playButton.svg'></img>
                        </button>
                        
                        <span className='text-[#202221]'>Watch the demo</span>
                    </div>

                    <div className="w-full border-t-2 border-gray-20 my-20"></div>

                    <h1 className='text-[40px] font-bold'>It&apos;s time to</h1>
                    <h1 className='text-[40px] font-bold mb-5'>reinvent screenings</h1>
                    <h3 className="max-w-[600px] text-center px-10 mb-10 font-[400] flex flex-col">
                        <span className='font-bold'>Embrace innovation in healthcare with AI-driven STI screenings</span> 
                        <span>Swift, accessible, and confidential screenings. Eliminate clinic visits and get accurate health updates directly on your personal device. Our mission is to make STI screenings routine and stigma-free, setting a new standard in public health.</span>
                    </h3>

                    <div className='flex flex-row gap-3 items-center'>
                        <button className='shadow-2xl border border-[#c2c2c2] border-opacity-40 rounded-2xl w-[60px] h-[60px] flex flex-col justify-center items-center'>
                            <img className="h-[35px] w-[35px]"src='glasses.svg'></img>
                        </button>
                        <div className='flex flex-col items-start'>
                            <span className='text-[#202221] font-bold'>Our Mission</span>
                            <span className='text-[#202221] text-sm'>read more</span>
                        </div>
                        
                    </div>

                    <div className="w-full border-t-2 border-gray-20 my-10"></div>
                </div>
                <div className='grid grid-cols-3 grid-rows-9 gap-4 p-4 w-[1100px]'>
                    <div className='row-span-3 row-start-1 col-span-1 flex justify-center items-center'>
                        <img className=' object-cover' src='card1.svg' alt='Card 1' style={{ width: '100%', height: '100%' }}></img>
                    </div>
                    <div className='bg-orange row-start-4 row-span-2 col-span-1 flex justify-center items-center'>
                        <img className='object-cover mr-4' src='card2.svg' alt='Card 2' style={{ width: '102%', height: '102%' }}></img>
                    </div>

                    <div className='bg-green row-start-1 row-span-5 col-start-2 flex justify-center items-center'>
                        <img className=' object-cover' src='card3.svg' alt='Card 3' style={{ width: '100%', height: '100%' }}></img>
                    </div>
                    <div className='bg-blue row-start-1 row-span-4 col-start-3 flex justify-center items-center'>
                        <img className=' object-cover' src='card4.svg' alt='Card 4' style={{ width: '100%', height: '100%' }}></img>
                    </div>
                    <div className='bg-purple row-start-8 row-span-1 col-start-3 flex justify-center items-center'>
                        <img className=' object-cover' src='card5.svg' alt='Card 5' style={{ width: '100%', height: '100%' }}></img>
                    </div>

                    <div className='bg-yellow row-span-2 row-start-9 col-span-3 flex justify-center items-center'>
                        <img className=' object-cover' src='card6.svg' alt='Card 6' style={{ width: '100%', height: '100%' }}></img>
                    </div>
                </div>



                
                <footer className='my-10'>
                    <span className='p-[2rem] font-[#ACACAC]'>🧑🏻‍💻 with ❤️ from Irvine and Santa Cruz</span>
                </footer>
            </div>

        </body>
    );
}