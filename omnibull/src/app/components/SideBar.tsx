"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-4 flex flex-col space-y-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/cex">CEX</Link>
      <Link href="/dex">DEX</Link>
    </aside>
  );
}
