import { render, screen, within } from '@testing-library/react';
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
    expect(screen.getByText(/production-grade LLM and agentic AI systems/i)).toBeInTheDocument();
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

// Several strings legitimately appear more than once on the full page
// (GitHub in the hero and the contact block, LangGraph in skills and on a
// project card). Scope assertions to the section under test.
const section = (id) => within(document.getElementById(id));

describe('hero', () => {
  test('shows location and the three primary links', () => {
    renderAt('/');
    expect(screen.getByText(/Based in Paris, France\. Open to relocation\./)).toBeInTheDocument();
    const hero = section('home');
    expect(hero.getByRole('link', { name: /^GitHub$/ })).toBeInTheDocument();
    expect(hero.getByRole('link', { name: /^LinkedIn$/ })).toBeInTheDocument();
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

describe('case study page', () => {
  test('tier 1 renders every deep section', () => {
    renderAt('/case-studies/telecomplus');
    ['Problem', 'Architecture', 'Pipeline', 'Technologies', 'Challenges', 'Results', 'Lessons learned']
      .forEach((h) =>
        expect(screen.getByRole('heading', { name: new RegExp(`^${h}$`, 'i') })).toBeInTheDocument()
      );
  });

  test('tier 2 omits pipeline and challenges rather than showing empty sections', () => {
    renderAt('/case-studies/ragenius');
    expect(screen.queryByRole('heading', { name: /^Pipeline$/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /^Challenges$/i })).toBeNull();
    expect(screen.getByRole('heading', { name: /^Results$/i })).toBeInTheDocument();
  });

  test('no screenshot section when there are no images', () => {
    renderAt('/case-studies/telecomplus');
    expect(screen.queryByRole('heading', { name: /screenshot/i })).toBeNull();
    expect(screen.queryByText(/TODO/i)).toBeNull();
  });

  test('a project without a repo shows no repo link', () => {
    renderAt('/case-studies/alzheimers');
    expect(screen.queryByRole('link', { name: /view repository/i })).toBeNull();
  });
});

describe('remaining sections', () => {
  test('skills show the CV positioning keywords the old site was missing', () => {
    renderAt('/');
    const skills = section('skills');
    ['LangGraph', 'Qdrant', 'MCP', 'MLflow', 'LightGBM', 'Vertex AI (GCP)',
     'Random Forest', 'Neural Networks', 'Reinforcement Learning'].forEach((kw) =>
      expect(skills.getByText(kw)).toBeInTheDocument()
    );
  });

  test('certifications link to the real credentials', () => {
    renderAt('/');
    const certs = section('certifications');
    expect(certs.getByRole('link', { name: /LangChain Academy/i }))
      .toHaveAttribute('href', 'https://academy.langchain.com/certificates/nqrsewnhol');
    expect(certs.getByRole('link', { name: /BigQuery ML/i }))
      .toHaveAttribute('href', expect.stringContaining('credly.com/badges/9ec1dc8b'));
  });

  test('achievements are listed without claiming an unearned placement', () => {
    renderAt('/');
    const certs = section('certifications');
    expect(certs.getByText(/RAISE Summit AI Hackathon/i)).toBeInTheDocument();
    expect(certs.getByText(/IEEE Xtreme 15\.0 & 16\.0/i)).toBeInTheDocument();
    // EY is listed as participation only — no placement is claimed for it.
    const ey = certs.getByText(/EY Hack for Smart Insurance/i).closest('li');
    expect(ey.querySelector('.badge').textContent).toBe('Participant');
  });

  test('contact email matches the displayed address', () => {
    renderAt('/');
    const mail = section('contact').getByRole('link', { name: /ramy\.lazghab@dauphine\.eu/i });
    expect(mail).toHaveAttribute('href', 'mailto:ramy.lazghab@dauphine.eu');
  });
});

describe('section avatars', () => {
  test('each avatar-bearing section renders one decorative avatar', () => {
    renderAt('/');
    ['experience', 'work', 'skills', 'about', 'contact'].forEach((id) => {
      const imgs = section(id).getAllByRole('presentation', { hidden: true });
      expect(imgs.length).toBeGreaterThan(0);
    });
  });

  test('avatars are decorative, so they carry empty alt and are hidden from AT', () => {
    renderAt('/');
    document.querySelectorAll('.section-avatar img').forEach((img) => {
      expect(img.getAttribute('alt')).toBe('');
      expect(img.closest('.section-avatar').getAttribute('aria-hidden')).toBe('true');
    });
  });

  test('every section still shows its text label next to the avatar', () => {
    renderAt('/');
    ['Experience', 'Selected work', 'Skills', 'About', 'Contact'].forEach((label) => {
      expect(screen.getAllByText(new RegExp(`^${label}$`, 'i')).length).toBeGreaterThan(0);
    });
  });
});
