import { act } from '@testing-library/react';
import useStore from './useStore';
import { v4 as uuidv4 } from 'uuid';
import { AppNode, AppEdge } from '../types';

// Mock reactflow utils - use actual for pure functions to ensure behavior matches
jest.mock('reactflow', () => {
  const actual = jest.requireActual('reactflow');
  return {
    ...actual,
    MarkerType: { ArrowClosed: 'arrowclosed' },
  };
});

// Mock UUID
jest.mock('uuid', () => {
  let count = 0;
  return {
    v4: jest.fn(() => `test-id-${++count}`),
  };
});

describe('useStore', () => {
  beforeEach(() => {
    // Reset store state
    act(() => {
        useStore.setState({
            nodes: [],
            edges: [],
            undoStack: [],
            redoStack: [],
            selectedNodeIds: []
        });
    });
    jest.clearAllMocks();
  });

  it('should add a node', () => {
    const node: AppNode = { 
        id: '1', 
        position: { x: 0, y: 0 }, 
        data: { label: 'Node 1' },
         type: 'shape',
         style: {} 
    };

    act(() => {
      useStore.getState().addNode(node);
    });

    expect(useStore.getState().nodes).toContainEqual(node);
    expect(useStore.getState().undoStack).toHaveLength(1);
  });

  it('should undo and redo adding a node', () => {
    const node: AppNode = { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'shape', style: {} };
    
    act(() => {
      useStore.getState().addNode(node);
    });
    expect(useStore.getState().nodes).toHaveLength(1);

    act(() => {
      useStore.getState().undo();
    });
    expect(useStore.getState().nodes).toHaveLength(0);
    expect(useStore.getState().redoStack).toHaveLength(1);

    act(() => {
      useStore.getState().redo();
    });
    expect(useStore.getState().nodes).toHaveLength(1);
    expect(useStore.getState().undoStack).toHaveLength(1);
  });

  it('should handle onConnect', () => {
    const connection = { source: '1', target: '2', sourceHandle: null, targetHandle: null };
    // We need existing nodes to make connection meaningful usually, but store just pushes edge
    
    act(() => {
      useStore.getState().onConnect(connection);
    });

    expect(useStore.getState().edges).toHaveLength(1);
    expect(useStore.getState().edges[0].source).toBe('1');
    expect(useStore.getState().edges[0].target).toBe('2');
  });

  it('should handle onConnect with null handles', () => {
    // @ts-ignore
    const connection = { source: null, target: null, sourceHandle: null, targetHandle: null };
    
    act(() => {
      useStore.getState().onConnect(connection);
    });

    const edges = useStore.getState().edges;
    // Expect 0 because addEdge validation likely fails for null handles
    expect(edges).toHaveLength(0);
  });

  it('should undo and redo connection', () => {
    const connection = { source: '1', target: '2', sourceHandle: null, targetHandle: null };
    act(() => {
        useStore.getState().onConnect(connection);
    });
    
    expect(useStore.getState().edges).toHaveLength(1);

    act(() => {
        useStore.getState().undo();
    });
    expect(useStore.getState().edges).toHaveLength(0);

    act(() => {
        useStore.getState().redo();
    });
    expect(useStore.getState().edges).toHaveLength(1);
  });

  it('should update node data', () => {
    const node: AppNode = { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1', fill: 'red' }, type: 'shape', style: {} };
    act(() => {
        useStore.getState().addNode(node);
    });

    act(() => {
        useStore.getState().updateNodeData('1', { fill: 'blue' });
    });

    const updatedNode = useStore.getState().nodes.find(n => n.id === '1');
    expect(updatedNode?.data.fill).toBe('blue');

    act(() => {
        useStore.getState().undo();
    });
     const originalNode = useStore.getState().nodes.find(n => n.id === '1');
    expect(originalNode?.data.fill).toBe('red');
  });

  it('should only update target node when multiple nodes exist', () => {
    const node1: AppNode = { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'shape', style: {} };
    const node2: AppNode = { id: '2', position: { x: 0, y: 0 }, data: { label: 'Node 2' }, type: 'shape', style: {} };
    
    act(() => {
        useStore.getState().addNode(node1);
        useStore.getState().addNode(node2);
    });

    act(() => {
        useStore.getState().updateNodeData('1', { label: 'Updated Node 1' });
    });

    const nodes = useStore.getState().nodes;
    expect(nodes.find(n => n.id === '1')?.data.label).toBe('Updated Node 1');
    expect(nodes.find(n => n.id === '2')?.data.label).toBe('Node 2');
  });

    it('should not update non-existent node', () => {
        act(() => {
            useStore.getState().updateNodeData('999', { fill: 'blue' });
        });
        // Should not crash or change anything
        expect(useStore.getState().undoStack).toHaveLength(0);
    });

  it('should delete edge', () => {
      // First add an edge manually or via action
      const edge: AppEdge = { id: 'e1', source: '1', target: '2' };
      act(() => {
          useStore.setState({ edges: [edge] });
      });

      act(() => {
        useStore.getState().deleteEdge('e1');
      });

      expect(useStore.getState().edges).toHaveLength(0);

      act(() => {
        useStore.getState().undo();
      });
      expect(useStore.getState().edges).toHaveLength(1);
  });

   it('should not delete non-existent edge', () => {
      act(() => {
        useStore.getState().deleteEdge('non-existent');
      });
      expect(useStore.getState().undoStack).toHaveLength(0);
  });

  it('should handle property changes (nodes/edges)', () => {
      // Create initial state
      const initialNode: AppNode = { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'shape', style: {} };
      act(() => {
          useStore.getState().addNode(initialNode);
      });

      // Simulate a change (e.g. selection change or drag)
      const change = { id: '1', type: 'select', selected: true } as any; // simplified change object
      
      act(() => {
          useStore.getState().onNodesChange([change]);
      });
      
      const updatedNode = useStore.getState().nodes.find(n => n.id === '1');
      expect(updatedNode?.selected).toBe(true);
  });
  
  it('undo/redo should handle empty stacks gracefully', () => {
      act(() => {
          useStore.getState().undo();
      });
      // Should result in no-op
      act(() => {
          useStore.getState().redo();
      });
       // Should result in no-op
  });

});
