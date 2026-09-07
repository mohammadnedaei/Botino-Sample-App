import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToman(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(Math.round(price / 10));
}

export function formatRial(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}
