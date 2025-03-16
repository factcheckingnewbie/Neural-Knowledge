import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to Neural Knowledge</h1>
        </div>

        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Graph Database</CardTitle>
                <CardDescription>Explore your knowledge graph</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Visualize and manage your knowledge graph with semantic connections.</p>
              </CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/graph">Go to Graph</Link>
              </Button>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tree Visualization</CardTitle>
                <CardDescription>Navigate your knowledge in a hierarchical tree view</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Organize and browse your knowledge base with an intuitive tree-style interface.</p>
              </CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tree">View Tree</Link>
              </Button>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Knowledge Nodes</CardTitle>
                <CardDescription>Manage individual knowledge nodes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create, edit, and delete nodes to build your knowledge base.</p>
              </CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/nodes">Manage Nodes</Link>
              </Button>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Generator</CardTitle>
                <CardDescription>Create videos from images using AI</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Upload images and generate videos with the power of local AI models.</p>
              </CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/video-generator">Generate Video</Link>
              </Button>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Customize database, AI model, and visualization settings.</p>
              </CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/settings">Go to Settings</Link>
              </Button>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Manual</CardTitle>
                <CardDescription>Learn how to use Neural Knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access detailed documentation and examples to get started.</p>
              </CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/manual">Read Manual</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
