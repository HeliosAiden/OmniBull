"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
