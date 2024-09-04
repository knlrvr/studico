import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(milliseconds: number) {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - milliseconds) / 1000);
  const diffInDays = diffInSeconds / 86400;

  if (diffInDays > 1) {
    const date = new Date(milliseconds);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ];

  for (const unit of units) {
    const count = Math.floor(diffInSeconds / unit.seconds);
    if (count >= 1) {
      return `${count} ${unit.name}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}


// date
export function timeStamp(unixtime: number): string {
  const date = new Date(unixtime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`; 
}

// date + time - seconds
export function messageTime(unixtime: number): string {
  const date = new Date(unixtime);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year}, ${hours}:${minutes}`; // Format: YYYY-MM-DD HH:MM
}

export function formatFileName(fileName: string): string {
  if (fileName.length <= 8) {
      return fileName;
  }
  const start = fileName.slice(0, 3);
  const end = fileName.slice(-4);

  return `${start}...${end}`;
}

// future date
export function futureDate(dateString: string | undefined): string {
  if (!dateString) {
    return 'No date set';
  }
  
  try {
    const date = parseISO(dateString);
    return format(date, 'd-MM-yyyy');
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid date';
  }
}