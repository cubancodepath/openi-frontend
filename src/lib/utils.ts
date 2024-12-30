import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAverage = (data: any, param: string) => {
  const sum = data.reduce((acc, curr) => acc + curr[param], 0);
  return (sum / data.length).toFixed(2);
};
