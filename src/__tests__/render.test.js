import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CaseStudy from '../pages/CaseStudy';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>
  );

describe('routing', () => {
  test('home renders the headline', () => {
    renderAt('/');
    expect(screen.getByText(/end-to-end AI platforms/i)).toBeInTheDocument();
  });

  test('a known case study renders its title', () => {
    renderAt('/case-studies/telecomplus');
    expect(screen.getByRole('heading', { name: /TelecomPlus/i, level: 1 })).toBeInTheDocument();
  });

  test('confidential work has no case-study page', () => {
    renderAt('/case-studies/oracle');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  test('an unknown slug does not crash', () => {
    renderAt('/case-studies/does-not-exist');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
