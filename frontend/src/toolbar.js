
import React from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const toolbarStyle = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '12%',
        minWidth: '250px',
        height: '100vh',
        // background: 'linear-gradient(to bottom, #1e1e2f, #2c2c3c)',
        backdropFilter: 'blur(10px)',
        padding: '24px 18px',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        overflowY: 'auto',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '2px 0 12px rgba(0, 0, 0, 0.25)'
    };

    const titleStyle = {
        color: '#ffffff',
        fontSize: '1.2rem',
        fontWeight: 700,
        margin: 0,
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    const categoryStyle = {
        marginBottom: '24px'
    };

    const categoryTitleStyle = {
        color: '#b0b3c4',
        fontSize: '0.75rem',
        fontWeight: 600,
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const nodeGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '10px'
    };

    const nodeStyle = {
        borderRadius: '10px',
        padding: '12px 14px',
        background: '#2f3142',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#ffffff',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        boxShadow: 'inset 0 0 0 transparent',
    };

    const nodeHoverStyle = {
        background: '#3c3f55',
        transform: 'translateX(4px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)'
    };

    const iconStyle = {
        fontSize: '16px',
        marginRight: '10px',
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))'
    };

    return (
        <div style={toolbarStyle}>
            <div style={titleStyle}>
                <span role="img" aria-label="toolbox">🧰</span>
                <span>Pipeline Components</span>
            </div>

            {/* Each category */}
            {[
                {
                    title: 'Input / Output',
                    nodes: [
                        { type: 'customInput', label: 'Input Node', icon: '📥' },
                        { type: 'customOutput', label: 'Output Node', icon: '📤' }
                    ]
                },
                {
                    title: 'AI Processing',
                    nodes: [
                        { type: 'llm', label: 'LLM Model', icon: '🤖' },
                        { type: 'transform', label: 'Data Transform', icon: '🔄' }
                    ]
                },
                {
                    title: 'Data Operations',
                    nodes: [
                        { type: 'text', label: 'Text Processor', icon: '📝' },
                        { type: 'math', label: 'Math Operations', icon: '🔢' },
                        { type: 'filter', label: 'Data Filter', icon: '🔍' }
                    ]
                },
                {
                    title: 'Control Flow',
                    nodes: [
                        { type: 'timer', label: 'Timer', icon: '⏰' },
                        { type: 'condition', label: 'Conditional', icon: '❓' }
                    ]
                }
            ].map((category, idx) => (
                <div key={idx} style={categoryStyle}>
                    <div style={categoryTitleStyle}>{category.title}</div>
                    <div style={nodeGridStyle}>
                        {category.nodes.map((node, i) => (
                            <DraggableNode
                                key={i}
                                type={node.type}
                                label={node.label}
                                icon={node.icon}
                                style={nodeStyle}
                                iconStyle={iconStyle}
                                hoverStyle={nodeHoverStyle}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
