import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShapeNode from './ShapeNode';
import useStore from '../store/useStore';
import { Position } from 'reactflow';

// Mock mocks
jest.mock('reactflow', () => ({
  Handle: () => <div data-testid="handle" />,
  Position: { Top: 'top', Right: 'right', Bottom: 'bottom', Left: 'left' },
  NodeResizer: () => <div data-testid="node-resizer" />,
}));

jest.mock('../store/useStore');

describe('ShapeNode', () => {
  const mockUpdateNodeData = jest.fn();

  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockImplementation((selector) => {
      // If the selector is passed, we might need to handle it.
      // But here we know useStore is used to get updateNodeData
      return mockUpdateNodeData;
    });
    jest.clearAllMocks();
  });

  const defaultProps = {
    id: 'node-1',
    data: { label: 'Test Label' },
    selected: false,
    zIndex: 1,
    isConnectable: true,
    xPos: 0,
    yPos: 0,
    dragging: false,
    type: 'shape'
  };

  it('renders label correctly', () => {
    render(<ShapeNode {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders different shapes', () => {
     const shapes = ['circle', 'diamond', 'triangle', 'database', 'rectangle'];
     
     shapes.forEach(type => {
         const { container } = render(<ShapeNode {...defaultProps} data={{ ...defaultProps.data, type: type as any }} />);
         // We can check if specific SVG elements exist
         if (type === 'circle') {
             expect(container.querySelector('circle')).toBeInTheDocument();
         } else if (type === 'rectangle') {
              expect(container.querySelector('rect')).toBeInTheDocument();
         } else if (type === 'database') {
             expect(container.querySelector('g')).toBeInTheDocument();
         } else {
             expect(container.querySelector('polygon')).toBeInTheDocument();
         }
     });
  });

  it('enters edit mode on double click', () => {
    render(<ShapeNode {...defaultProps} />);
    
    // Double click the container
    const container = screen.getByText('Test Label').closest('div');
    fireEvent.doubleClick(container!);
    
    // Textarea should appear
    const textarea = screen.getByDisplayValue('Test Label');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('updates label on blur', () => {
    render(<ShapeNode {...defaultProps} />);
    
    fireEvent.doubleClick(screen.getByText('Test Label').closest('div')!);
    
    const textarea = screen.getByDisplayValue('Test Label');
    fireEvent.change(textarea, { target: { value: 'New Label' } });
    fireEvent.blur(textarea);
    
    expect(mockUpdateNodeData).toHaveBeenCalledWith('node-1', { label: 'New Label' });
  });

  it('updates label on Enter key', () => {
    render(<ShapeNode {...defaultProps} />);
    
    fireEvent.doubleClick(screen.getByText('Test Label').closest('div')!);
    
    const textarea = screen.getByDisplayValue('Test Label');
    fireEvent.change(textarea, { target: { value: 'New Label' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    expect(mockUpdateNodeData).toHaveBeenCalledWith('node-1', { label: 'New Label' });
  });

  it('does not update on Shift+Enter', () => {
    render(<ShapeNode {...defaultProps} />);
    
    fireEvent.doubleClick(screen.getByText('Test Label').closest('div')!);
    
    const textarea = screen.getByDisplayValue('Test Label');
    fireEvent.change(textarea, { target: { value: 'New Label' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    
    expect(mockUpdateNodeData).not.toHaveBeenCalled();
    // Blur to cleanup
    fireEvent.blur(textarea);
  });
  
  it('updates internal state when prop label changes', () => {
      const { rerender } = render(<ShapeNode {...defaultProps} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();

      rerender(<ShapeNode {...defaultProps} data={{ label: 'Updated Label' }} />);
      expect(screen.getByText('Updated Label')).toBeInTheDocument();
  });
});
