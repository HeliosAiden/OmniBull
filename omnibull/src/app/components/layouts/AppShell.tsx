"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-white dark:bg-[#0a0a0a] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
