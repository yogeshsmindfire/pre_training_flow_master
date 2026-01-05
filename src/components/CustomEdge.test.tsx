import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomEdge from './CustomEdge';
import useStore from '../store/useStore';
import { Position } from 'reactflow';

// Mock ReactFlow components/functions
jest.mock('reactflow', () => {
  const MockBaseEdge = () => <path data-testid="base-edge" />;
  const MockEdgeLabelRenderer = ({ children }: any) => <div>{children}</div>;
  
  return {
    __esModule: true,
    default: {
         BaseEdge: MockBaseEdge,
         EdgeLabelRenderer: MockEdgeLabelRenderer,
         getBezierPath: () => ['M0,0 C100,0 100,100 200,100', 100, 50],
         Position: { Top: 'top' }
    },
    BaseEdge: MockBaseEdge,
    EdgeLabelRenderer: MockEdgeLabelRenderer,
    getBezierPath: () => ['M0,0 C100,0 100,100 200,100', 100, 50],
    Position: { Top: 'top' }
  };
});

// Mock store
jest.mock('../store/useStore');

describe('CustomEdge', () => {
    const mockDeleteEdge = jest.fn();

    beforeEach(() => {
        (useStore as unknown as jest.Mock).mockImplementation((selector) => {
             return mockDeleteEdge;
        });
        jest.clearAllMocks();
    });

    const defaultProps = {
        id: 'e1',
        source: 's1',
        target: 't1',
        sourceX: 0,
        sourceY: 0,
        targetX: 200,
        targetY: 100,
        sourcePosition: Position.Top,
        targetPosition: Position.Top,
        style: {},
        markerEnd: 'arrow',
        markerStart: 'arrow',
        interactionWidth: 0,
        data: {},
        selected: false,
        animated: false,
        label: '',
        labelStyle: {},
        labelShowBg: false,
        labelBgStyle: {},
        labelBgPadding: [0, 0] as [number, number],
        labelBgBorderRadius: 0,
    };

    it('renders correctly', () => {
        render(<CustomEdge {...defaultProps} />);
        
        expect(screen.getByTestId('base-edge')).toBeInTheDocument();
        expect(screen.getByText('×')).toBeInTheDocument();
    });

    it('positions the label correctly', () => {
        // Since we mocked getBezierPath to return 100, 50 for label position
        // and mocked EdgeLabelRenderer to be a simple div
        // We can inspect the style of the div wrapping the button
        const { container } = render(<CustomEdge {...defaultProps} />);
        
        // The div inside EdgeLabelRenderer has the style
        // We find the div that contains the button
        const wrapperDiv = screen.getByText('×').closest('div');
        expect(wrapperDiv).toHaveStyle({
            transform: 'translate(-50%, -50%) translate(100px,50px)'
        });
    });

    it('calls deleteEdge when delete button is clicked', () => {
        render(<CustomEdge {...defaultProps} />);
        
        const deleteBtn = screen.getByLabelText('Delete edge');
        fireEvent.click(deleteBtn);

        expect(mockDeleteEdge).toHaveBeenCalledWith('e1');
    });
});
