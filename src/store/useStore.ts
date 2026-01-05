import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  EdgeChange,
  NodeChange,
  Node,
  Edge,
  MarkerType,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { AppNode, AppEdge, NodeData } from '../types';

// Command Pattern Interfaces
interface Command {
  execute: () => void;
  undo: () => void;
}

interface HistoryState {
  past: Command[];
  future: Command[];
}

interface StoreState {
  nodes: AppNode[];
  edges: AppEdge[];
  
  // Selection State (handled mostly by React Flow, but we can track IDs if needed)
  selectedNodeIds: string[];

  // Actions
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  
  addNode: (node: AppNode) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  deleteEdge: (id: string) => void;
  
  // History Actions
  undo: () => void;
  redo: () => void;
  pushCommand: (command: Command) => void;
  
  // Internal History
  undoStack: Command[];
  redoStack: Command[];
}

const useStore = create<StoreState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeIds: [],
  
  // History Stacks (kept outside of reactive state to avoid re-renders on push? 
  // No, we want to know if canUndo is true. 
  // But putting complex objects in Zustand state is fine.)
  // Actually, for a pure Command pattern, let's keep it simple.
  // We will store the history in a ref-like interaction or just part of the store.
  
  past: [], // This approach requires extending the type, let's just use closure variables or external manager if we want "high perf", 
            // but for React "Store" integration, putting it in state is easiest for UI updates (enabling/disabling buttons).
            // I'll add `past` and `future` to the internal state implicitly or via a slice pattern.
            // For now, I'll implement a simple stack here.
  
  undoStack: [] as Command[],
  redoStack: [] as Command[],

  pushCommand: (command: Command) => {
    set((state) => {
       // command.execute(); // Usually the command is executed BEFORE pushing, or we push an already executed command.
       // The user interaction triggers the change, then we push the inverse/forward pair.
       return {
         // @ts-ignore
         undoStack: [...state.undoStack, command],
         // @ts-ignore
         redoStack: [],
       };
    });
  },

  undo: () => {
    set((state) => {
      // @ts-ignore
      const stack = state.undoStack;
      if (stack.length === 0) return {};
      
      const command = stack[stack.length - 1];
      command.undo();
      
      return {
        // @ts-ignore
        undoStack: stack.slice(0, -1),
        // @ts-ignore
        redoStack: [...state.redoStack, command],
      };
    });
  },

  redo: () => {
    set((state) => {
      // @ts-ignore
      const stack = state.redoStack;
      if (stack.length === 0) return {};
      
      const command = stack[stack.length - 1];
      command.execute();
      
      return {
        // @ts-ignore
        redoStack: stack.slice(0, -1),
        // @ts-ignore
        undoStack: [...state.undoStack, command],
      };
    });
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as AppNode[],
    });
    // Note: Tracking 'generic' changes for undo/redo in React Flow is tricky because 'position' changes happen on every mouse move.
    // robust undo for drag requires listening to 'onNodeDragStart' and 'onNodeDragStop'.
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as AppEdge[],
    });
  },

  onConnect: (connection: Connection) => {
    // Create a command for connecting
    const { nodes, edges } = get();
    const newEdge: AppEdge = { 
        id: uuidv4(), 
        source: connection.source || '',
        target: connection.target || '',
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: 'default', 
        style: { strokeWidth: 2, stroke: '#000000' },
        markerEnd: { type: MarkerType.ArrowClosed } 
    };

    const command: Command = {
        execute: () => {
            set((state) => ({ edges: addEdge(newEdge, state.edges) }));
        },
        undo: () => {
            set((state) => ({ edges: state.edges.filter((e) => e.id !== newEdge.id) }));
        }
    };

    command.execute();
    get().pushCommand(command);
  },

  addNode: (node: AppNode) => {
    const command: Command = {
        execute: () => set((state) => ({ nodes: state.nodes.concat(node) })),
        undo: () => set((state) => ({ nodes: state.nodes.filter((n) => n.id !== node.id) }))
    };
    command.execute();
    get().pushCommand(command);
  },

  updateNodeData: (id: string, data: Partial<NodeData>) => {
    const node = get().nodes.find((n) => n.id === id);
    if (!node) return;

    const oldData = { ...node.data };
    const newData = { ...node.data, ...data };

    const command: Command = {
        execute: () => {
            set((state) => ({
                nodes: state.nodes.map((n) => (n.id === id ? { ...n, data: newData } : n)),
            }));
        },
        undo: () => {
            set((state) => ({
                nodes: state.nodes.map((n) => (n.id === id ? { ...n, data: oldData } : n)),
            }));
        }
    };
    command.execute();
    get().pushCommand(command);
  },

  deleteEdge: (id: string) => {
    const edge = get().edges.find((e) => e.id === id);
    if (!edge) return;

    const command: Command = {
        execute: () => {
            set((state) => ({ edges: state.edges.filter((e) => e.id !== id) }));
        },
        undo: () => {
            set((state) => ({ edges: [...state.edges, edge] }));
        }
    };
    command.execute();
    get().pushCommand(command);
  }
}));

export default useStore;
