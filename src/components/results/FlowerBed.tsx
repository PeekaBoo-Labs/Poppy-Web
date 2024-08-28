import { STI } from "@/lib/ai/question";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";
import Plant from "./Plant";
import {
  OverviewFocusState,
  useFlowerContext,
} from "@/lib/contexts/FlowerContext";

type FlowerBedProps = {
  grid: (STI | "tree")[];
};

export default function FlowerBed({ grid }: FlowerBedProps) {
  const gridSize = Math.round(Math.sqrt(grid.length));

  const { focusState, focusedObject, setFocusState, setFocusedObject } =
    useFlowerContext();

  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: gridSize / 2,
    y: gridSize / 2,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const focusOnMap = focusState == OverviewFocusState.Map;

  return (
    <div
      onMouseEnter={() => setFocusState(OverviewFocusState.Map)}
      onMouseLeave={() => {
        setFocusedObject(null);
        setFocusState(OverviewFocusState.None);
      }}
      className={cn("", "relative rounded-lg duration-[2000ms] ease-velocity")}
      style={
        {
          // transform: `perspective(500px) rotateX(${focusOnMap ? 0 : 10}deg) translateZ(${focusOnMap ? 50 : 0}px)`,
        }
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "3px",
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
            0.7 * Math.min(1, Math.exp(-distanceFromCenter + gridSize * 0.3));

          return (
            <Plant
              key={index}
              center={center}
              coord={coord}
              default_opacity={defaultOpacity}
              type={sti}
              focusedOnGarden={focusState == OverviewFocusState.Map}
              focusOne={focusedObject}
              onMouseEnter={() => {
                setCenter(coord);
                setFocusedObject(sti == "tree" ? null : sti);
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
            zIndex: 1000,
            display: "none",
          }}
        />
      </div>
    </div>
  );
}
