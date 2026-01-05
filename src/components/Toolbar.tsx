import React from 'react';
import { useReactFlow } from 'reactflow';
import useStore from '../store/useStore';
import { Undo, Redo, ZoomIn, ZoomOut, Trash2 } from 'lucide-react';

const Toolbar = () => {
  const { zoomIn, zoomOut } = useReactFlow();
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);
  // Optional: check canUndo/canRedo with state selectors if we implemented tracking

  return (
    <div className="flex h-10 items-center space-x-2 border-b border-border bg-white px-4">
      <div className="mr-2 flex items-center space-x-1 border-r border-border pr-2">
        <button
          onClick={() => undo()}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => redo()}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      <div className="mr-2 flex items-center space-x-1 border-r border-border pr-2">
        <button
          onClick={() => zoomIn()}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={() => zoomOut()}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-100"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
      </div>

      <div>
        <button className="rounded p-1.5 text-red-500 hover:bg-red-50" title="Delete Selection">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
