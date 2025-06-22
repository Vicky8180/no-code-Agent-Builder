
// DraggableNode component
import React from 'react';

export const DraggableNode = ({ type, label, icon = '⚡' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeStyle = {
    cursor: 'grab',
    minWidth: '100px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    userSelect: 'none'
  };

  const iconStyle = {
    fontSize: '24px',
    marginBottom: '4px'
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    e.target.style.background = 'rgba(255, 255, 255, 0.25)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={nodeStyle}
      draggable
    >
      <div style={iconStyle}>{icon}</div>
      <span>{label}</span>
    </div>
  );
};
