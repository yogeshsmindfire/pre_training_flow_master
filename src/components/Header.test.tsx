import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { downloadJSON, downloadXML } from '../utils/serialization';
import useStore from '../store/useStore';

jest.mock('../utils/serialization');
jest.mock('../store/useStore');

describe('Header', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockImplementation(() => {
       return []; // nodes/edges
    });
  });

  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByText('FlowMaster')).toBeInTheDocument();
    expect(screen.getByText('File')).toBeInTheDocument();
  });

  it('calls downloadJSON when JSON button clicked', () => {
    render(<Header />);
    const jsonBtn = screen.getByTitle('Export JSON');
    fireEvent.click(jsonBtn);
    expect(downloadJSON).toHaveBeenCalled();
  });

  it('calls downloadXML when XML button clicked', () => {
    render(<Header />);
    const xmlBtn = screen.getByTitle('Export XML');
    fireEvent.click(xmlBtn);
    expect(downloadXML).toHaveBeenCalled();
  });
});
