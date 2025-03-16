# Neural Knowledge

A modular AI-driven Personal Knowledge Management (PKM) system with a graph database for LLM integration and a tree-style GUI for database visualization.

## Features

- **Graph Database Integration**: Store knowledge in a graph database with nodes and relationships for semantic connections
- **LLM Integration**: Connect to AI models for knowledge processing and generation
- **Tree-Style GUI Visualization**: Interactive tree view of the knowledge graph
- **Modular Architecture**: Pluggable components for database, AI, and visualization
- **Knowledge Import/Export**: Support for importing and exporting knowledge in various formats

## Architecture

Neural Knowledge is built with a modular architecture that allows you to swap out components:

- **Core**: Written in Rust for performance and reliability
- **Frontend**: React-based web interface with a tree-style GUI
- **Database**: Pluggable database backends (Neo4j, SQLite, in-memory)
- **AI Integration**: Support for OpenAI API and local models

## Getting Started

### Prerequisites

- Rust 1.70.0 or later
- Node.js 18.0.0 or later (for development)
- Optional: Neo4j or SQLite for persistent storage

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/neural-knowledge.git
   cd neural-knowledge
   ```

2. Build the Rust core:
   ```
   cargo build --release
   ```

3. Install frontend dependencies:
   ```
   cd web
   npm install
   ```

4. Run the application:
   ```
   cargo run --release
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

See the [User Manual](http://localhost:3000/manual) for detailed usage instructions.

## Examples

The `examples` directory contains sample knowledge bases and usage scenarios:

- `research-project`: Example of organizing research materials
- `personal-wiki`: Example of a personal knowledge base
- `project-management`: Example of tracking projects and tasks
- `learning-journal`: Example of documenting a learning journey

## Configuration

Neural Knowledge can be configured through the Settings page in the web interface:

- **Database**: Choose between Neo4j, SQLite, or in-memory storage
- **AI Model**: Configure OpenAI API or local model integration
- **Visualization**: Customize tree and graph visualization styles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.