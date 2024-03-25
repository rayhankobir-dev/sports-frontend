/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarFallbackLetter(
  firstName: string,
  lastName?: string
): string {
  if (!firstName && !lastName) {
    return "?";
  }
  if (lastName) {
    return lastName[0].toUpperCase();
  }
  if (firstName.trim().includes(" ")) {
    const initials = firstName
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("");
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  } else {
    return firstName[0].toUpperCase();
  }
}

export function formatTimeAgo(createdAt: string) {
  const now: any | number = new Date();
  const createdDate: any | number = new Date(createdAt);

  const seconds = Math.floor((now - createdDate) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + "m ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "d ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "h ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + "min ago";
  }
  return Math.floor(seconds) + "sec ago";
}

export function capitalize(str: string): string {
  const res: string[] = [];
  str.split(" ").map((item: string) => {
    res.push(item.charAt(0).toUpperCase() + item.slice(1));
  });

  return res.join(" ");
}

// make slug from string
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
