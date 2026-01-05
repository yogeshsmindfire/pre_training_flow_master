import React, { useState } from 'react';
import { Menu, Command, Layout, Download, FileJson, FileCode } from 'lucide-react';
import useStore from '../store/useStore';
import { downloadJSON, downloadXML } from '../utils/serialization';

const MenuItem = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="rounded-md px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100"
  >
    {label}
  </button>
);

const Header = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleExportJSON = () => {
    downloadJSON({ nodes, edges }, 'diagram.json');
  };

  const handleExportXML = () => {
    downloadXML({ nodes, edges }, 'diagram.xml');
  };

  return (
    <header className="relative z-20 flex h-14 items-center justify-between border-b border-border bg-white px-4 shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-xl font-bold tracking-tight text-blue-600">
          <div className="rounded border border-blue-100 bg-blue-50 p-1">
            <Layout className="h-5 w-5" />
          </div>
          <span className="text-gray-900">FlowMaster</span>
        </div>

        <div className="mx-2 h-6 w-px bg-gray-200"></div>

        <nav className="flex items-center space-x-1">
          <MenuItem label="File" />
          <MenuItem label="Edit" />
          <MenuItem label="View" />
          <MenuItem label="Arrange" />
          <MenuItem label="Help" />
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden items-center rounded-md border border-gray-200 bg-gray-50 p-0.5 md:flex">
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-white hover:text-blue-600 hover:shadow-sm"
            title="Export JSON"
          >
            <FileJson size={14} />
            <span>JSON</span>
          </button>
          <div className="mx-1 h-4 w-px bg-gray-300"></div>
          <button
            onClick={handleExportXML}
            className="flex items-center space-x-1 rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-white hover:text-blue-600 hover:shadow-sm"
            title="Export XML"
          >
            <FileCode size={14} />
            <span>XML</span>
          </button>
        </div>

        <button className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
