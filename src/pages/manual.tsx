import { useState } from "react";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ManualPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">User Manual</h1>
          <p className="text-muted-foreground max-w-3xl">
            Welcome to Neural Knowledge, an AI-driven Personal Knowledge Management system. 
            This manual will help you understand how to use the system effectively.
          </p>
        </div>
        
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search the manual..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="w-full flex justify-start mb-8 overflow-x-auto">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="core-concepts">Core Concepts</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="ai-integration">AI Integration</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Getting Started</h2>
                  
                  <h3>Installation</h3>
                  <p>
                    Neural Knowledge is built with a Rust core and a React frontend. To install:
                  </p>
                  <pre><code>{`# Clone the repository
git clone https://github.com/your-username/neural-knowledge.git
cd neural-knowledge

# Install dependencies
cargo build --release  # For the Rust core
cd web && npm install  # For the React frontend

# Run the application
cargo run --release`}</code></pre>
                  
                  <h3>Quick Start</h3>
                  <ol>
                    <li>Launch the application using <code>cargo run --release</code></li>
                    <li>Navigate to <code>http://localhost:3000</code> in your browser</li>
                    <li>Create your first knowledge node by clicking "New Node" in the sidebar</li>
                    <li>Explore the tree view and graph visualization to see your knowledge base</li>
                  </ol>
                  
                  <h3>System Requirements</h3>
                  <ul>
                    <li>Operating System: Windows 10+, macOS 10.15+, or Linux</li>
                    <li>RAM: 4GB minimum, 8GB recommended</li>
                    <li>Disk Space: 200MB for the application, plus space for your knowledge base</li>
                    <li>Rust: 1.70.0 or later</li>
                    <li>Node.js: 18.0.0 or later (for development)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="core-concepts">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Core Concepts</h2>
                  
                  <h3>Knowledge Graph</h3>
                  <p>
                    Neural Knowledge organizes information as a graph, where:
                  </p>
                  <ul>
                    <li><strong>Nodes</strong> represent individual pieces of knowledge (notes, concepts, projects, references)</li>
                    <li><strong>Relationships</strong> connect nodes to show how they relate to each other</li>
                    <li><strong>Tags</strong> provide additional metadata for categorizing and filtering nodes</li>
                  </ul>
                  
                  <p>
                    This graph structure allows for more natural organization of knowledge compared to traditional hierarchical systems.
                  </p>
                  
                  <h3>Modular Architecture</h3>
                  <p>
                    The system is designed with modularity in mind, allowing you to swap out components:
                  </p>
                  <ul>
                    <li><strong>Database Backend</strong>: Choose between Neo4j, SQLite, or in-memory storage</li>
                    <li><strong>AI Integration</strong>: Connect to OpenAI's API or use a local model</li>
                    <li><strong>Visualization</strong>: Customize how your knowledge graph is displayed</li>
                  </ul>
                  
                  <h3>Knowledge Types</h3>
                  <p>
                    Neural Knowledge supports different types of knowledge nodes:
                  </p>
                  <ul>
                    <li><strong>Notes</strong>: Quick thoughts or information snippets</li>
                    <li><strong>Concepts</strong>: Well-defined ideas or principles</li>
                    <li><strong>Projects</strong>: Task-oriented collections of knowledge</li>
                    <li><strong>References</strong>: Links to external resources or citations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Database Configuration</h2>
                  
                  <p>
                    Neural Knowledge supports multiple database backends to store your knowledge graph.
                    You can configure the database in the Settings page.
                  </p>
                  
                  <h3>Supported Databases</h3>
                  
                  <h4>Neo4j</h4>
                  <p>
                    Neo4j is a native graph database, ideal for complex knowledge graphs.
                  </p>
                  <pre><code>{`// Configuration example
{
  "type": "neo4j",
  "connectionString": "bolt://localhost:7687",
  "username": "neo4j",
  "password": "password"
}`}</code></pre>
                  
                  <h4>SQLite</h4>
                  <p>
                    SQLite provides a lightweight, file-based database option.
                  </p>
                  <pre><code>{`// Configuration example
{
  "type": "sqlite",
  "connectionString": "knowledge.db"
}`}</code></pre>
                  
                  <h4>In-Memory</h4>
                  <p>
                    The in-memory option is useful for testing or temporary use.
                    Note that data will be lost when the application is closed.
                  </p>
                  <pre><code>{`// Configuration example
{
  "type": "inmemory"
}`}</code></pre>
                  
                  <h3>Swapping Database Backends</h3>
                  <p>
                    To change your database backend:
                  </p>
                  <ol>
                    <li>Go to Settings → Database</li>
                    <li>Select the desired database type</li>
                    <li>Configure the connection parameters</li>
                    <li>Click "Save Database Settings"</li>
                    <li>Restart the application</li>
                  </ol>
                  
                  <p>
                    To migrate data between databases, use the Export/Import functionality
                    in the File menu.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-integration">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>AI Integration</h2>
                  
                  <p>
                    Neural Knowledge can integrate with AI models to enhance your knowledge management.
                  </p>
                  
                  <h3>AI Features</h3>
                  <ul>
                    <li><strong>Content Generation</strong>: Generate summaries or expand on ideas</li>
                    <li><strong>Relationship Suggestions</strong>: Identify potential connections between nodes</li>
                    <li><strong>Semantic Search</strong>: Find relevant nodes based on meaning, not just keywords</li>
                    <li><strong>Knowledge Extraction</strong>: Automatically extract key concepts from text</li>
                  </ul>
                  
                  <h3>Supported AI Models</h3>
                  
                  <h4>OpenAI API</h4>
                  <p>
                    Connect to OpenAI's API to use models like GPT-4.
                  </p>
                  <pre><code>{`// Configuration example
{
  "type": "openai",
  "apiKey": "sk-...",
  "modelName": "gpt-4"
}`}</code></pre>
                  
                  <h4>Local Models</h4>
                  <p>
                    Run models locally or connect to a self-hosted API.
                  </p>
                  <pre><code>{`// Configuration example
{
  "type": "local",
  "endpoint": "http://localhost:8080/v1",
  "modelName": "llama3"
}`}</code></pre>
                  
                  <h3>Configuring AI Integration</h3>
                  <ol>
                    <li>Go to Settings → AI Model</li>
                    <li>Select the desired AI model type</li>
                    <li>Configure the API key or endpoint</li>
                    <li>Select the model name</li>
                    <li>Click "Save AI Settings"</li>
                  </ol>
                  
                  <p>
                    You can disable AI integration by selecting "None" as the AI model type.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visualization">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Visualization</h2>
                  
                  <p>
                    Neural Knowledge offers multiple ways to visualize your knowledge graph.
                  </p>
                  
                  <h3>Tree View</h3>
                  <p>
                    The tree view provides a hierarchical representation of your knowledge graph.
                    It's accessible from the sidebar on most pages.
                  </p>
                  
                  <h4>Tree View Styles</h4>
                  <ul>
                    <li><strong>Default</strong>: Standard tree view with moderate spacing</li>
                    <li><strong>Compact</strong>: Reduced spacing for viewing more nodes at once</li>
                    <li><strong>Expanded</strong>: Increased spacing with more node details visible</li>
                  </ul>
                  
                  <h3>Graph Visualization</h3>
                  <p>
                    The graph view shows your knowledge as an interactive network.
                    Access it by clicking "Graph" in the navigation menu.
                  </p>
                  
                  <h4>Graph View Styles</h4>
                  <ul>
                    <li><strong>Force-Directed</strong>: Nodes arrange themselves based on relationships</li>
                    <li><strong>Hierarchical</strong>: Nodes arranged in a top-down structure</li>
                    <li><strong>Radial</strong>: Nodes arranged in a circular pattern around a central node</li>
                  </ul>
                  
                  <h3>Customizing Visualization</h3>
                  <ol>
                    <li>Go to Settings → Visualization</li>
                    <li>Select your preferred tree and graph styles</li>
                    <li>Choose a theme (light, dark, or system)</li>
                    <li>Click "Save Visualization Settings"</li>
                  </ol>
                  
                  <p>
                    You can also customize node colors and relationship styles in the advanced settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="examples">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>Examples</h2>
                  
                  <p>
                    Here are some example use cases for Neural Knowledge.
                  </p>
                  
                  <h3>Research Project</h3>
                  <p>
                    Organize research materials, notes, and findings for an academic project.
                  </p>
                  <pre><code>{`// Example structure
- Research Project (Project)
  - Literature Review (Concept)
    - Paper A (Reference)
    - Paper B (Reference)
  - Methodology (Concept)
  - Findings (Concept)
  - Discussion (Note)`}</code></pre>

                  <h3>Personal Knowledge Base</h3>
                  <p>
                    Build a personal wiki of concepts, ideas, and information.
                  </p>
                  <pre><code>{`// Example structure
- Computer Science (Concept)
  - Algorithms (Concept)
    - Sorting Algorithms (Concept)
    - Search Algorithms (Concept)
  - Programming Languages (Concept)
    - Rust (Concept)
    - Python (Concept)
- Philosophy (Concept)
  - Epistemology (Concept)
  - Ethics (Concept)`}</code></pre>

                  <h3>Project Management</h3>
                  <p>
                    Track projects, tasks, and related information.
                  </p>
                  <pre><code>{`// Example structure
- Website Redesign (Project)
  - Requirements (Note)
  - Design Mockups (Reference)
  - Implementation Tasks (Note)
    - Frontend Development (Note)
    - Backend Development (Note)
  - Timeline (Note)
- Marketing Campaign (Project)
  - Target Audience (Concept)
  - Content Plan (Note)
  - Analytics (Reference)`}</code></pre>

                  <h3>Learning Journal</h3>
                  <p>
                    Document your learning journey in a structured way.
                  </p>
                  <pre><code>{`// Example structure
- Machine Learning (Concept)
  - Course Notes (Note)
  - Practice Projects (Project)
  - Resources (Reference)
- Spanish Language (Concept)
  - Vocabulary (Note)
  - Grammar Rules (Concept)
  - Practice Conversations (Note)`}</code></pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>API Reference</h2>
                  
                  <p>
                    Neural Knowledge provides a REST API for programmatic access to your knowledge graph.
                  </p>
                  
                  <h3>Authentication</h3>
                  <p>
                    API requests require an API key, which you can generate in Settings → API.
                  </p>
                  <pre><code>{`// Example request with authentication
curl -X GET http://localhost:3000/api/nodes \\
  -H "Authorization: Bearer your-api-key"`}</code></pre>
                  
                  <h3>Nodes API</h3>
                  
                  <h4>Get All Nodes</h4>
                  <pre><code>{`GET /api/nodes

// Response
{
  "nodes": [
    {
      "id": "node1",
      "title": "Example Node",
      "content": "This is an example node.",
      "type": "note",
      "tags": ["example", "documentation"],
      "createdAt": "2023-06-15T10:30:00Z",
      "updatedAt": "2023-06-15T10:30:00Z"
    },
    // ...
  ]
}`}</code></pre>
                  
                  <h4>Get Node by ID</h4>
                  <pre><code>{`GET /api/nodes/:id

// Response
{
  "id": "node1",
  "title": "Example Node",
  "content": "This is an example node.",
  "type": "note",
  "tags": ["example", "documentation"],
  "createdAt": "2023-06-15T10:30:00Z",
  "updatedAt": "2023-06-15T10:30:00Z"
}`}</code></pre>
                  
                  <h4>Create Node</h4>
                  <pre><code>{`POST /api/nodes
{
  "title": "New Node",
  "content": "This is a new node.",
  "type": "note",
  "tags": ["new", "example"]
}

// Response
{
  "id": "node2",
  "title": "New Node",
  "content": "This is a new node.",
  "type": "note",
  "tags": ["new", "example"],
  "createdAt": "2023-06-15T11:00:00Z",
  "updatedAt": "2023-06-15T11:00:00Z"
}`}</code></pre>
                  
                  <h3>Relationships API</h3>
                  
                  <h4>Get Relationships</h4>
                  <pre><code>{`GET /api/relationships

// Response
{
  "relationships": [
    {
      "id": "rel1",
      "sourceId": "node1",
      "targetId": "node2",
      "type": "references",
      "weight": 1,
      "createdAt": "2023-06-15T11:30:00Z"
    },
    // ...
  ]
}`}</code></pre>
                  
                  <h4>Create Relationship</h4>
                  <pre><code>{`POST /api/relationships
{
  "sourceId": "node1",
  "targetId": "node3",
  "type": "contains",
  "weight": 2
}

// Response
{
  "id": "rel2",
  "sourceId": "node1",
  "targetId": "node3",
  "type": "contains",
  "weight": 2,
  "createdAt": "2023-06-15T12:00:00Z"
}`}</code></pre>
                  
                  <h3>Search API</h3>
                  
                  <h4>Search Nodes</h4>
                  <pre><code>{`GET /api/search?q=example

// Response
{
  "results": [
    {
      "id": "node1",
      "title": "Example Node",
      "content": "This is an example node.",
      "type": "note",
      "relevance": 0.95
    },
    // ...
  ]
}`}</code></pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ManualPage;