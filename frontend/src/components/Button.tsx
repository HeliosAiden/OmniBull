import React from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "default" | "outline" | "ghost";
type ButtonOrLinkProps =
  | ({ as?: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>);

type Props = ButtonOrLinkProps & {
  variant?: Variant;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none px-4 py-2 hover:cursor-pointer";

const variants = {
  default: "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-300",
  outline: "border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
  ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
};

export const Button = ({ as = "button", variant = "default", className, ...props }: Props) => {
  const classes = clsx(baseStyles, variants[variant], className);

  if (as === "a") {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
};
