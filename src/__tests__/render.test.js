import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CaseStudy from '../pages/CaseStudy';
import Header from '../components/Header';

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

describe('header', () => {
  test('exposes a mobile menu toggle', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  test('links to the CV', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const cv = screen.getByRole('link', { name: /cv/i });
    expect(cv).toHaveAttribute('href', expect.stringContaining('Resume.pdf'));
  });
});

describe('hero', () => {
  test('shows location and the three primary links', () => {
    renderAt('/');
    expect(screen.getByText(/Based in Paris, France\. Open to relocation\./)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  test('does not name an employer', () => {
    renderAt('/');
    expect(screen.queryByText(/Relay ?X/i)).toBeNull();
  });
});

describe('experience section', () => {
  test('renders both entries', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: 'ORACLE' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PIF AI' })).toBeInTheDocument();
  });

  test('entries are not links — there is deliberately no deeper page', () => {
    renderAt('/');
    ['ORACLE', 'PIF AI'].forEach((name) => {
      const heading = screen.getByRole('heading', { name });
      const card = heading.closest('article');
      // The whole entry must contain no anchor and no call to action.
      expect(heading.closest('a')).toBeNull();
      expect(card.querySelector('a')).toBeNull();
      expect(card.textContent).not.toMatch(/read case study|read more/i);
    });
  });
});

describe('work section', () => {
  test('case studies link to their pages', () => {
    renderAt('/');
    const link = screen.getByRole('link', { name: /TelecomPlus/i });
    expect(link).toHaveAttribute('href', '/case-studies/telecomplus');
  });

  test('every original project is still listed', () => {
    renderAt('/');
    ['SportIQ', 'MoodSync', 'House Price Prediction', 'Diabetes Prediction',
     'Blended Learning Platform', 'Career Satisfaction Analysis',
     'Startup Investment Program', 'RAGenius'].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('the diagram legend explains the colour code', () => {
    renderAt('/');
    expect(screen.getByText(/Retrieval & vector store/i)).toBeInTheDocument();
    expect(screen.getByText(/Agents & LLM/i)).toBeInTheDocument();
  });
});
