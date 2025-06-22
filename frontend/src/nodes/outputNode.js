import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const inputs = [{ id: 'value', label: 'Value' }];

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={inputs}
      className="output-node"
      style={{
        background: 'linear-gradient(135deg, #d3f9d8 0%, #b5e7a0 100%)',
        borderColor: '#4ade80',
        borderRadius: '10px'
      }}
    >
      <div className="node-container">
        <label className="node-label">
          Name
          <input
            type="text"
            className="node-input"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label className="node-label">
          Type
          <select
            className="node-select"
            value={outputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
