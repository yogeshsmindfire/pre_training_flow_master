import React, { useState } from 'react';
import { Menu, Command, Layout, Download, FileJson, FileCode } from 'lucide-react';
import useStore from '../store/useStore';
import { downloadJSON, downloadXML } from '../utils/serialization';

const MenuItem = ({ label, onClick }: { label: string, onClick?: () => void }) => (
  <button onClick={onClick} className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
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
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 shadow-sm z-20 relative">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl tracking-tight">
          <div className="p-1 bg-blue-50 rounded border border-blue-100">
             <Layout className="w-5 h-5" />
          </div>
          <span className="text-gray-900">FlowMaster</span>
        </div>
        
        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        <nav className="flex items-center space-x-1">
           <MenuItem label="File" />
           <MenuItem label="Edit" />
           <MenuItem label="View" />
           <MenuItem label="Arrange" />
           <MenuItem label="Help" />
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden md:flex items-center bg-gray-50 rounded-md p-0.5 border border-gray-200">
            <button 
                onClick={handleExportJSON}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm rounded-md transition-all" 
                title="Export JSON"
            >
                <FileJson size={14} />
                <span>JSON</span>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button 
                onClick={handleExportXML}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm rounded-md transition-all" 
                title="Export XML"
            >
                <FileCode size={14} />
                <span>XML</span>
            </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
