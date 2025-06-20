// // toolbar.js

// import { DraggableNode } from './draggableNode';

// export const PipelineToolbar = () => {

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//                 <DraggableNode type='customInput' label='Input' />
//                 <DraggableNode type='llm' label='LLM' />
//                 <DraggableNode type='customOutput' label='Output' />
//                 <DraggableNode type='text' label='Text' />
//             </div>
//         </div>
//     );
// };




// Updated Toolbar with enhanced styling
import React from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const toolbarStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        borderRadius: '12px',
        margin: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle = {
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        textAlign: 'center'
    };

    const nodeGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '16px',
        maxWidth: '800px',
        margin: '0 auto'
    };

    return (
        <div style={toolbarStyle}>
            <div style={nodeGridStyle}>
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='math' label='Math' icon='🔢' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='timer' label='Timer' icon='⏰' />
                <DraggableNode type='condition' label='Condition' icon='❓' />
                <DraggableNode type='transform' label='Transform' icon='🔄' />
            </div>
        </div>
    );
};
