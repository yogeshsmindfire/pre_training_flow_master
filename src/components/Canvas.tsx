import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  BackgroundVariant,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from '../store/useStore';
import ShapeNode from './ShapeNode';
import { v4 as uuidv4 } from 'uuid';
import { AppNode } from '../types';

import CustomEdge from './CustomEdge';

const nodeTypes = {
  shape: ShapeNode,
};

const edgeTypes = {
  default: CustomEdge,
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
          labelStyle: { fill: '#000000' },
        },
        style: { width: 100, height: 100 },
      };

      addNode(newNode);
    },
    [project, addNode],
  );

  return (
    <div
      className="h-full w-full flex-1 bg-gray-50 from-gray-50 to-gray-100"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-gray-50"
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
          style: { strokeWidth: 2, stroke: '#000000' },
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        connectionMode={ConnectionMode.Loose}
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={1} color="#e2e8f0" />
        <Controls className="!border-gray-200 !bg-white !text-gray-600 !shadow-sm" />
        <MiniMap
          zoomable
          pannable
          className="m-4 overflow-hidden rounded-lg !border-gray-200 !bg-white shadow-lg"
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
