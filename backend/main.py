
# backend/main.py
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional, Set
from collections import defaultdict, deque
from pydantic import BaseModel, Field, validator
import uvicorn

app = FastAPI(title="Pipeline Parser API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Models
class NodeModel(BaseModel):
    id: str = Field(..., min_length=1)
    type: Optional[str] = None
    data: Optional[Dict] = None
    position: Optional[Dict] = None

    @validator('id')
    def validate_id(cls, v):
        if not v.strip():
            raise ValueError('Node ID cannot be empty')
        return v.strip()

class EdgeModel(BaseModel):
    source: str = Field(..., min_length=1)
    target: str = Field(..., min_length=1)
    id: Optional[str] = None
    type: Optional[str] = None
    data: Optional[Dict] = None

    @validator('source', 'target')
    def validate_node_ids(cls, v):
        if not v.strip():
            raise ValueError('Source and target cannot be empty')
        return v.strip()

    @validator('target')
    def validate_no_self_loop(cls, v, values):
        if 'source' in values and v == values['source']:
            raise ValueError('Self-loops not allowed')
        return v

class PipelineData(BaseModel):
    nodes: List[NodeModel] = Field(default_factory=list)
    edges: List[EdgeModel] = Field(default_factory=list)

    @validator('nodes')
    def validate_unique_node_ids(cls, v):
        if not v:
            return v
        node_ids = [node.id for node in v]
        if len(node_ids) != len(set(node_ids)):
            duplicates = [id for id in node_ids if node_ids.count(id) > 1]
            raise ValueError(f'Duplicate node IDs: {list(set(duplicates))}')
        return v

    @validator('edges')
    def validate_edges_reference_existing_nodes(cls, v, values):
        if not v or 'nodes' not in values:
            return v

        node_ids = {node.id for node in values['nodes']}
        for edge in v:
            if edge.source not in node_ids or edge.target not in node_ids:
                raise ValueError(f'Edge {edge.source}->{edge.target} references non-existent node')
        return v

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    cycle_nodes: Optional[List[str]] = None
    isolated_nodes: List[str] = Field(default_factory=list)
    source_nodes: List[str] = Field(default_factory=list)
    sink_nodes: List[str] = Field(default_factory=list)
    topological_order: Optional[List[str]] = None

# Core Functions
def find_cycles_dfs(adj: Dict[str, List[str]], node_ids: Set[str]) -> List[str]:
    """Find cycles using DFS."""
    WHITE, GRAY, BLACK = 0, 1, 2
    colors = {node: WHITE for node in node_ids}
    cycle_nodes = set()

    def dfs(node: str, path: List[str]) -> None:
        if colors[node] == GRAY:  # Cycle detected
            cycle_start = path.index(node)
            cycle_nodes.update(path[cycle_start:])
            return
        if colors[node] == BLACK:
            return

        colors[node] = GRAY
        path.append(node)
        for neighbor in adj.get(node, []):
            dfs(neighbor, path)
        path.pop()
        colors[node] = BLACK

    for node in node_ids:
        if colors[node] == WHITE:
            dfs(node, [])

    return sorted(cycle_nodes)

def topological_sort_kahn(adj: Dict[str, List[str]], node_ids: Set[str]) -> Optional[List[str]]:
    """Perform topological sort using Kahn's algorithm."""
    in_degree = {node: 0 for node in node_ids}

    # Calculate in-degrees
    for node in adj:
        for neighbor in adj[node]:
            in_degree[neighbor] += 1

    # Start with nodes having no incoming edges
    queue = deque([node for node in node_ids if in_degree[node] == 0])
    topo_order = []

    while queue:
        node = queue.popleft()
        topo_order.append(node)

        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return topo_order if len(topo_order) == len(node_ids) else None

@app.get('/')
async def root():
    return {'message': 'Pipeline Parser API is running 🎉'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineData):
    """Parse and analyze a pipeline DAG."""
    try:
        # Handle empty pipeline
        if not pipeline.nodes:
            return PipelineResponse(
                num_nodes=0,
                num_edges=0,
                is_dag=True,
                isolated_nodes=[],
                source_nodes=[],
                sink_nodes=[],
                topological_order=[]
            )

        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)

        # Build adjacency list
        adj = defaultdict(list)
        node_ids = {node.id for node in pipeline.nodes}
        in_degree = {node: 0 for node in node_ids}
        out_degree = {node: 0 for node in node_ids}

        for edge in pipeline.edges:
            adj[edge.source].append(edge.target)
            in_degree[edge.target] += 1
            out_degree[edge.source] += 1

        # Check if DAG using topological sort
        topo_order = topological_sort_kahn(adj, node_ids)
        is_dag = topo_order is not None

        # Find cycles if not DAG
        cycle_nodes = None if is_dag else find_cycles_dfs(adj, node_ids)

        # Classify nodes
        isolated_nodes = sorted([n for n in node_ids if in_degree[n] == 0 and out_degree[n] == 0])
        source_nodes = sorted([n for n in node_ids if in_degree[n] == 0 and out_degree[n] > 0])
        sink_nodes = sorted([n for n in node_ids if in_degree[n] > 0 and out_degree[n] == 0])

        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag,
            cycle_nodes=cycle_nodes,
            isolated_nodes=isolated_nodes,
            source_nodes=source_nodes,
            sink_nodes=sink_nodes,
            topological_order=topo_order
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process pipeline: {str(e)}"
        )

if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
