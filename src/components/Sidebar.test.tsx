import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders correctly', () => {
    render(<Sidebar />);
    expect(screen.getByText('Shape Library')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('sets dataTransfer on drag start', () => {
    render(<Sidebar />);
    
    const draggable = screen.getByText('Rect').closest('div');
    
    const mockDataTransfer = {
      setData: jest.fn(),
      effectAllowed: ''
    };

    fireEvent.dragStart(draggable!, { dataTransfer: mockDataTransfer });

    expect(mockDataTransfer.setData).toHaveBeenCalledWith('application/reactflow', 'rectangle');
    expect(mockDataTransfer.effectAllowed).toBe('move');
  });
});
