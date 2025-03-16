import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { Save, RotateCcw } from "lucide-react";
import Header from "@/components/layout/Header";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { database, aiModel, visualization, updateDatabaseConfig, updateAIModelConfig, updateVisualizationConfig, resetToDefaults } = useSettingsStore();
  const { toast } = useToast();
  
  const [dbConfig, setDbConfig] = useState({ ...database });
  const [aiConfig, setAiConfig] = useState({ ...aiModel });
  const [vizConfig, setVizConfig] = useState({ ...visualization });
  
  const handleSaveDatabase = () => {
    updateDatabaseConfig(dbConfig);
    toast({
      title: "Database settings saved",
      description: "Your database configuration has been updated.",
    });
  };
  
  const handleSaveAI = () => {
    updateAIModelConfig(aiConfig);
    toast({
      title: "AI model settings saved",
      description: "Your AI model configuration has been updated.",
    });
  };
  
  const handleSaveVisualization = () => {
    updateVisualizationConfig(vizConfig);
    toast({
      title: "Visualization settings saved",
      description: "Your visualization preferences have been updated.",
    });
  };
  
  const handleReset = () => {
    resetToDefaults();
    setDbConfig({ ...database });
    setAiConfig({ ...aiModel });
    setVizConfig({ ...visualization });
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
        
        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="ai">AI Model</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>
                  Configure the database backend for storing your knowledge graph.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="db-type">Database Type</Label>
                  <Select
                    value={dbConfig.type}
                    onValueChange={(value) => setDbConfig({ ...dbConfig, type: value as any })}
                  >
                    <SelectTrigger id="db-type">
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neo4j">Neo4j</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                      <SelectItem value="inmemory">In-Memory (No Persistence)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {dbConfig.type !== "inmemory" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="connection-string">Connection String</Label>
                      <Input
                        id="connection-string"
                        value={dbConfig.connectionString || ""}
                        onChange={(e) => setDbConfig({ ...dbConfig, connectionString: e.target.value })}
                        placeholder={dbConfig.type === "neo4j" ? "bolt://localhost:7687" : "path/to/database.db"}
                      />
                    </div>
                    
                    {dbConfig.type === "neo4j" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="db-username">Username</Label>
                          <Input
                            id="db-username"
                            value={dbConfig.username || ""}
                            onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                            placeholder="neo4j"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="db-password">Password</Label>
                          <Input
                            id="db-password"
                            type="password"
                            value={dbConfig.password || ""}
                            onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
                            placeholder="••••••••"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveDatabase}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Database Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Configuration</CardTitle>
                <CardDescription>
                  Configure the AI model for knowledge processing and generation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ai-type">AI Model Type</Label>
                  <Select
                    value={aiConfig.type}
                    onValueChange={(value) => setAiConfig({ ...aiConfig, type: value as any })}
                  >
                    <SelectTrigger id="ai-type">
                      <SelectValue placeholder="Select AI model type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI API</SelectItem>
                      <SelectItem value="local">Local Model</SelectItem>
                      <SelectItem value="none">None (Disabled)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {aiConfig.type === "openai" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        value={aiConfig.apiKey || ""}
                        onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                        placeholder="sk-..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="model-name">Model Name</Label>
                      <Input
                        id="model-name"
                        value={aiConfig.modelName || ""}
                        onChange={(e) => setAiConfig({ ...aiConfig, modelName: e.target.value })}
                        placeholder="gpt-4"
                      />
                    </div>
                  </>
                )}
                
                {aiConfig.type === "local" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="model-path">Model Path or Endpoint</Label>
                      <Input
                        id="model-path"
                        value={aiConfig.endpoint || ""}
                        onChange={(e) => setAiConfig({ ...aiConfig, endpoint: e.target.value })}
                        placeholder="http://localhost:8080/v1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="local-model-name">Model Name</Label>
                      <Input
                        id="local-model-name"
                        value={aiConfig.modelName || ""}
                        onChange={(e) => setAiConfig({ ...aiConfig, modelName: e.target.value })}
                        placeholder="llama3"
                      />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAI}>
                  <Save className="h-4 w-4 mr-2" />
                  Save AI Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="visualization">
            <Card>
              <CardHeader>
                <CardTitle>Visualization Settings</CardTitle>
                <CardDescription>
                  Configure how your knowledge graph is displayed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tree-style">Tree View Style</Label>
                  <Select
                    value={vizConfig.treeStyle}
                    onValueChange={(value) => setVizConfig({ ...vizConfig, treeStyle: value as any })}
                  >
                    <SelectTrigger id="tree-style">
                      <SelectValue placeholder="Select tree view style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="expanded">Expanded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="graph-style">Graph View Style</Label>
                  <Select
                    value={vizConfig.graphStyle}
                    onValueChange={(value) => setVizConfig({ ...vizConfig, graphStyle: value as any })}
                  >
                    <SelectTrigger id="graph-style">
                      <SelectValue placeholder="Select graph view style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="force">Force-Directed</SelectItem>
                      <SelectItem value="hierarchical">Hierarchical</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={vizConfig.theme}
                    onValueChange={(value) => setVizConfig({ ...vizConfig, theme: value as any })}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveVisualization}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Visualization Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SettingsPage;