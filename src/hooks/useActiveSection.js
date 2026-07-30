import { useEffect, useState } from 'react';

// Where the "you are here" line sits, measured from the top of the viewport.
const MARKER_OFFSET = 120;

/**
 * Tracks which section is currently in view.
 *
 * Uses a threshold line rather than "whichever section is most visible". The
 * visibility approach breaks on the last section: Contact is short and sits at
 * the end, so once you reach the bottom of the page the much taller
 * Certifications block still covers more of the screen and stays highlighted.
 * Contact could never become active.
 *
 * Instead: the active section is the last one whose top has crossed a line near
 * the top of the viewport, with an explicit case for reaching the bottom of the
 * page, where the final section wins outright no matter how short it is.
 *
 * Returns the first id, not null, so the rails always render something sensible
 * even if this never runs.
 */
export default function useActiveSection(ids, { enabled = true } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    // `queued` is set before requesting the frame, not after. Assigning the
    // frame id afterwards would leave the guard stuck on if the callback ever
    // ran synchronously, and every later scroll would be silently ignored.
    let queued = false;
    let frame = null;

    const compute = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of the page: the last section is what the visitor is looking at,
      // however little vertical space it happens to occupy.
      if (scrollY + viewport >= docHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }

      const line = scrollY + MARKER_OFFSET;
      let current = ids[0];

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= line) current = id;
      });

      setActive(current);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = window.requestAnimationFrame(() => {
        queued = false;
        compute();
      });
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, enabled]);

  return active;
}
