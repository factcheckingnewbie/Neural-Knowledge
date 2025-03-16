import { create } from "zustand";

interface SettingsState {
  theme: "light" | "dark" | "system";
  database: "neo4j" | "sqlite" | "inmemory";
  aiModel: "openai" | "local" | "none";
  graphStyle: "force-directed" | "hierarchical" | "radial";
  apiKey: string | null;

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  setDatabase: (database: "neo4j" | "sqlite" | "inmemory") => void;
  setAIModel: (aiModel: "openai" | "local" | "none") => void;
  setGraphStyle: (graphStyle: "force-directed" | "hierarchical" | "radial") => void;
  setApiKey: (apiKey: string | null) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: "system",
  database: "neo4j",
  aiModel: "openai",
  graphStyle: "force-directed",
  apiKey: null,

  setTheme: (theme) => set({ theme }),
  setDatabase: (database) => set({ database }),
  setAIModel: (aiModel) => set({ aiModel }),
  setGraphStyle: (graphStyle) => set({ graphStyle }),
  setApiKey: (apiKey) => set({ apiKey }),
}));
