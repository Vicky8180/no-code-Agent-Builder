// 4. Condition Node - Conditional logic branching
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

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
            title="Condition"
            inputs={inputs}
            outputs={outputs}
            className="condition-node"
            style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderColor: '#22c55e'
            }}
        >
            <div>
                <label style={{ fontSize: '12px', fontWeight: '500' }}>
                    Operator:
                    <select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        style={selectStyle}
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
