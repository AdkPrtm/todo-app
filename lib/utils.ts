import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formattedDate(date: any) {
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  }

  const res = new Date(date).toLocaleString('en-US', dateOptions);
  return res
}

export const generateOTP = (): string => {
  const length: number = 6;
  const characters = '0123456789';

  let otp: string = '';

  for (let o = 0; o < length; o++) {
    const getRandomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[getRandomIndex];
  }

  return otp;
};
