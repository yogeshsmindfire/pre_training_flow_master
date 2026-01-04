import React from 'react';
import { Handle, Position } from 'reactflow';

const TriangleNode: React.FC<any> = ({ data }) => {
  return (
    <div className="triangle-node">
      <Handle type="target" position={Position.Top} />
      <div className="triangle-shape" />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-label">{data.label}</div>
    </div>
  );
};

export default TriangleNode;
