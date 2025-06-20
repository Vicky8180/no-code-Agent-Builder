// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input
//             type="text"
//             value={currText}
//             onChange={handleTextChange}
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }





// Enhanced Text Node with Variable Support
import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);

  // Extract variables from text using regex
  const extractVariables = (text) => {
    const variableRegex = /\{\{(\s*[a-zA-Z_][a-zA-Z0-9_]*\s*)\}\}/g;
    const matches = [];
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      const variableName = match[1].trim();
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }

    return matches;
  };

  // Auto-resize textarea and node
  const adjustSize = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';

      // Calculate new dimensions
      const newHeight = Math.max(60, textarea.scrollHeight + 40); // +40 for padding and title
      const textLength = currText.length;
      const newWidth = Math.max(200, Math.min(400, 200 + textLength * 2));

      setDimensions({ width: newWidth, height: newHeight });

      // Set textarea height
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
    adjustSize();
  }, [currText]);

  console.log('TextNode variables:', variables);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for variables
  const inputHandles = variables.map(variable => ({
    id: variable,
    label: variable
  }));

  const outputHandles = [{ id: 'output', label: 'Output' }];

  const textareaStyle = {
    width: '100%',
    minHeight: '60px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '8px',
    fontSize: '12px',
    fontFamily: 'monospace',
    resize: 'none',
    outline: 'none',
    backgroundColor: '#f9fafb',
    transition: 'border-color 0.2s',
    overflow: 'hidden'
  };

  const variableIndicatorStyle = {
    marginTop: '8px',
    fontSize: '10px',
    color: '#6b7280'
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={inputHandles}
      outputs={outputHandles}
      width={dimensions.width}
      height={dimensions.height}
      className="text-node"
    >
      <div>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={textareaStyle}
          placeholder="Enter text with variables like {{variableName}}"
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
        {variables.length > 0 && (
          <div style={variableIndicatorStyle}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
