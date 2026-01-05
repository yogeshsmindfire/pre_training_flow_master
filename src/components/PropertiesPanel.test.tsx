import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertiesPanel from './PropertiesPanel';
import useStore from '../store/useStore';

jest.mock('../store/useStore');

describe('PropertiesPanel', () => {
    const mockUpdateNodeData = jest.fn();
    const mockNodes = [
        {
            id: '1',
            type: 'shape',
            position: { x: 100, y: 100 },
            data: { 
                label: 'Test Node',
                fill: '#ffffff',
                stroke: '#000000',
                opacity: 1,
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
                textAlign: 'center'
            },
            selected: true 
        }
    ];

    beforeEach(() => {
        // Default implementation: selection exists
        (useStore as unknown as jest.Mock).mockImplementation((selector) => {
             if (selector.toString().includes('nodes')) return mockNodes;
             if (selector.toString().includes('updateNodeData')) return mockUpdateNodeData;
             return [];
        });
        jest.clearAllMocks();
    });

    it('renders empty state when no node is selected', () => {
         (useStore as unknown as jest.Mock).mockImplementation((selector) => {
             if (selector.toString().includes('nodes')) return []; // No nodes
             return mockUpdateNodeData;
        });

        render(<PropertiesPanel />);
        expect(screen.getByText('Select an element to style')).toBeInTheDocument();
    });

    it('renders controls when node is selected', () => {
        render(<PropertiesPanel />);
        expect(screen.getByText('Format')).toBeInTheDocument();
        expect(screen.getByText('Fill')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Node')).toBeInTheDocument();
    });

    it('updates fill color', () => {
        render(<PropertiesPanel />);
        const colorInput = screen.getByDisplayValue('#ffffff');
        fireEvent.change(colorInput, { target: { value: '#ff0000' } });
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { fill: '#ff0000' });
    });

     it('updates stroke color', () => {
        render(<PropertiesPanel />);
        const colorInput = screen.getByDisplayValue('#000000');
        fireEvent.change(colorInput, { target: { value: '#00ff00' } });
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { stroke: '#00ff00' });
    });

    it('updates opacity', () => {
        render(<PropertiesPanel />);
        // Find range input
        // Using getByLabelText requires label to be associated, here we might rely on type="range" if unique or close proximity
        const rangeInput = screen.getByRole('slider'); 
        fireEvent.change(rangeInput, { target: { value: '0.5' } });
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { opacity: 0.5 });
    });

    it('updates label text', () => {
        render(<PropertiesPanel />);
        const textarea = screen.getByDisplayValue('Test Node');
        fireEvent.change(textarea, { target: { value: 'New Check' } });
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { label: 'New Check' });
    });

    it('toggles font weight', () => {
        render(<PropertiesPanel />);
        // Find bold button. usually icons don't have text. relying on lucide icons.
        // We can look for buttons. The first group of buttons is B, I, U
        const buttons = screen.getAllByRole('button');
        // Filter those in the text section
        // Or simple hack: Bold button is the first button in the panel logic? 
        // Let's assume order: Bold, Italic, Underline
        const boldBtn = buttons.find(b => b.innerHTML.includes('polyline')); // Lucide icons usually employ polyline or path
        // Better: add aria-labels in source or try to select by svg content locally? 
        // Lucide icons: Bold usually has paths.
        // Since we didn't mock lucide-react with specific output, it renders real SVG.
        // Let's just click the first button in the B/I/U group.
        
        // Let's update PropertyPanel to have accessible labels for robust testing or just assume indexes.
        // Index 0: Bold, 1: Italic, 2: Underline
        // Index 3,4,5: Align Left, Center, Right
        // Index 6,7: Front, Back
        
        fireEvent.click(buttons[0]);
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { fontWeight: 'bold' });
    });

    it('toggles font style', () => {
        render(<PropertiesPanel />);
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]);
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { fontStyle: 'italic' });
    });

    it('toggles text decoration', () => {
        render(<PropertiesPanel />);
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[2]);
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { textDecoration: 'underline' });
    });

    it('sets text alignment', () => {
        render(<PropertiesPanel />);
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[3]); // Left
        expect(mockUpdateNodeData).toHaveBeenCalledWith('1', { textAlign: 'left' });
    });
});
