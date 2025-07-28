"use client";

import { useSideBar } from "@/contexts/SideBarContext";
import { useTheme } from "next-themes";
import Sidebar from "@/app/components/SideBar";
import { Button } from "@/app/components/Button";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const { layout, setLayout } = useSideBar();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        layout === "right" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-[#0a0a0a]">
        <div className="flex justify-end gap-4 mb-4">
          {/* Layout Toggle */}
          <div className="flex gap-1">
            <Button
              variant={layout === "left" ? "default" : "outline"}
              onClick={() => setLayout("left")}
            >
              ⬅ Left
            </Button>
            <Button
              variant={layout === "right" ? "default" : "outline"}
              onClick={() => setLayout("right")}
            >
              Right ➡
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>

        {children}
      </main>
    </div>
  );
}
