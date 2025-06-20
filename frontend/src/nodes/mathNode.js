// Five New Demo Nodes showcasing the BaseNode abstraction

// 1. Math Node - Performs mathematical operations
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'add');

    const inputs = [
        { id: 'valueA', label: 'A' },
        { id: 'valueB', label: 'B' }
    ];

    const outputs = [{ id: 'result', label: 'Result' }];

    const selectStyle = {
        width: '100%',
        padding: '4px 8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '12px',
        backgroundColor: '#ffffff'
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Math"
            inputs={inputs}
            outputs={outputs}
            className="math-node"
            style={{
                background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                borderColor: '#6366f1'
            }}
        >
            <div>
                <label style={{ fontSize: '12px', fontWeight: '500' }}>
                    Operation:
                    <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="add">Add (+)</option>
                        <option value="subtract">Subtract (-)</option>
                        <option value="multiply">Multiply (×)</option>
                        <option value="divide">Divide (÷)</option>
                    </select>
                </label>
            </div>
        </BaseNode>
    );
};
