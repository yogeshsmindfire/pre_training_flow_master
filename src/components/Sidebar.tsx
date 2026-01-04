import React from 'react';
import { 
  Square, 
  Circle, 
  Triangle, 
  Diamond, 
  Database,
  Type,
  Layout,
  Network
} from 'lucide-react';

const ShapeItem = ({ type, label, icon: Icon }: { type: string, label: string, icon: any }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
        className="flex flex-col items-center justify-center p-3 m-1 bg-white border rounded cursor-grab hover:bg-gray-50 border-gray-200 shadow-sm"
        onDragStart={(event) => onDragStart(event, type)}
        draggable
    >
      <Icon className="w-6 h-6 mb-1 text-gray-600" />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-white border-r border-border flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-sm uppercase text-gray-400 tracking-wider">Shape Library</h2>
      </div>
      
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-2">General</h3>
          <div className="grid grid-cols-3 gap-2">
             <ShapeItem type="rectangle" label="Rect" icon={Square} />
             <ShapeItem type="circle" label="Circle" icon={Circle} />
             <ShapeItem type="triangle" label="Tri" icon={Triangle} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-2">Flowchart</h3>
          <div className="grid grid-cols-3 gap-2">
             <ShapeItem type="diamond" label="Decision" icon={Diamond} />
             <ShapeItem type="process" label="Process" icon={Layout} />
             <ShapeItem type="terminal" label="Term" icon={Square} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-2">Data</h3>
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
