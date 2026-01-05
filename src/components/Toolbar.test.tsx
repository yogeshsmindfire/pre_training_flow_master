import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from './Toolbar';
import useStore from '../store/useStore';
import { useReactFlow } from 'reactflow';

jest.mock('../store/useStore');
jest.mock('reactflow');

describe('Toolbar', () => {
    const mockUndo = jest.fn();
    const mockRedo = jest.fn();
    const mockZoomIn = jest.fn();
    const mockZoomOut = jest.fn();

    beforeEach(() => {
        (useReactFlow as jest.Mock).mockReturnValue({
            zoomIn: mockZoomIn,
            zoomOut: mockZoomOut
        });
        (useStore as unknown as jest.Mock).mockImplementation((selector) => {
            const state = { undo: mockUndo, redo: mockRedo };
            return selector(state);
        });
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<Toolbar />);
        expect(screen.getByTitle('Undo')).toBeInTheDocument();
        expect(screen.getByTitle('Redo')).toBeInTheDocument();
        expect(screen.getByTitle('Zoom In')).toBeInTheDocument();
        expect(screen.getByTitle('Zoom Out')).toBeInTheDocument();
    });

    it('undoes on click', () => {
        render(<Toolbar />);
        fireEvent.click(screen.getByTitle('Undo'));
        expect(mockUndo).toHaveBeenCalled();
    });

    it('redoes on click', () => {
         render(<Toolbar />);
        fireEvent.click(screen.getByTitle('Redo'));
        expect(mockRedo).toHaveBeenCalled();
    });

    it('zooms in on click', () => {
         render(<Toolbar />);
        fireEvent.click(screen.getByTitle('Zoom In'));
        expect(mockZoomIn).toHaveBeenCalled();
    });

    it('zooms out on click', () => {
         render(<Toolbar />);
        fireEvent.click(screen.getByTitle('Zoom Out'));
        expect(mockZoomOut).toHaveBeenCalled();
    });
});
