import React from 'react';
import { Square, Circle, Triangle, Diamond, Database, Type, Layout, Network } from 'lucide-react';

const ShapeItem = ({ type, label, icon: Icon }: { type: string; label: string; icon: any }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="m-1 flex cursor-grab flex-col items-center justify-center rounded border border-gray-200 bg-white p-3 shadow-sm hover:bg-gray-50"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <Icon className="mb-1 h-6 w-6 text-gray-600" />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="flex h-full w-64 flex-col overflow-y-auto border-r border-border bg-white">
      <div className="border-b border-border p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Shape Library
        </h2>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-semibold text-gray-500">General</h3>
          <div className="grid grid-cols-3 gap-2">
            <ShapeItem type="rectangle" label="Rect" icon={Square} />
            <ShapeItem type="circle" label="Circle" icon={Circle} />
            <ShapeItem type="triangle" label="Tri" icon={Triangle} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-semibold text-gray-500">Flowchart</h3>
          <div className="grid grid-cols-3 gap-2">
            <ShapeItem type="diamond" label="Decision" icon={Diamond} />
            <ShapeItem type="process" label="Process" icon={Layout} />
            <ShapeItem type="terminal" label="Term" icon={Square} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-semibold text-gray-500">Data</h3>
          <div className="grid grid-cols-3 gap-2">
            <ShapeItem type="database" label="DB" icon={Database} />
            <ShapeItem type="input" label="Input" icon={Type} />
            <ShapeItem type="network" label="Net" icon={Network} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
