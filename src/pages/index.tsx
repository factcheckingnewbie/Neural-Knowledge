import { Link } from "react-router-dom";
import { Layers, Settings, BookOpen, Database, Brain, Network, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Graph", path: "/graph" },
    { name: "Tree", path: "/tree" },
    { name: "Nodes", path: "/nodes" },
    { name: "Settings", path: "/settings" },
    { name: "Manual", path: "/manual" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Network className="h-6 w-6" />
              <span className="font-bold text-xl">Neural Knowledge</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {isDarkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Neural Knowledge</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modular AI-driven Personal Knowledge Management system with graph database integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Graph Database
              </CardTitle>
              <CardDescription>
                Store your knowledge in a semantic graph structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Connect ideas, concepts, and information in a natural way that mirrors how your brain works.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/graph">Explore Graph</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Integration
              </CardTitle>
              <CardDescription>
                Leverage AI to enhance your knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Use LLMs to generate insights, summaries, and connections between your knowledge nodes.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/settings">Configure AI</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Tree Visualization
              </CardTitle>
              <CardDescription>
                Navigate your knowledge in a hierarchical tree view
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Easily browse and organize your knowledge base with an intuitive tree-style interface.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tree">View Tree</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Documentation
              </CardTitle>
              <CardDescription>
                Learn how to use the system effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Comprehensive guides and examples to help you get the most out of your knowledge management system.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/manual">Read Manual</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Modular Configuration
              </CardTitle>
              <CardDescription>
                Customize and extend your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Swap out components like the database, AI model, or visualization tools to suit your specific needs.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/settings">Configure System</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="animate-pulse">
            <Link to="/graph">Get Started</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Video Generator
              </CardTitle>
              <CardDescription>
                Create videos from images using AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Upload images and generate videos with the power of local AI models.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/video-generator">Generate Video</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Neural Knowledge - Built with Rust core and React frontend
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;