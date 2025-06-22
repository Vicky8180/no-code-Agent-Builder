import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');

    const inputs = [{ id: 'data', label: 'Data' }];
    const outputs = [
        { id: 'filtered', label: 'Filtered' },
        { id: 'rejected', label: 'Rejected' }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            inputs={inputs}
            outputs={outputs}
            height={200}
            className="filter-node"
            style={{
                background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                borderColor: '#ec4899',
                borderRadius: '10px'
            }}
        >
            <div className="node-container">
                <label className="node-label">
                    Condition
                    <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="node-select"
                    >
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="greater">Greater Than</option>
                        <option value="less">Less Than</option>
                    </select>
                </label>

                <label className="node-label">
                    Filter Value
                    <input
                        type="text"
                        placeholder="Enter value..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="node-input"
                    />
                </label>
            </div>
        </BaseNode>
    );
};
