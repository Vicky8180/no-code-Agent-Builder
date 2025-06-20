// BaseNode.js - Node Abstraction
import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
    id,
    data,
    title,
    content,
    inputs = [],
    outputs = [],
    width = 200,
    height = 'auto',
    minHeight = 80,
    className = '',
    style = {},
    children,
    onResize
}) => {
    const baseStyle = {
        width,
        minHeight,
        height,
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '16px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'all 0.2s ease-in-out',
        ...style
    };

    const titleStyle = {
        fontSize: '14px',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '8px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '8px'
    };

    const contentStyle = {
        fontSize: '12px',
        color: '#64748b',
        lineHeight: '1.4'
    };

    // Calculate handle positions for multiple inputs/outputs
    const getHandleStyle = (index, total, isInput = true) => {
        if (total === 1) return { top: '50%' };
        const spacing = 80 / (total + 1);
        return { top: `${spacing * (index + 1)}%` };
    };

    return (
        <div
            className={`base-node ${className}`}
            style={baseStyle}
        >
            {/* Input Handles */}
            {inputs.map((input, index) => (
                <Handle
                    key={`input-${index}`}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${input.id}`}
                    style={{
                        ...getHandleStyle(index, inputs.length, true),
                        background: '#3b82f6',
                        border: '2px solid #ffffff',
                        width: '12px',
                        height: '12px'
                    }}
                />
            ))}

            {/* Node Content */}
            <div style={titleStyle}>{title}</div>

            {content && (
                <div style={contentStyle}>
                    {typeof content === 'string' ? content : content}
                </div>
            )}

            {children}

            {/* Output Handles */}
            {outputs.map((output, index) => (
                <Handle
                    key={`output-${index}`}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${output.id}`}
                    style={{
                        ...getHandleStyle(index, outputs.length, false),
                        background: '#10b981',
                        border: '2px solid #ffffff',
                        width: '12px',
                        height: '12px'
                    }}
                />
            ))}
        </div>
    );
};
