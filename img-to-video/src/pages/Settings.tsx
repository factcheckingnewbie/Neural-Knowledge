import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const [selectedDatabase, setSelectedDatabase] = useState("neo4j");
  const [selectedAIModel, setSelectedAIModel] = useState("openai");
  const [selectedGraphStyle, setSelectedGraphStyle] = useState("force-directed");
  const [apiKey, setApiKey] = useState("");

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="flex-1 p-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Configure Application Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="database">
                <TabsList className="mb-4">
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="ai">AI Model</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                </TabsList>

                <TabsContent value="database">
                  <div className="space-y-4">
                    <Label htmlFor="database-select">Database Backend</Label>
                    <Select
                      value={selectedDatabase}
                      onValueChange={setSelectedDatabase}
                    >
                      <SelectTrigger id="database-select" className="w-full">
                        <SelectValue placeholder="Select database" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neo4j">Neo4j</SelectItem>
                        <SelectItem value="sqlite">SQLite</SelectItem>
                        <SelectItem value="inmemory">In-Memory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="ai">
                  <div className="space-y-4">
                    <Label htmlFor="ai-select">AI Model</Label>
                    <Select
                      value={selectedAIModel}
                      onValueChange={setSelectedAIModel}
                    >
                      <SelectTrigger id="ai-select" className="w-full">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="local">Local Model</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>

                    {selectedAIModel === "openai" && (
                      <div>
                        <Label htmlFor="api-key">API Key</Label>
                        <Input
                          id="api-key"
                          type="text"
                          placeholder="Enter API key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="visualization">
                  <div className="space-y-4">
                    <Label htmlFor="graph-style-select">Graph Style</Label>
                    <Select
                      value={selectedGraphStyle}
                      onValueChange={setSelectedGraphStyle}
                    >
                      <SelectTrigger id="graph-style-select" className="w-full">
                        <SelectValue placeholder="Select graph style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="force-directed">Force-Directed</SelectItem>
                        <SelectItem value="hierarchical">Hierarchical</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <Button className="mt-4 w-full" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
