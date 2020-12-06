import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cat facts title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Cat Facts/i);
  expect(linkElement).toBeInTheDocument();
});
