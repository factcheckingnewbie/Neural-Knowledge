import { ReactNode, useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronRight, File, Folder, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
  id: string;
  name: string;
  type: "folder" | "file";
  level: number;
  children?: TreeNodeProps[];
  isExpanded?: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const TreeNode = ({ 
  id, 
  name, 
  type, 
  level, 
  children, 
  isExpanded = false, 
  onToggle, 
  onSelect,
  selectedId
}: TreeNodeProps) => {
  const hasChildren = children && children.length > 0;
  
  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-accent group",
          selectedId === id && "bg-accent"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => onSelect(id)}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 p-0 mr-1"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(id);
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : type === "folder" ? (
            <ChevronRight className="h-4 w-4 opacity-0" />
          ) : null}
        </Button>
        
        {type === "folder" ? (
          <Folder className="h-4 w-4 mr-2 text-blue-500" />
        ) : (
          <File className="h-4 w-4 mr-2 text-gray-500" />
        )}
        
        <span className="text-sm truncate">{name}</span>
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {children.map((child) => (
            <TreeNode
              key={child.id}
              {...child}
              level={level + 1}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SimpleSidebar = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["root"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Mock data
  const treeData: TreeNodeProps[] = [
    {
      id: "root",
      name: "Knowledge Base",
      type: "folder",
      level: 0,
      children: [
        {
          id: "concepts",
          name: "Concepts",
          type: "folder",
          level: 1,
          children: [
            { id: "concept1", name: "Graph Theory", type: "file", level: 2, onToggle: () => {}, onSelect: () => {}, selectedId: null },
            { id: "concept2", name: "Neural Networks", type: "file", level: 2, onToggle: () => {}, onSelect: () => {}, selectedId: null },
          ],
          onToggle: () => {},
          onSelect: () => {},
          selectedId: null
        },
        {
          id: "projects",
          name: "Projects",
          type: "folder",
          level: 1,
          children: [
            { id: "project1", name: "PKM System", type: "file", level: 2, onToggle: () => {}, onSelect: () => {}, selectedId: null },
          ],
          onToggle: () => {},
          onSelect: () => {},
          selectedId: null
        },
        { id: "note1", name: "Quick Note", type: "file", level: 1, onToggle: () => {}, onSelect: () => {}, selectedId: null },
      ],
      onToggle: () => {},
      onSelect: () => {},
      selectedId: null
    }
  ];
  
  const handleToggle = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  const handleSelect = (id: string) => {
    setSelectedNodeId(id);
  };
  
  return (
    <div className="w-64 border-r h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {treeData.map((node) => (
          <TreeNode
            key={node.id}
            {...node}
            isExpanded={expandedNodes.has(node.id)}
            onToggle={handleToggle}
            onSelect={handleSelect}
            selectedId={selectedNodeId}
          />
        ))}
      </div>
      
      <div className="p-4 border-t">
        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Node
        </Button>
      </div>
    </div>
  );
};

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const showSidebar = !["/", "/manual", "/settings", "/video-generator"].includes(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        {showSidebar && isSidebarOpen && (
          <SimpleSidebar />
        )}
        
        <main className="flex-1">
          {showSidebar && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="m-2"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;