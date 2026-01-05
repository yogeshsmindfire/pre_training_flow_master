import React, { memo, useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { NodeData } from '../types';
import useStore from '../store/useStore';

const ShapeNode = ({ id, data, selected }: NodeProps<NodeData>) => {
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

  const updateNodeData = useStore((state) => state.updateNodeData);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(label);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync internal state with prop if it changes outside
  useEffect(() => {
    setEditText(label);
  }, [label]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

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

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateNodeData(id, { label: editText });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleBlur();
    }
  };

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
    <div className="w-full h-full relative group" onDoubleClick={handleDoubleClick}>
      <NodeResizer 
        isVisible={selected} 
        minWidth={50} 
        minHeight={50} 
        lineStyle={{ border: '1px solid #2563eb' }}
        handleStyle={{ width: 8, height: 8, background: '#2563eb' }}
      />

      <svg className="w-full h-full absolute top-0 left-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
         {renderShape()}
      </svg>
      
      {/* Label or Editor */}
      <div className="absolute inset-0 flex items-center justify-center p-2">
          {isEditing ? (
              <textarea
                ref={textareaRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full h-full bg-transparent border-none outline-none resize-none overflow-hidden font-sans m-auto"
                style={{ ...textStyle, color: style.stroke }} // keeping text color same as stroke or black default
              />
          ) : (
            <span style={textStyle} className="text-sm font-sans pointer-events-none break-words w-full h-full flex flex-col justify-center text-foreground select-none">
                {label}
            </span>
          )}
      </div>

      {/* Handles - visible on hover or selected */}
      <Handle id="top" type="target" position={Position.Top} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle id="top" type="source" position={Position.Top} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <Handle id="right" type="target" position={Position.Right} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle id="right" type="source" position={Position.Right} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <Handle id="bottom" type="target" position={Position.Bottom} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <Handle id="left" type="target" position={Position.Left} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle id="left" type="source" position={Position.Left} className="w-3 h-3 !bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default memo(ShapeNode);
