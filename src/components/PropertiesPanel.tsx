import React from 'react';
import useStore from '../store/useStore';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  BringToFront,
  SendToBack,
} from 'lucide-react';

const PropertiesPanel = () => {
  const nodes = useStore((state) => state.nodes);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const selectedNodes = nodes.filter((n) => n.selected);
  const deleteSelection = () => {
    /* TODO: Implement in store */
  };

  if (selectedNodes.length === 0) {
    return (
      <aside className="w-64 border-l border-border bg-white p-4">
        <div className="mt-10 text-center text-sm text-gray-400">Select an element to style</div>
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
    <aside className="flex h-full w-72 flex-col overflow-y-auto border-l border-border bg-white font-sans">
      <div className="border-b border-border bg-gray-50 p-4">
        <h2 className="text-sm font-semibold text-gray-700">Format</h2>
      </div>

      <div className="space-y-6 p-4">
        {/* Style Section */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Style
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Fill</label>
              <input
                type="color"
                value={data.fill || '#ffffff'}
                onChange={(e) => handleChange('fill', e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-gray-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Stroke</label>
              <input
                type="color"
                value={data.stroke || '#000000'}
                onChange={(e) => handleChange('stroke', e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-gray-300"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-sm text-gray-600">Opacity</label>
                <span className="text-xs text-gray-400">
                  {((data.opacity || 1) * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={data.opacity || 1}
                onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Text
          </h3>
          <textarea
            className="w-full rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
            value={data.label}
            onChange={(e) => handleChange('label', e.target.value)}
          />
          <div className="mt-2 flex justify-center space-x-1 rounded border border-gray-200 p-1">
            <button
              className="rounded p-1 hover:bg-gray-100"
              onClick={() =>
                handleChange('fontWeight', data.fontWeight === 'bold' ? 'normal' : 'bold')
              }
            >
              <Bold size={16} />
            </button>
            <button
              className="rounded p-1 hover:bg-gray-100"
              onClick={() =>
                handleChange('fontStyle', data.fontStyle === 'italic' ? 'normal' : 'italic')
              }
            >
              <Italic size={16} />
            </button>
            <button
              className="rounded p-1 hover:bg-gray-100"
              onClick={() =>
                handleChange(
                  'textDecoration',
                  data.textDecoration === 'underline' ? 'none' : 'underline',
                )
              }
            >
              <Underline size={16} />
            </button>
          </div>
          <div className="mt-2 flex justify-center space-x-1 rounded border border-gray-200 p-1">
            <button
              className="rounded p-1 hover:bg-gray-100"
              onClick={() => handleChange('textAlign', 'left')}
            >
              <AlignLeft size={16} />
            </button>
            <button
              className="rounded p-1 hover:bg-gray-100"
              onClick={() => handleChange('textAlign', 'center')}
            >
              <AlignCenter size={16} />
            </button>
            <button
              className="rounded p-1 hover:bg-gray-100"
              onClick={() => handleChange('textAlign', 'right')}
            >
              <AlignRight size={16} />
            </button>
          </div>
        </div>

        {/* Arrange Section */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Arrange
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">X</label>
              <input
                className="w-full rounded border p-1 text-sm text-gray-600"
                value={Math.round(node.position.x)}
                readOnly
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Y</label>
              <input
                className="w-full rounded border p-1 text-sm text-gray-600"
                value={Math.round(node.position.y)}
                readOnly
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center rounded border border-gray-200 p-2 text-xs text-gray-600 hover:bg-gray-50">
              <BringToFront size={14} className="mr-1" /> Front
            </button>
            <button className="flex items-center justify-center rounded border border-gray-200 p-2 text-xs text-gray-600 hover:bg-gray-50">
              <SendToBack size={14} className="mr-1" /> Back
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
