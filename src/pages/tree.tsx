import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const TreePage = () => {
  const [selectedTab, setSelectedTab] = useState("view");
  
  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] p-6">
        <div className="h-full">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">
                Node Details
              </h1>
              
              <TabsList>
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 overflow-auto">
              <TabsContent value="view" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Node Title</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p>Select a node from the tree view on the left to view its details.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="edit" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Edit Node</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Node editor would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="connections" className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Node Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This view would show all connections to and from this node in the knowledge graph.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default TreePage;