import React from 'react';
import { Handle, Position } from 'reactflow';

const OvalNode: React.FC<any> = ({ data }) => {
  return (
    <div
      style={{
        width: 120,
        height: 80,
        backgroundColor: '#fff',
        border: '2px solid #333',
        borderRadius: '50%',
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

export default OvalNode;
