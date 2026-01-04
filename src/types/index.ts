import { Node, Edge } from 'reactflow';

export type ShapeType = 'rectangle' | 'circle' | 'diamond' | 'triangle' | 'hexagon' | 'cylinder' | 'actor' | 'database' | 'process' | 'terminal' | 'input' | 'network';

export interface NodeData {
  label: string;
  type?: ShapeType;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
  rotation?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: 'left' | 'center' | 'right';
  labelStyle?: React.CSSProperties;
  // ... any other custom data
}

export type AppNode = Node<NodeData>;
export type AppEdge = Edge;

export interface AppState {
  nodes: AppNode[];
  edges: AppEdge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  addNode: (node: AppNode) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  updateNodeStyle: (id: string, style: React.CSSProperties) => void;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: AppEdge[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  copySelection: () => void;
  pasteSelection: () => void;
  deleteSelection: () => void;
}
