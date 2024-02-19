import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Data Grid Example text', () => {
  render(<App />);
  const textElement = screen.getByText(/Data Grid Example/i);
  expect(textElement).toBeInTheDocument();
});
