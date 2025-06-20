//  3. Timer Node - Adds delays or scheduling
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
    const [delay, setDelay] = useState(data?.delay || '1000');
    const [unit, setUnit] = useState(data?.unit || 'ms');

    const inputs = [{ id: 'trigger', label: 'Trigger' }];
    const outputs = [{ id: 'delayed', label: 'Delayed' }];

    const inputStyle = {
        width: '60px',
        padding: '4px 8px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        fontSize: '12px'
    };

    const selectStyle = {
        ...inputStyle,
        width: '50px',
        backgroundColor: '#ffffff'
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Timer"
            inputs={inputs}
            outputs={outputs}
            className="timer-node"
            style={{
                background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
                borderColor: '#f97316'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '12px' }}>Delay:</span>
                <input
                    type="number"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    style={inputStyle}
                />
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    style={selectStyle}
                >
                    <option value="ms">ms</option>
                    <option value="s">s</option>
                    <option value="m">m</option>
                </select>
            </div>
        </BaseNode>
    );
};
