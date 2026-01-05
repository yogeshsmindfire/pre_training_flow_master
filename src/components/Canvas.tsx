import React, { useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useReactFlow,
  BackgroundVariant,
  ConnectionMode,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from '../store/useStore';
import ShapeNode from './ShapeNode';
import { v4 as uuidv4 } from 'uuid';
import { AppNode } from '../types';

const nodeTypes = {
  shape: ShapeNode,
};

const Canvas = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const addNode = useStore((state) => state.addNode);

  const { project } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // precise positioning
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      const position = project({
        x: event.clientX - (reactFlowBounds?.left || 0),
        y: event.clientY - (reactFlowBounds?.top || 0),
      });

      const newNode: AppNode = {
        id: uuidv4(),
        type: 'shape',
        position,
        data: { 
            label: `${type}`,
            type: type as any, 
            fill: '#ffffff',
            stroke: '#000000',
            strokeWidth: 2,
            opacity: 1,
            labelStyle: { fill: '#000000' }
        },
        style: { width: 100, height: 100 },
      };

      addNode(newNode);
    },
    [project, addNode]
  );

  return (
    <div className="flex-1 h-full w-full bg-gray-50 from-gray-50 to-gray-100" onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: '#64748b' }, markerEnd: { type: MarkerType.ArrowClosed } }}
        snapToGrid={true}
        snapGrid={[15, 15]}
        connectionMode={ConnectionMode.Loose}
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={1} color="#e2e8f0" />
        <Controls className="!bg-white !border-gray-200 !shadow-sm !text-gray-600" />
        <MiniMap 
            zoomable 
            pannable 
            className="!bg-white !border-gray-200 shadow-lg rounded-lg overflow-hidden m-4" 
            nodeColor={(n) => {
                if (n.data?.fill) return n.data.fill;
                return '#eff6ff';
            }}
        />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
