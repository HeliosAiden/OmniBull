"use client";

import { ReactNode } from "react";
import { cn } from "@/utils/cn"; // Optional className utility

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
}

export default function IconButton({ children, onClick, title, className }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "rounded-full p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none hover:cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
