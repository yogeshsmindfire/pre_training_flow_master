// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Polyfill TextEncoder/Decoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Menu: () => 'Menu',
  Command: () => 'Command',
  Layout: () => 'Layout',
  Download: () => 'Download',
  FileJson: () => 'FileJson',
  FileCode: () => 'FileCode',
  Square: () => 'Square',
  Circle: () => 'Circle',
  Triangle: () => 'Triangle',
  Diamond: () => 'Diamond',
  Database: () => 'Database',
  Type: () => 'Type',
  Network: () => 'Network',
  Bold: () => 'Bold',
  Italic: () => 'Italic',
  Underline: () => 'Underline',
  AlignLeft: () => 'AlignLeft',
  AlignCenter: () => 'AlignCenter',
  AlignRight: () => 'AlignRight',
  Trash2: () => 'Trash2',
  BringToFront: () => 'BringToFront',
  SendToBack: () => 'SendToBack',
  Undo: () => 'Undo',
  Redo: () => 'Redo',
  ZoomIn: () => 'ZoomIn',
  ZoomOut: () => 'ZoomOut',
}));

// Mock UUID to avoid ESM syntax errors in Jest
jest.mock('uuid', () => ({
  v4: () => 'test-id',
}));
