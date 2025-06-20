// // inputNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const InputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
//   const [inputType, setInputType] = useState(data.inputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setInputType(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Input</span>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={currName}
//             onChange={handleNameChange}
//           />
//         </label>
//         <label>
//           Type:
//           <select value={inputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">File</option>
//           </select>
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-value`}
//       />
//     </div>
//   );
// }




// Refactored Input Node
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const outputs = [{ id: 'value', label: 'Value' }];

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const inputStyle = {
    padding: '4px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '12px'
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: '#ffffff'
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={outputs}
      className="input-node"
      style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}
    >
      <div style={formStyle}>
        <label style={{ fontSize: '12px', fontWeight: '500' }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={inputStyle}
          />
        </label>
        <label style={{ fontSize: '12px', fontWeight: '500' }}>
          Type:
          <select value={inputType} onChange={handleTypeChange} style={selectStyle}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
