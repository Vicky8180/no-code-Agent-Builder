
// 2. Filter Node - Filters data based on conditions
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');

    const inputs = [{ id: 'data', label: 'Data' }];
    const outputs = [
        { id: 'filtered', label: 'Filtered' },
        { id: 'rejected', label: 'Rejected' }
    ];

    const inputStyle = {
        width: '100%',
        padding: '4px 8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '12px',
        marginTop: '4px'
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            inputs={inputs}
            outputs={outputs}
            height={120}
            className="filter-node"
            style={{
                background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                borderColor: '#ec4899'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500' }}>
                    Condition:
                    <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="greater">Greater Than</option>
                        <option value="less">Less Than</option>
                    </select>
                </label>
                <input
                    type="text"
                    placeholder="Filter value"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={inputStyle}
                />
            </div>
        </BaseNode>
    );
};
