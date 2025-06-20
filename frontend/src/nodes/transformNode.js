
// 5. Transform Node - Data transformation with multiple options
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

    const inputs = [{ id: 'input', label: 'Input' }];
    const outputs = [{ id: 'output', label: 'Output' }];

    const selectStyle = {
        width: '100%',
        padding: '4px 8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '12px',
        backgroundColor: '#ffffff'
    };

    const getTransformDescription = () => {
        const descriptions = {
            'uppercase': 'Convert to UPPERCASE',
            'lowercase': 'Convert to lowercase',
            'reverse': 'Reverse the text',
            'trim': 'Remove whitespace',
            'length': 'Get text length',
            'json': 'Parse as JSON'
        };
        return descriptions[transformType] || '';
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Transform"
            inputs={inputs}
            outputs={outputs}
            height={120}
            className="transform-node"
            style={{
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                borderColor: '#a855f7'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <select
                    value={transformType}
                    onChange={(e) => setTransformType(e.target.value)}
                    style={selectStyle}
                >
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="reverse">Reverse</option>
                    <option value="trim">Trim</option>
                    <option value="length">Length</option>
                    <option value="json">Parse JSON</option>
                </select>
                <div style={{ fontSize: '10px', color: '#6b7280', fontStyle: 'italic' }}>
                    {getTransformDescription()}
                </div>
            </div>
        </BaseNode>
    );
};
