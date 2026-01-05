import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock subcomponents
jest.mock('./components/Header', () => () => <div data-testid="header" />);
jest.mock('./components/Toolbar', () => () => <div data-testid="toolbar" />);
jest.mock('./components/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('./components/Canvas', () => () => <div data-testid="canvas" />);
jest.mock('./components/PropertiesPanel', () => () => <div data-testid="properties-panel" />);
jest.mock('reactflow', () => ({
    ReactFlowProvider: ({ children }: any) => <div>{children}</div>,
}));

describe('App', () => {
    it('renders layout correctly', () => {
        render(<App />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('toolbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('canvas')).toBeInTheDocument();
        expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    });
});
