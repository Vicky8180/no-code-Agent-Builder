// ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { TimerNode } from './nodes/timerNode';
import { ConditionNode } from './nodes/conditionNode';
import { TransformNode } from './nodes/transformNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  timer: TimerNode,
  condition: ConditionNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
        console.log('Dropped node type:', appData);


        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        console.log('Adding new node:', newNode);

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const containerStyle = {
    width: '100%',
    height: '85vh',
    // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '12px',
    // margin: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    // backgroundColor: 'rgb(31 31 48)',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: '#3b82f6' },
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: 'arrowclosed',
              color: '#3b82f6',
            },
          }}
        >
          <Background
            color="#94a3b8"
            gap={gridSize}
            style={{ opacity: 0.5 }}
          />
          <Controls
            style={{
              button: {
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }
            }}
          />
          <MiniMap
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
            nodeColor={(node) => {
              switch (node.type) {
                case 'customInput': return '#3b82f6';
                case 'llm': return '#f59e0b';
                case 'customOutput': return '#10b981';
                case 'text': return '#6366f1';
                case 'math': return '#8b5cf6';
                case 'filter': return '#ec4899';
                case 'timer': return '#f97316';
                case 'condition': return '#22c55e';
                case 'transform': return '#a855f7';
                default: return '#64748b';
              }
            }}
          />
        </ReactFlow>
      </div>
    </div>
  )
}
