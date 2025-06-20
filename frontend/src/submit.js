// // submit.js

// export const SubmitButton = () => {

//     return (
//         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit">Submit</button>
//         </div>
//     );
// }



// Updated submit.js with improved styling
export const SubmitButton = () => {
    const buttonStyle = {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 32px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
        transition: 'all 0.2s ease',
        fontFamily: 'Inter, sans-serif',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    };

    return (
        <div style={containerStyle}>
            <button
                type="submit"
                style={buttonStyle}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
};
