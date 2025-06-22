

// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [lastResult, setLastResult] = useState(null);

    const validatePipelineData = () => {
        const errors = [];
        const nodeIds = nodes.map(node => node.id).filter(id => id?.trim());

        // Check for empty/duplicate node IDs
        if (nodes.some(node => !node.id?.trim())) {
            errors.push('Found nodes with empty IDs');
        }
        if (new Set(nodeIds).size !== nodeIds.length) {
            errors.push('Found duplicate node IDs');
        }

        // Check for invalid edges and self-loops
        const nodeIdSet = new Set(nodeIds);
        if (edges.some(edge => !nodeIdSet.has(edge.source) || !nodeIdSet.has(edge.target))) {
            errors.push('Found edges referencing non-existent nodes');
        }
        if (edges.some(edge => edge.source === edge.target)) {
            errors.push('Found self-loop edges (not allowed)');
        }

        return errors;
    };

    const formatAnalysisResult = (result) => {
        const sections = [
            `🔍 Pipeline Analysis Results\n${'='.repeat(35)}\n`,
            `📊 Basic Statistics:
   • Nodes: ${result.num_nodes}
   • Edges: ${result.num_edges}
   • Connected Components: ${result.connected_components}\n`,
            `🔄 DAG Validation:
   ${result.is_dag ?
                `✅ Valid DAG - Pipeline can be executed!${result.topological_order?.length ?
                    `\n   📋 Execution Order: ${result.topological_order.join(' → ')}` : ''}` :
                `❌ Invalid DAG - Contains cycles!${result.cycle_nodes?.length ?
                    `\n   🔄 Nodes in cycles: ${result.cycle_nodes.join(', ')}` : ''}`}\n`
        ];

        // Node Classification
        const nodeTypes = [
            result.source_nodes?.length && `🟢 Source nodes: ${result.source_nodes.join(', ')}`,
            result.sink_nodes?.length && `🔴 Sink nodes: ${result.sink_nodes.join(', ')}`,
            result.isolated_nodes?.length && `⚪ Isolated nodes: ${result.isolated_nodes.join(', ')}`
        ].filter(Boolean);

        if (nodeTypes.length) {
            sections.push(`🏷️ Node Classification:\n   ${nodeTypes.join('\n   ')}\n`);
        }

        // Recommendations
        const recommendations = [];
        if (result.is_dag) {
            recommendations.push('Pipeline is ready for execution');
            if (result.isolated_nodes?.length) {
                recommendations.push('Consider connecting or removing isolated nodes');
            }
        } else {
            recommendations.push('Remove cycles to make pipeline executable');
        }
        if (result.connected_components > 1) {
            recommendations.push(`Pipeline has ${result.connected_components} disconnected parts`);
        }

        sections.push(`💡 Recommendations:\n   • ${recommendations.join('\n   • ')}`);

        return sections.join('\n');
    };

    const handleSubmit = async () => {
        const validationErrors = validatePipelineData();
        if (validationErrors.length > 0) {
            alert(`❌ Validation Errors:\n\n${validationErrors.join('\n')}\n\nPlease fix these issues before submitting.`);
            return;
        }

        setIsLoading(true);

        const pipelineData = {
            nodes: nodes.map(node => ({
                id: node.id?.trim() || '',
                type: node.type || 'default',
                data: node.data || {},
                position: node.position || { x: 0, y: 0 }
            })),
            edges: edges.map(edge => ({
                id: edge.id || `${edge.source}-${edge.target}`,
                source: edge.source?.trim() || '',
                target: edge.target?.trim() || '',
                type: edge.type || 'default',
                data: {
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle,
                    ...edge.data
                }
            }))
        };

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pipelineData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 422 && result.details?.validation_errors) {
                    const validationMsg = result.details.validation_errors
                        .map(err => `• ${err.loc.join('.')}: ${err.msg}`)
                        .join('\n');
                    throw new Error(`Validation failed:\n\n${validationMsg}`);
                }
                throw new Error(result.message || `Server error: ${response.status}`);
            }

            setLastResult(result);
            alert(formatAnalysisResult(result));
            console.log('Pipeline Analysis Result:', result);

        } catch (error) {
            console.error('Error submitting pipeline:', error);

            let errorMessage = `❌ Pipeline Analysis Failed\n${'='.repeat(30)}\n\n`;

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage += `🔌 Connection Error: Cannot connect to backend server.\n\nEnsure backend is running on http://localhost:8000`;
            } else if (error.message.includes('Validation failed')) {
                errorMessage += `📝 Data Validation Error:\n${error.message.replace('Validation failed:\n\n', '')}`;
            } else {
                errorMessage += `🔧 Error: ${error.message}`;
            }

            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonText = isLoading ? 'Analyzing...' :
        nodes.length === 0 ? 'No Pipeline to Analyze' :
            'Analyze Pipeline';

    const isDisabled = isLoading || nodes.length === 0;

    const buttonStyle = {
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '8px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        minWidth: '180px',
        background: isDisabled ?
            'linear-gradient(135deg, #6c757d 0%, #495057 100%)' :
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        opacity: isDisabled ? 0.6 : 1
    };

    const statusText = `Nodes: ${nodes.length} | Edges: ${edges.length}${lastResult ? ` | ${lastResult.is_dag ? '✅ Valid DAG' : '❌ Has Cycles'}` : ''
        }`;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            flexWrap: 'wrap',
            gap: '15px'
        }}>
            <button
                onClick={handleSubmit}
                disabled={isDisabled}
                style={buttonStyle}
                onMouseOver={(e) => {
                    if (!isDisabled) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                    }
                }}
                onMouseOut={(e) => {
                    if (!isDisabled) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }
                }}
            >
                {isLoading && (
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginRight: '8px'
                    }} />
                )}
                {buttonText}
            </button>

            <div style={{
                color: '#333',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
                {statusText}
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
