import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DatabaseConfig {
  type: "neo4j" | "sqlite" | "inmemory";
  connectionString?: string;
  username?: string;
  password?: string;
}

export interface AIModelConfig {
  type: "openai" | "local" | "none";
  apiKey?: string;
  modelName?: string;
  endpoint?: string;
}

export interface VisualizationConfig {
  treeStyle: "default" | "compact" | "expanded";
  graphStyle: "force" | "hierarchical" | "radial";
  theme: "light" | "dark" | "system";
}

interface SettingsState {
  database: DatabaseConfig;
  aiModel: AIModelConfig;
  visualization: VisualizationConfig;
  
  // Actions
  updateDatabaseConfig: (config: Partial<DatabaseConfig>) => void;
  updateAIModelConfig: (config: Partial<AIModelConfig>) => void;
  updateVisualizationConfig: (config: Partial<VisualizationConfig>) => void;
  resetToDefaults: () => void;
}

const defaultSettings: {
  database: DatabaseConfig;
  aiModel: AIModelConfig;
  visualization: VisualizationConfig;
} = {
  database: {
    type: "inmemory",
  },
  aiModel: {
    type: "none",
  },
  visualization: {
    treeStyle: "default",
    graphStyle: "force",
    theme: "system",
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      
      updateDatabaseConfig: (config) => set((state) => ({
        database: { ...state.database, ...config },
      })),
      
      updateAIModelConfig: (config) => set((state) => ({
        aiModel: { ...state.aiModel, ...config },
      })),
      
      updateVisualizationConfig: (config) => set((state) => ({
        visualization: { ...state.visualization, ...config },
      })),
      
      resetToDefaults: () => set(defaultSettings),
    }),
    {
      name: "neural-knowledge-settings",
    }
  )
);