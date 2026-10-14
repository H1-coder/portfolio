import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero heading and every section', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /muhammad haris qureshi/i })).toBeInTheDocument();
  ['About', 'Skills', 'Projects', 'Experience', 'Contact'].forEach((section) => {
    expect(screen.getAllByRole('link', { name: section }).length).toBeGreaterThan(0);
  });
});
