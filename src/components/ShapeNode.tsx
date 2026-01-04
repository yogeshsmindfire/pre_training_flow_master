import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeData } from '../types';

const ShapeNode = ({ data, selected }: NodeProps<NodeData>) => {
  const { 
     label, 
     type = 'rectangle', 
     fill = '#ffffff', 
     stroke = '#000000', 
     strokeWidth = 1,
     opacity = 1,
     fontWeight,
     fontStyle,
     textDecoration,
     textAlign = 'center'
  } = data;

  const style: React.CSSProperties = {
     fill,
     stroke,
     strokeWidth,
     opacity
  };

  const textStyle: React.CSSProperties = {
     fontWeight,
     fontStyle,
     textDecoration,
     textAlign: textAlign as any,
  };

  // SVGs for shapes
  // We render the SVG as a background or main element
  const width = 100; // Default base size, scaled by node style usually, but here handled by SVG
  const height = 100;

  // We can use a 100x100 viewBox and let the node container handle resizing (if Resizer is used)
  // But for this scaffold, we assume the node is sized 100x100 or whatever style says.
  // Actually, standard React Node gets its width/height from the wrapper.
  // We will make the SVG fill the wrapper.

  const renderShape = () => {
      switch (type) {
          case 'circle':
              return <circle cx="50" cy="50" r="48" style={style} />;
          case 'diamond':
              return <polygon points="50,0 100,50 50,100 0,50" style={style} />;
          case 'triangle':
              return <polygon points="50,0 100,100 0,100" style={style} />;
          case 'database':
              return (
                  <g style={style}>
                    <path d="M100,15 C100,23.28 77.61,30 50,30 C22.39,30 0,23.28 0,15 C0,6.72 22.39,0 50,0 C77.61,0 100,6.72 100,15" />
                    <path d="M100,15 L100,85 C100,93.28 77.61,100 50,100 C22.39,100 0,93.28 0,85 L0,15" fill={fill} />
                     {/* Overlay for top stroke */}
                    <path d="M100,15 C100,23.28 77.61,30 50,30 C22.39,30 0,23.28 0,15" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
                  </g>
              );
          case 'process':
          case 'rectangle':
          default:
              return <rect x="1" y="1" width="98" height="98" rx="4" ry="4" style={style} />;
      }
  };

  return (
    <div className="w-full h-full relative group">
      <svg className="w-full h-full absolute top-0 left-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
         {renderShape()}
      </svg>
      
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none">
          <span style={textStyle} className="text-sm font-sans pointer-events-auto break-words w-full h-full flex items-center justify-center text-foreground">
              {label}
          </span>
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Top} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <Handle type="target" position={Position.Right} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <Handle type="target" position={Position.Bottom} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Left} className="w-2 h-2 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default memo(ShapeNode);
