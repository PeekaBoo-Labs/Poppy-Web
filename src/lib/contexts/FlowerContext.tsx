"use client";

import type { Dispatch, SetStateAction, ReactNode } from "react";
import { useContext, useState, createContext } from "react";
import { STI } from "../ai/question";

export enum OverviewFocusState {
  None = "None",
  Map = "Map",
  Card = "Card",
}

type FlowerContextType = {
  focusState: OverviewFocusState;
  focusedObject: STI | null;

  setFocusState: Dispatch<SetStateAction<OverviewFocusState>>;
  setFocusedObject: Dispatch<SetStateAction<STI | null>>;
};

const FlowerContext = createContext<FlowerContextType | null>(null);

export function FlowerContextProvider({ children }: { children: ReactNode }) {
  const [focusState, setFocusState] = useState<OverviewFocusState>(
    OverviewFocusState.None,
  );
  const [focusedObject, setFocusedObject] = useState<STI | null>(null);

  return (
    <FlowerContext.Provider
      value={{
        focusState,
        focusedObject,
        setFocusState,
        setFocusedObject,
      }}
    >
      {children}
    </FlowerContext.Provider>
  );
}

export function useFlowerContext() {
  const context = useContext(FlowerContext);
  if (context == null) {
    throw new Error("Missing FlowerContext provider.");
  }

  return context;
}
