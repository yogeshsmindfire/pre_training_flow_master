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
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Header Area */}
        <Header />

        {/* Quick Toolbar */}
        <Toolbar />

        {/* Main Workspace */}
        <div className="relative flex flex-1 overflow-hidden">
          {/* Left: Shape Library */}
          <Sidebar />

          {/* Center: Canvas */}
          <main className="relative h-full flex-1 bg-gray-50">
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
