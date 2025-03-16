import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, FileText, BookOpen, Briefcase, Link2, Edit, Trash } from "lucide-react";

const NodesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNodeEditor, setShowNodeEditor] = useState(false);
  
  // Mock data
  const nodes = [
    {
      id: "concept1",
      title: "Graph Theory",
      type: "concept",
      tags: ["mathematics", "computer science"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "concept2",
      title: "Neural Networks",
      type: "concept",
      tags: ["ai", "machine learning"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "project1",
      title: "PKM System",
      type: "project",
      tags: ["productivity", "knowledge"],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  // Filter nodes based on search query
  const filteredNodes = nodes.filter((node) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      node.title.toLowerCase().includes(query) ||
      node.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
  
  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-4 w-4" />;
      case "concept":
        return <BookOpen className="h-4 w-4" />;
      case "project":
        return <Briefcase className="h-4 w-4" />;
      case "reference":
        return <Link2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Knowledge Nodes</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search nodes..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog open={showNodeEditor} onOpenChange={setShowNodeEditor}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Node
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Node</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Node editor would go here.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNodes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {searchQuery ? (
                      <div>
                        <p className="text-muted-foreground">No nodes match your search.</p>
                        <Button variant="link" onClick={() => setSearchQuery("")}>
                          Clear search
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-muted-foreground mb-2">No knowledge nodes found.</p>
                        <Button size="sm" onClick={() => setShowNodeEditor(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create your first node
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredNodes.map((node) => (
                  <TableRow key={node.id}>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {getNodeTypeIcon(node.type)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{node.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {node.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(node.createdAt)}</TableCell>
                    <TableCell>{formatDate(node.updatedAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
};

export default NodesPage;