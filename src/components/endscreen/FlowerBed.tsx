import React, { useRef, MouseEvent, useMemo, useState } from "react";
import Plant, { type PlantType } from "./Plant";
import { distance } from "framer-motion";
import { STI } from "@/lib/ai/question";

interface FlowerBedProps {
  sti_scores: Array<[string, number]>; // An array of tuples, each containing a string and a number
}

interface GridCell {
  emoji: string;
  sti: STI | "tree";
}

// Emoji repressentations for the STIs
const : { [key: string]: STI | "tree" } = {
  Chlamydia: STI.Chlamydia,
  Gonorrhoea: STI.Gonorrhoea,
  "Genital Warts": STI.GenitalWarts,
  Syphilis: STI.Syphilis,
};

// A function to generate the grid with flower placements
const generateGrid = (
  sti_scores: Array<[string, number]>,
  gridSize: number,
): GridCell[] => {
  const totalCells = gridSize * gridSize;
  let remainingCells = totalCells;
  const grid: GridCell[] = Array(totalCells).fill({ emoji: "🌲", sti: "tree" }); // Fill grid with tree emojis

  // Ensure at least one flower for each STI tested
  sti_scores.forEach(([sti]) => {
    const randomIndex = Math.floor(Math.random() * totalCells);
    grid[randomIndex] = { emoji: STI_EMOJIS[sti], sti };
    remainingCells--;
  });

  // Distribute the remaining flowers according to their scores
  sti_scores.forEach(([sti, score]) => {
    const flowerCount = Math.max(
      1,
      Math.floor((score / totalCells) * totalCells),
    );
    for (let i = 0; i < flowerCount; i++) {
      let placed = false;
      while (!placed) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        if (grid[randomIndex].emoji === "🌲") {
          grid[randomIndex] = { emoji: STI_EMOJIS[sti], sti };
          placed = true;
          remainingCells--;
        }
        if (remainingCells <= 0) break; // Break if no more cells available
      }
    }
  });

  return grid;
};

// Use React.FC for a functional component with TypeScript
const FlowerBed: React.FC<FlowerBedProps> = ({ sti_scores }) => {
  const gridSize = 16;
  const grid = useMemo(() => generateGrid(sti_scores, gridSize), [sti_scores]);

  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const updateModalContent = (cell: GridCell) => {
    if (modalRef.current) {
      modalRef.current.innerHTML = `
        <div class="flex flex-col items-start justify-center gap-1 p-2 text-center will-change-transform">
          <p class="text-xs font-light">${cell.sti}</p>
          <a class="flex flex-row items-center justify-center gap-1" href="https://www.youtube.com/results?search_query=${cell.sti}" target="_blank" rel="noopener noreferrer">
            <img
              width="25"
              height="25"
              src="/i3cons/click.svg"
              alt="arrow link"
              class="h-4 w-4"
            />
            <p class="text-xs text-gray-400">Click to learn more</p>
          </a>
        </div>
      `;
    }
  };

  return (
    <div className="relative p-4">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "3px",
          width: "min(100vmin, 100%)",
          height: "min(100vmin, 100%)",
          justifyContent: "start",
          alignContent: "start",
          aspectRatio: "1 / 1",
          position: "relative",
        }}
      >
        {grid.map((cell, index) => {
          const coord = {
            x: Math.floor(index / gridSize),
            y: index % gridSize,
          };

          const distanceFromCenter = Math.max(
            Math.abs(coord.x - gridSize / 2),
            Math.abs(coord.y - gridSize / 2),
          );
          const defaultOpacity =
            0.3 * Math.min(1, Math.exp(-distanceFromCenter + gridSize * 0.37));

          return (
            <Plant
              key={index}
              center={center}
              coord={coord}
              default_opacity={defaultOpacity}
              type={cell.sti}
              onMouseEnter={() => {
                setCenter(coord);
              }}
            />
          );
        })}
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            transition: "transform 0.01s ease-out",
            top: "0",
            left: "0",
            width: "190px",
            maxWidth: "190px",
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            display: "none",
            border: "1px solid #d3d3d3", // Light grey border
          }}
        />
      </div>
    </div>
  );
};

export default FlowerBed;
