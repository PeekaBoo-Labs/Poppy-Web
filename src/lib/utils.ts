import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function cleanupQuestion(input: string): string {
  let output = input.trim();

  if (!input.endsWith("?")) {
    output += "?";
  }

  return output.charAt(0).toUpperCase() + output.slice(1);
}

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

export const ANIMATION = "transition-all ease-velocity duration-1000" as const;
