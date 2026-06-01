import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard cn helper: merge Tailwind class strings with conflict resolution.
// Used by new components going forward; existing components are not retrofitted.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
