'use client'

import NavBar from '@/components/NavBar';

import { useEffect, useState } from 'react';
import FlipCard from './card';


export type CardState = "left" | "right" | "none" | "leftChosen" | "rightChosen" | "second" | "third";

let pauseMouseAnimation = false;

const data = [{ id: "1", title: "1" }, { id: "2", title: "2" }, { id: "3", title: "3" }];

export default function Home() {

  const [mousePosition, setMousePosition] = useState<CardState>("none");
  const [cardData, setCardData] = useState(data);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (pauseMouseAnimation) return;

      const positionX = 2 * (e.clientX / window.innerWidth - 0.5);

      if (positionX < -0.3) {
        setMousePosition("left");
      } else if (positionX > 0.3) {
        setMousePosition("right");
      } else {
        setMousePosition("none");
      }
    };

    const onMouseClick = (e: MouseEvent) => {
      if (pauseMouseAnimation) return;

      pauseMouseAnimation = true;


      if (mousePosition == "left") {
        setMousePosition("leftChosen");
      } else if (mousePosition == "right") {
        setMousePosition("rightChosen");
      } else {
        pauseMouseAnimation = false;
      }


      setTimeout(() => {
        pauseMouseAnimation = false;
        setCardData((prev) => {
          const newData = [...prev];
          const first = newData.shift();
          newData.push(first!);
          return newData;
        });

        setMousePosition("none");

      }, 2000);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
    };
  }, [mousePosition]);

  console.log(mousePosition, cardData);

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#F1EFED] px-8">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <span>{mousePosition}</span>
        <span>{ }</span>
        <div className='relative flex items-center justify-center' style={{
          perspective: "1000px",
        }}>
          {
            cardData.toReversed().map((card, i) => {
              return <FlipCard key={card.id} state={i == 2 ? mousePosition : i == 1 ? "second" : "third"}>
                {card.title}
              </FlipCard>
            })
          }
        </div>

      </div>
    </div>
  );
}
