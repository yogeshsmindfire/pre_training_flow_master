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
    <div className="h-10 border-b border-border bg-white flex items-center px-4 space-x-2">
      <div className="flex items-center space-x-1 border-r border-border pr-2 mr-2">
         <button onClick={() => undo()} className="p-1.5 hover:bg-gray-100 rounded text-gray-600" title="Undo">
            <Undo size={18} />
         </button>
         <button onClick={() => redo()} className="p-1.5 hover:bg-gray-100 rounded text-gray-600" title="Redo">
            <Redo size={18} />
         </button>
      </div>

      <div className="flex items-center space-x-1 border-r border-border pr-2 mr-2">
         <button onClick={() => zoomIn()} className="p-1.5 hover:bg-gray-100 rounded text-gray-600" title="Zoom In">
            <ZoomIn size={18} />
         </button>
         <button onClick={() => zoomOut()} className="p-1.5 hover:bg-gray-100 rounded text-gray-600" title="Zoom Out">
             <ZoomOut size={18} />
         </button>
      </div>
      
      <div>
         <button className="p-1.5 hover:bg-red-50 text-red-500 rounded" title="Delete Selection">
            <Trash2 size={18} />
         </button>
      </div>
    </div>
  );
};

export default Toolbar;
