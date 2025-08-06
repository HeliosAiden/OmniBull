"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutDashboard, Wallet, BarChart } from "lucide-react";
import IconButton from "@/components/IconButton";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/cex", label: "CEX", icon: Wallet },
    { href: "/dex", label: "DEX", icon: BarChart },
  ];

  return (
    <aside
      className={`h-screen bg-black text-white p-2 border-r border-white/10 transition-all duration-300 flex flex-col ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <IconButton
        onClick={() => setIsExpanded((prev) => !prev)}
        className="text-white mb-6 self-end hover:cursor-pointer"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </IconButton>

      {/* Nav Items */}
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <div
              className="flex items-center space-x-2 hover:bg-white/10 rounded px-2 py-2 transition group"
              title={!isExpanded ? label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {isExpanded && <span className="whitespace-nowrap">{label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
