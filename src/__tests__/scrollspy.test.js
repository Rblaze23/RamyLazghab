import { renderHook, act } from '@testing-library/react';
import useActiveSection from '../hooks/useActiveSection';

const IDS = ['home', 'experience', 'work', 'skills', 'about', 'certifications', 'contact'];

// Lays out fake sections at known offsets. Contact is deliberately short and
// last, which is the case that broke the previous implementation.
function layout(heights) {
  document.body.innerHTML = '';
  let top = 0;
  IDS.forEach((id, i) => {
    const el = document.createElement('section');
    el.id = id;
    const height = heights[i];
    const offset = top;
    el.getBoundingClientRect = () => ({
      top: offset - (window.scrollY || 0),
      bottom: offset + height - (window.scrollY || 0),
      height,
    });
    document.body.appendChild(el);
    top += height;
  });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value: top,
  });
  return top;
}

function scrollTo(y) {
  window.scrollY = y;
  act(() => { window.dispatchEvent(new Event('scroll')); });
}

beforeEach(() => {
  window.scrollY = 0;
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
  // Run rAF callbacks straight away so assertions do not need timers.
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(); return 1; });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

describe('useActiveSection', () => {
  test('starts on the first section', () => {
    layout([1000, 1000, 1000, 1000, 1000, 1000, 300]);
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('home');
  });

  test('follows the section under the marker line while scrolling', () => {
    layout([1000, 1000, 1000, 1000, 1000, 1000, 300]);
    const { result } = renderHook(() => useActiveSection(IDS));

    scrollTo(1000);
    expect(result.current).toBe('experience');

    scrollTo(3000);
    expect(result.current).toBe('skills');
  });

  test('the short final section wins at the bottom of the page', () => {
    // 6300 tall, 800 viewport. Contact is only 300 tall and sits last, so a
    // most-visible strategy would keep Certifications highlighted here.
    const total = layout([1000, 1000, 1000, 1000, 1000, 1000, 300]);
    const { result } = renderHook(() => useActiveSection(IDS));

    scrollTo(total - 800);
    expect(result.current).toBe('contact');
  });

  test('does nothing when disabled, so case-study pages keep the rail quiet', () => {
    layout([1000, 1000, 1000, 1000, 1000, 1000, 300]);
    const { result } = renderHook(() => useActiveSection(IDS, { enabled: false }));

    scrollTo(4000);
    expect(result.current).toBe('home');
  });
});
