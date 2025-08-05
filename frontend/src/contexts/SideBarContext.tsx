"use client";

import { createContext, useContext, useState } from "react";

type SideBarLayout = "left" | "right";

interface SideBarContextProps {
  layout: SideBarLayout;
  setLayout: (layout: SideBarLayout) => void;
}

const SideBarContext = createContext<SideBarContextProps>({
  layout: "left",
  setLayout: () => {},
});

export const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [layout, setLayout] = useState<SideBarLayout>("left");

  return (
    <SideBarContext.Provider value={{ layout, setLayout }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => useContext(SideBarContext);
