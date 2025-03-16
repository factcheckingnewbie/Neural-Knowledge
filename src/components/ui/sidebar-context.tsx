import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

// Create a default value for the context to avoid null issues
const defaultSidebarContext: SidebarContextType = {
  isOpen: true,
  setIsOpen: () => {},
  toggleSidebar: () => {},
};

const SidebarContext = createContext<SidebarContextType>(defaultSidebarContext);

export function useSidebar() {
  return useContext(SidebarContext);
}

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}