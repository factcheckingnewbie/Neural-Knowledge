import { useState, useEffect } from "react";
import { useKnowledgeStore, KnowledgeNode } from "@/lib/stores/knowledge-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Trash } from "lucide-react";

interface NodeEditorProps {
  nodeId: string | null;
}

const NodeEditor = ({ nodeId }: NodeEditorProps) => {
  const { nodes, updateNode } = useKnowledgeStore();
  const [formData, setFormData] = useState<Partial<KnowledgeNode>>({
    title: "",
    content: "",
    type: "note",
    tags: [],
  });
  
  useEffect(() => {
    if (nodeId) {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        setFormData({
          title: node.title,
          content: node.content,
          type: node.type,
          tags: node.tags,
        });
      }
    }
  }, [nodeId, nodes]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as KnowledgeNode["type"] }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nodeId) {
      updateNode(nodeId, formData);
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="h-full flex flex-col">
        <CardContent className="flex-1 overflow-auto pt-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Node title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="concept">Concept</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="reference">Reference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Node content"
                className="min-h-[200px] resize-none"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags?.join(", ")}
                onChange={(e) => {
                  const tagsString = e.target.value;
                  const tagsArray = tagsString
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== "");
                  setFormData((prev) => ({ ...prev, tags: tagsArray }));
                }}
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-6">
          <div className="flex justify-between w-full">
            <Button variant="destructive" type="button">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
            
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NodeEditor;