import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const ConditionNode = ({ id, data }) => {
    const [operator, setOperator] = useState(data?.operator || '==');

    const inputs = [
        { id: 'valueA', label: 'A' },
        { id: 'valueB', label: 'B' }
    ];

    const outputs = [
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Condition"
            inputs={inputs}
            outputs={outputs}
            className="condition-node"
            style={{
                background: 'linear-gradient(135deg, #e8fef3 0%, #d1fae5 100%)',
                borderColor: '#22c55e',
                borderRadius: '10px'
            }}
        >
            <div className="node-container">
                <label className="node-label">
                    Operator
                    <select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="node-select"
                    >
                        <option value="==">==(equals)</option>
                        <option value="!=">&ne;(not equals)</option>
                        <option value=">">&gt;(greater)</option>
                        <option value="<">&lt;(less)</option>
                        <option value=">=">&ge;(greater/equal)</option>
                        <option value="<=">&le;(less/equal)</option>
                    </select>
                </label>
            </div>
        </BaseNode>
    );
};
