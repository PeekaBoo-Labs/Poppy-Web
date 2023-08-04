import Image from 'next/image'

export default function NavBar(){
    return (
        <div className="flex justify-between items-center mb-4">
          <Image width={4} height={4} className="w-16" src="/poppyFull.svg" alt="Poppy"></Image>

          <div className="flex flex-col justify-between h-3.5 w-5">
            <div className="h-[2.5px] bg-black w-full"></div>
            <div className="h-[2.5px] bg-black w-full"></div>
            <div className="h-[2.5px] bg-black w-full"></div>
          </div>
        </div>
    )
}