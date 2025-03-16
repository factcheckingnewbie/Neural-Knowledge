# Modular Architecture Example

This example demonstrates how to swap out components in Neural Knowledge.

## Swapping Database Backends

Neural Knowledge supports multiple database backends:

### Neo4j

```rust
// In src/db/mod.rs
use crate::db::neo4j::Neo4jDatabase;

pub fn create_database(config: &Config) -> Box<dyn Database> {
    Box::new(Neo4jDatabase::new(
        &config.connection_string,
        &config.username,
        &config.password,
    ))
}
```

### SQLite

```rust
// In src/db/mod.rs
use crate::db::sqlite::SqliteDatabase;

pub fn create_database(config: &Config) -> Box<dyn Database> {
    Box::new(SqliteDatabase::new(&config.connection_string))
}
```

### In-Memory

```rust
// In src/db/mod.rs
use crate::db::memory::InMemoryDatabase;

pub fn create_database(_config: &Config) -> Box<dyn Database> {
    Box::new(InMemoryDatabase::new())
}
```

## Swapping AI Models

Neural Knowledge supports different AI model integrations:

### OpenAI API

```rust
// In src/ai/mod.rs
use crate::ai::openai::OpenAIModel;

pub fn create_ai_model(config: &Config) -> Box<dyn AIModel> {
    Box::new(OpenAIModel::new(
        &config.api_key,
        &config.model_name,
    ))
}
```

### Local Model

```rust
// In src/ai/mod.rs
use crate::ai::local::LocalModel;

pub fn create_ai_model(config: &Config) -> Box<dyn AIModel> {
    Box::new(LocalModel::new(
        &config.model_path,
        &config.model_name,
    ))
}
```

### No AI

```rust
// In src/ai/mod.rs
use crate::ai::null::NullModel;

pub fn create_ai_model(_config: &Config) -> Box<dyn AIModel> {
    Box::new(NullModel::new())
}
```

## Swapping Visualization Components

Neural Knowledge supports different visualization styles:

### Force-Directed Graph

```typescript
// In src/components/visualization/GraphView.tsx
import ForceGraph from './graphs/ForceGraph';

export const GraphView = ({ data }) => {
  return <ForceGraph data={data} />;
};
```

### Hierarchical Graph

```typescript
// In src/components/visualization/GraphView.tsx
import HierarchicalGraph from './graphs/HierarchicalGraph';

export const GraphView = ({ data }) => {
  return <HierarchicalGraph data={data} />;
};
```

### Radial Graph

```typescript
// In src/components/visualization/GraphView.tsx
import RadialGraph from './graphs/RadialGraph';

export const GraphView = ({ data }) => {
  return <RadialGraph data={data} />;
};
```

## Complete Example

Here's a complete example of how to configure Neural Knowledge with Neo4j, OpenAI, and a force-directed graph:

```rust
// In src/main.rs
fn main() {
    let config = Config {
        database: DatabaseConfig {
            type_: DatabaseType::Neo4j,
            connection_string: "bolt://localhost:7687".to_string(),
            username: "neo4j".to_string(),
            password: "password".to_string(),
        },
        ai_model: AIModelConfig {
            type_: AIModelType::OpenAI,
            api_key: "sk-...".to_string(),
            model_name: "gpt-4".to_string(),
        },
        visualization: VisualizationConfig {
            graph_style: GraphStyle::Force,
            tree_style: TreeStyle::Default,
        },
    };

    let database = create_database(&config.database);
    let ai_model = create_ai_model(&config.ai_model);
    
    let app = App::new(database, ai_model, config.visualization);
    app.run();
}