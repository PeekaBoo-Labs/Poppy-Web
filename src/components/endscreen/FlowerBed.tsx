import React, { useRef, MouseEvent } from "react";
import Image from "next/image";

interface FlowerBedProps {
  sti_scores: Array<[string, number]>; // An array of tuples, each containing a string and a number
}

interface GridCell {
  emoji: string;
  sti: string;
}

// Emoji representations for the STIs
const STI_EMOJIS: { [key: string]: string } = {
  Chlamydia: "🌸",
  Gonorrhoea: "🌼",
  "Genital Warts": "🌺",
  Syphilis: "🌻",
};

// A function to generate the grid with flower placements
const generateGrid = (
  sti_scores: Array<[string, number]>,
  gridSize: number
): GridCell[] => {
  const totalCells = gridSize * gridSize;
  let remainingCells = totalCells;
  const grid: GridCell[] = Array(totalCells).fill({ emoji: "🌲", sti: "" }); // Fill grid with tree emojis

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
      Math.floor((score / totalCells) * totalCells)
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
  const grid = generateGrid(sti_scores, gridSize);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const hoveredCellRef = useRef<GridCell | null>(null);

  const handleMouseEnter = (cell: GridCell, event: MouseEvent<HTMLDivElement>) => {
    if (cell.emoji !== "🌲" && cell.sti !== "") {
      hoveredCellRef.current = cell;
      updateModalContent(cell);
      updateModalPosition(event);
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (hoveredCellRef.current) {
      updateModalPosition(event);
    }
  };

  const handleMouseLeave = () => {
    hoveredCellRef.current = null;
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  };

  const handleEmojiClick = (cell: GridCell) => {
    if (cell.sti !== "") {
      window.open(`https://www.youtube.com/results?search_query=${cell.sti}`, "_blank");
    }
  };

  const updateModalPosition = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current) {
      modalRef.current.style.display = "block";
      modalRef.current.style.transform = `translate(${event.clientX + 20}px, ${event.clientY + 20}px)`
    }
  };

  const updateModalContent = (cell: GridCell) => {
    if (modalRef.current) {
      modalRef.current.innerHTML = `
        <div class="flex flex-col items-start justify-center gap-1 p-2 text-center will-change-transform">
          <p class="text-xs font-light">${cell.sti}</p>
          <a class="flex flex-row items-center justify-center gap-1" href="https://www.youtube.com/results?search_query=${cell.sti}" target="_blank" rel="noopener noreferrer">
            <img
              width="25"
              height="25"
              src="/icons/click.svg"
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
      {/* <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          boxShadow: "inset 0px 0px 100px 100px #f7f7f7",
          filter: "blur(100px)", // Full blur covering the entire square
        }}
      /> */}
      {/* <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          top: "-3.125%",
          left: "-3.125%",
          right: "-3.125%",
          bottom: "-3.125%",
          boxShadow: "inset 0px 0px 100px 100px #f7f7f7",
          filter: "blur(5px)", // Corner blur effect
        }}
      /> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "0",
          width: "min(100vmin, 100%)",
          height: "min(100vmin, 100%)",
          justifyContent: "start",
          alignContent: "start",
          aspectRatio: "1 / 1",
          position: "relative",
        }}
      >
        {grid.map((cell, index) => (
          <div
            className="flower-cell group relative cursor-pointer text-center grayscale filter transition duration-0 hover:grayscale-0"
            key={index}
            style={{
              fontSize: "30px",
              position: "relative",
              marginTop: "-6px",
              marginBottom: "-6px",
              marginLeft: "1px",
              marginRight: "1px",
            }}
            onMouseEnter={(event) => handleMouseEnter(cell, event)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleEmojiClick(cell)}
          >
            {cell.emoji}
          </div>
        ))}
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
            border: "1px solid #d3d3d3" // Light grey border
          }}
        />
      </div>
    </div>
  );
};

export default FlowerBed;
