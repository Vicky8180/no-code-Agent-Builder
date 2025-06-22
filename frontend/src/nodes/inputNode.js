import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const outputs = [{ id: 'value', label: 'Value' }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={outputs}
      className="input-node"
      style={{
        background: 'linear-gradient(135deg, #e0f7ff 0%, #f0fbff 100%)',
        borderColor: '#38bdf8',
        borderRadius: '10px'
      }}
    >
      <div className="node-container">
        <label className="node-label">
          Name
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="node-input"
          />
        </label>
        <label className="node-label">
          Type
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="node-select"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
