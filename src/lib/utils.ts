/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAverage = (data: any, param: string) => {
  const sum = data.reduce(
    (acc: any, curr: { [x: string]: any }) => acc + curr[param],
    0
  );
  return (sum / data.length).toFixed(2);
};
