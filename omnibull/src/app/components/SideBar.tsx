"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CEX", href: "/cex" },
  { label: "DEX", href: "/dex" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-black text-white min-h-screen p-4 flex flex-col gap-4">
      {/* Logo */}
      <Link href="/">
        <div className="text-xl font-bold tracking-tight hover:text-text-primary transition">
          OmniBull
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col space-y-2">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "px-3 py-2 rounded-lg text-md font-medium transition hover:bg-white hover:text-black",
              pathname === href ? "bg-white text-black" : "text-white"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
