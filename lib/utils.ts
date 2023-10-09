import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diffInSeconds < minute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < hour) {
    return `${Math.floor(diffInSeconds / minute)} minutes ago`;
  } else if (diffInSeconds < day) {
    return `${Math.floor(diffInSeconds / hour)} hours ago`;
  } else if (diffInSeconds < month) {
    return `${Math.floor(diffInSeconds / day)} days ago`;
  } else if (diffInSeconds < year) {
    return `${Math.floor(diffInSeconds / month)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / year)} years ago`;
  }
};

export const formatBigNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toString();
};
