"use client";

import Header from "../Header";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 bg-white dark:bg-[#0a0a0a] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
