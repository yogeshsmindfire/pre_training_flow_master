import React from 'react';
import useStore from '../store/useStore';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Trash2, BringToFront, SendToBack } from 'lucide-react';

const PropertiesPanel = () => {
  const nodes = useStore((state) => state.nodes);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const selectedNodes = nodes.filter((n) => n.selected);
  const deleteSelection = () => { /* TODO: Implement in store */ };

  if (selectedNodes.length === 0) {
    return (
      <aside className="w-64 bg-white border-l border-border p-4">
        <div className="text-gray-400 text-sm text-center mt-10">Select an element to style</div>
      </aside>
    );
  }

  // Multi-edit: Just take the first one or apply to all. Apply to all is better.
  // For UI values, show first one.
  const node = selectedNodes[0];
  const { data, style } = node;

  const handleChange = (field: string, value: any) => {
    selectedNodes.forEach((n) => {
      updateNodeData(n.id, { [field]: value });
    });
  };

  return (
    <aside className="w-72 bg-white border-l border-border flex flex-col h-full overflow-y-auto font-sans">
      <div className="p-4 border-b border-border bg-gray-50">
        <h2 className="font-semibold text-sm text-gray-700">Format</h2>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Style Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Style</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
               <label className="text-sm text-gray-600">Fill</label>
               <input 
                  type="color" 
                  value={data.fill || '#ffffff'} 
                  onChange={(e) => handleChange('fill', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
               />
            </div>
            <div className="flex items-center justify-between">
               <label className="text-sm text-gray-600">Stroke</label>
               <input 
                  type="color" 
                  value={data.stroke || '#000000'} 
                  onChange={(e) => handleChange('stroke', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
               />
            </div>
            <div className="space-y-1">
               <div className="flex justify-between">
                   <label className="text-sm text-gray-600">Opacity</label>
                   <span className="text-xs text-gray-400">{((data.opacity || 1) * 100).toFixed(0)}%</span>
               </div>
               <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={data.opacity || 1}
                  onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
               />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div>
           <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Text</h3>
           <textarea 
              className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              rows={2}
              value={data.label}
              onChange={(e) => handleChange('label', e.target.value)}
           />
           <div className="flex mt-2 space-x-1 border border-gray-200 rounded p-1 justify-center">
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleChange('fontWeight', data.fontWeight === 'bold' ? 'normal' : 'bold')}><Bold size={16} /></button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleChange('fontStyle', data.fontStyle === 'italic' ? 'normal' : 'italic')}><Italic size={16} /></button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleChange('textDecoration', data.textDecoration === 'underline' ? 'none' : 'underline')}><Underline size={16} /></button>
           </div>
           <div className="flex mt-2 space-x-1 border border-gray-200 rounded p-1 justify-center">
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleChange('textAlign', 'left')}><AlignLeft size={16} /></button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleChange('textAlign', 'center')}><AlignCenter size={16} /></button>
              <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleChange('textAlign', 'right')}><AlignRight size={16} /></button>
           </div>
        </div>

        {/* Arrange Section */}
        <div>
           <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Arrange</h3>
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">X</label>
                <input className="w-full border p-1 rounded text-sm text-gray-600" value={Math.round(node.position.x)} readOnly />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Y</label>
                <input className="w-full border p-1 rounded text-sm text-gray-600" value={Math.round(node.position.y)} readOnly />
              </div>
           </div>
           <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="border border-gray-200 p-2 rounded flex items-center justify-center text-xs hover:bg-gray-50 text-gray-600">
                  <BringToFront size={14} className="mr-1"/> Front
              </button>
              <button className="border border-gray-200 p-2 rounded flex items-center justify-center text-xs hover:bg-gray-50 text-gray-600">
                  <SendToBack size={14} className="mr-1"/> Back
              </button>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
