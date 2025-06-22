import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const TransformNode = ({ id, data }) => {
    const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

    const inputs = [{ id: 'input', label: 'Input' }];
    const outputs = [{ id: 'output', label: 'Output' }];

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
            height={140}
            className="transform-node"
            style={{
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                borderColor: '#a855f7',
                borderRadius: '10px'
            }}
        >
            <div className="node-container">
                <select
                    value={transformType}
                    onChange={(e) => setTransformType(e.target.value)}
                    className="node-select"
                >
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="reverse">Reverse</option>
                    <option value="trim">Trim</option>
                    <option value="length">Length</option>
                    <option value="json">Parse JSON</option>
                </select>
                <div style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic' }}>
                    {getTransformDescription()}
                </div>
            </div>
        </BaseNode>
    );
};
