"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

import IconButton from "@/app/components/IconButton";

type SnackbarProps = {
  open: boolean;
  onClose?: () => void;
  message: string;
  icon?: React.ReactNode;
  duration?: number;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-center";
  action?: React.ReactNode;
};

export default function Snackbar({
  open,
  onClose,
  message,
  icon,
  duration = 3000,
  position = "top-right",
  action,
}: SnackbarProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  const positionClass = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-center": "top-6 left-1/2 -translate-x-1/2",
  }[position];

  return (
    <div
      className={clsx(
        "fixed z-50 transition-all duration-300 transform",
        positionClass,
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-xl bg-gray-900 text-white text-sm min-w-[280px]">
        <div className="flex items-center gap-2">
          {icon}
          <span>{message}</span>
        </div>
        <div className="flex items-center gap-2">
          {action}
          <IconButton className="hover:text-red" onClick={() => { setVisible(false); onClose?.(); }}>
            <X className="w-4 h-4 text-white/60 hover:text-white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
