// // outputNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const OutputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
//   const [outputType, setOutputType] = useState(data.outputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setOutputType(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-value`}
//       />
//       <div>
//         <span>Output</span>
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
//           <select value={outputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">Image</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// }




// Refactored Output Node
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputs = [{ id: 'value', label: 'Value' }];

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
      title="Output"
      inputs={inputs}
      className="output-node"
      style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' }}
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
          <select value={outputType} onChange={handleTypeChange} style={selectStyle}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
