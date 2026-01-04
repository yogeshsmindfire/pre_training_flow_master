import React from 'react';
import { Handle, Position } from 'reactflow';

const SquareNode: React.FC<any> = ({ data }) => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        border: '2px solid #333',
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        textAlign: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      {data.label}
    </div>
  );
};

export default SquareNode;
