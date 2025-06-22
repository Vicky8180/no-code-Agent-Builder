import React from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const LLMNode = ({ id, data }) => {
  const inputs = [
    { id: 'system', label: 'System' },
    { id: 'prompt', label: 'Prompt' }
  ];

  const outputs = [{ id: 'response', label: 'Response' }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      content="Large Language Model processing node"
      inputs={inputs}
      outputs={outputs}
      className="llm-node"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        borderColor: '#f59e0b',
        borderRadius: '10px'
      }}
    >
      <div className="node-container">
        <div className="node-description">
          Large Language Model processing node
        </div>
      </div>
    </BaseNode>
  );
};
