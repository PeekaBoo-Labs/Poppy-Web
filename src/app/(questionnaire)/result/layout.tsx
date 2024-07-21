import { FlowerContextProvider } from "@/lib/contexts/FlowerContext";
import type { ReactNode } from "react";

export default function ResultLayout({ children }: { children: ReactNode }) {
  return <FlowerContextProvider>{children}</FlowerContextProvider>;
}
