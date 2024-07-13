import React, { useRef, MouseEvent, useMemo, useState } from "react";
import Plant from "./Plant";
import { STI } from "@/lib/ai/question";
import { cn } from "@/lib/utils";
import { m } from "framer-motion";

type FlowerBedProps = {
  sti_scores: [STI, number][];
};

// A function to generate the grid with flower placements
const generateGrid = (
  sti_scores: [STI, number][],
  gridSize: number,
): (STI | "tree")[] => {
  const totalCells = gridSize * gridSize;
  const grid: (STI | "tree")[] = Array(totalCells).fill("tree");

  let remainingCells = totalCells;

  // Ensure at least one flower for each STI tested
  sti_scores.forEach(([sti]) => {
    const randomIndex = Math.floor(Math.random() * totalCells);
    grid[randomIndex] = sti;
    remainingCells--;
  });

  // Distribute the remaining flowers according to their scores
  sti_scores.forEach(([sti, score]) => {
    const flowerCount = Math.max(1, score);
    for (let i = 0; i < flowerCount; i++) {
      let placed = false;
      while (!placed) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        if (grid[randomIndex] == "tree") {
          grid[randomIndex] = sti;
          placed = true;
          remainingCells--;
        }
        if (remainingCells <= 0) break; // Break if no more cells available
      }
    }
  });

  return grid;
};

export default function FlowerBed({ sti_scores }: FlowerBedProps) {
  const gridSize = 9;
  const grid = useMemo(() => generateGrid(sti_scores, gridSize), [sti_scores]);

  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: gridSize / 2,
    y: gridSize / 2,
  });

  const [focused, setFocused] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      className={cn(
        "border p-2 shadow-md bg-stone-100 border-b-[3px]",
        "relative rounded-lg",
      )}
      style={{
        transform: `perspective(500px) rotateX(10deg) translateZ(50px)`,
        transition: "all 2s cubic-bezier(.04,1,.11,.97)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "3px",
          width: "min(100vmin, 100%)",
          height: "min(100vmin, 100%)",
          justifyContent: "center",
          alignContent: "center",
          aspectRatio: "1 / 1",
          position: "relative",
        }}
      >
        {grid.map((sti, index) => {
          const coord = {
            x: Math.floor(index / gridSize),
            y: index % gridSize,
          };

          const distanceFromCenter = Math.max(
            Math.abs(coord.x - gridSize / 2),
            Math.abs(coord.y - gridSize / 2),
          );
          const defaultOpacity =
            0.7 * Math.min(1, Math.exp(-distanceFromCenter + gridSize * 0.2));

          return (
            <Plant
              key={index}
              center={center}
              coord={coord}
              default_opacity={defaultOpacity}
              type={sti}
              focusedOnGarden={focused}
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
}
