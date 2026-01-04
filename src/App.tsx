import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import './index.css';

function App() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen w-screen bg-background overflow-hidden text-foreground">
        
        {/* Header Area */}
        <Header />
        
        {/* Quick Toolbar */}
        <Toolbar />
        
        {/* Main Workspace */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Left: Shape Library */}
          <Sidebar />

          {/* Center: Canvas */}
          <main className="flex-1 relative bg-gray-50 h-full">
             <Canvas />
          </main>

          {/* Right: Format Panel */}
          <PropertiesPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
