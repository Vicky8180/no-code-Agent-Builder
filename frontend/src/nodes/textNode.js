import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);

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

  const adjustSize = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      textarea.style.height = 'auto';
      const newHeight = Math.max(60, textarea.scrollHeight + 40);
      const textLength = currText.length;
      const newWidth = Math.max(200, Math.min(400, 200 + textLength * 2));

      setDimensions({ width: newWidth, height: newHeight });
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const extractedVars = extractVariables(currText);
    setVariables(extractedVars);
    adjustSize();
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const inputHandles = variables.map((variable) => ({
    id: variable,
    label: variable
  }));

  const outputHandles = [{ id: 'output', label: 'Output' }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={inputHandles}
      outputs={outputHandles}
      width={dimensions.width}
      height={dimensions.height + 60}
      className="text-node"
      style={{
        background: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
        borderColor: '#f472b6',
        borderRadius: '10px'
      }}
    >
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        className="node-textarea"
        placeholder="Enter text with variables like {{variableName}}"
        onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
        onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
      />
      {variables.length > 0 && (
        <div className="node-variable-indicator">
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};
