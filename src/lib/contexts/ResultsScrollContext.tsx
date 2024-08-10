import { ReactNode, createContext, useContext, useState } from "react";

export enum Section {
  Overview,
  Breakdown,
  NextSteps,
}

type ResultsScrollContent = {
  visibleSections: Section[];
  show: (section: Section) => void;
  hide: (section: Section) => void;
};

const ResultsScrollContext = createContext<ResultsScrollContent | null>(null);

export function ResultsScrollProvider({ children }: { children: ReactNode }) {
  const [visibleSections, setVisibleSections] = useState<Section[]>([]);

  function hide(section: Section) {
    setVisibleSections((prev) => prev.filter((s) => s !== section));
  }

  function show(section: Section) {
    setVisibleSections((prev) => [...prev, section]);
  }

  return (
    <ResultsScrollContext.Provider value={{ visibleSections, show, hide }}>
      {children}
    </ResultsScrollContext.Provider>
  );
}

export function useResultsScrollContext() {
  const context = useContext(ResultsScrollContext);
  if (!context) {
    throw new Error(
      "useResultsScrollContext must be used within a ResultsScrollProvider",
    );
  }
  return context;
}
