// // llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }



// Refactored LLM Node
import React from 'react';
import { BaseNode } from './BaseNode';

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
        borderColor: '#f59e0b'
      }}
    />
  );
};
