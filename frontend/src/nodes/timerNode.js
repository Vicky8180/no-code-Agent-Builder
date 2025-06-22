import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import './nodeStyles.css';

export const TimerNode = ({ id, data }) => {
    const [delay, setDelay] = useState(data?.delay || '1000');
    const [unit, setUnit] = useState(data?.unit || 'ms');

    const inputs = [{ id: 'trigger', label: 'Trigger' }];
    const outputs = [{ id: 'delayed', label: 'Delayed' }];

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
                borderColor: '#f97316',
                borderRadius: '10px'
            }}
        >
            <div className="node-inline">
                <span style={{ fontSize: '13px' }}>Delay:</span>
                <input
                    type="number"
                    className="node-input"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    style={{ width: '60px' }}
                />
                <select
                    className="node-select"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    style={{ width: '50px' }}
                >
                    <option value="ms">ms</option>
                    <option value="s">s</option>
                    <option value="m">m</option>
                </select>
            </div>
        </BaseNode>
    );
};
