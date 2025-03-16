import { create } from "zustand";

export interface KnowledgeNode {
  id: string;
  title: string;
  content: string;
  type: "note" | "concept" | "project" | "reference";
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
  weight: number;
  createdAt: Date;
}

interface KnowledgeState {
  nodes: KnowledgeNode[];
  relationships: Relationship[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSelectedNodeId: (id: string | null) => void;
  addNode: (node: Omit<KnowledgeNode, "id" | "createdAt" | "updatedAt">) => void;
  updateNode: (id: string, updates: Partial<Omit<KnowledgeNode, "id" | "createdAt" | "updatedAt">>) => void;
  deleteNode: (id: string) => void;
  addRelationship: (relationship: Omit<Relationship, "id" | "createdAt">) => void;
  deleteRelationship: (id: string) => void;
}

// Initialize with some sample data
const initialNodes: KnowledgeNode[] = [
  {
    id: "concept1",
    title: "Graph Theory",
    content: "Graph theory is the study of graphs, which are mathematical structures used to model pairwise relations between objects.",
    type: "concept",
    parentId: "concepts",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["mathematics", "computer science"]
  },
  {
    id: "concept2",
    title: "Neural Networks",
    content: "Neural networks are computing systems inspired by the biological neural networks that constitute animal brains.",
    type: "concept",
    parentId: "concepts",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["ai", "machine learning"]
  },
  {
    id: "project1",
    title: "PKM System",
    content: "A Personal Knowledge Management system for organizing and retrieving information.",
    type: "project",
    parentId: "projects",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["productivity", "knowledge"]
  }
];

const initialRelationships: Relationship[] = [
  {
    id: "rel1",
    sourceId: "concept1",
    targetId: "project1",
    type: "used-in",
    weight: 1,
    createdAt: new Date()
  },
  {
    id: "rel2",
    sourceId: "concept2",
    targetId: "project1",
    type: "used-in",
    weight: 2,
    createdAt: new Date()
  }
];

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  nodes: initialNodes,
  relationships: initialRelationships,
  selectedNodeId: null,
  isLoading: false,
  error: null,
  
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  
  addNode: (node) => set((state) => {
    const newNode: KnowledgeNode = {
      ...node,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return {
      nodes: [...state.nodes, newNode],
    };
  }),
  
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map((node) => 
      node.id === id 
        ? { ...node, ...updates, updatedAt: new Date() } 
        : node
    ),
  })),
  
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    relationships: state.relationships.filter(
      (rel) => rel.sourceId !== id && rel.targetId !== id
    ),
  })),
  
  addRelationship: (relationship) => set((state) => {
    const newRelationship: Relationship = {
      ...relationship,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    return {
      relationships: [...state.relationships, newRelationship],
    };
  }),
  
  deleteRelationship: (id) => set((state) => ({
    relationships: state.relationships.filter((rel) => rel.id !== id),
  })),
}));