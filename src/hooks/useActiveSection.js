import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view.
 *
 * Returns the first section id, not null, as its initial value — so the rails
 * always render something sensible even if IntersectionObserver is missing or
 * never fires. Nothing in the UI depends on JS to become visible.
 */
export default function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return undefined;

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    // Track ratios for every observed section and pick the most visible one,
    // which behaves better than "first intersecting" on short sections.
    const ratios = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = null;
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) { bestRatio = r; best = id; }
        });
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1], rootMargin: '-72px 0px -35% 0px' }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [ids, enabled]);

  return active;
}
