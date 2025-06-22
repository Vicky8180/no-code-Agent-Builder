import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const MathNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'add');

    const inputs = [
        { id: 'valueA', label: 'A' },
        { id: 'valueB', label: 'B' }
    ];

    const outputs = [{ id: 'result', label: 'Result' }];

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
                borderColor: '#6366f1',
                borderRadius: '10px'
            }}
        >
            <div className="node-container">
                <label className="node-label">
                    Operation
                    <select
                        className="node-select"
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
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
