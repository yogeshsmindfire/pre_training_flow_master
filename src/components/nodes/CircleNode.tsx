import React from 'react';
import { Handle, Position } from 'reactflow';

const CircleNode: React.FC<any> = ({ data }) => {
  return (
    <div className="circle-node">
      <Handle type="target" position={Position.Top} />
      <div className="circle-shape" />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-label">{data.label}</div>
    </div>
  );
};

export default CircleNode;
