import React, { useEffect, useRef, useState } from 'react';
import './SectionHeading.scss';

/**
 * A section label with a decorative 3D avatar beside it.
 *
 * The avatar is presentational only: it carries empty alt text and its wrapper
 * is aria-hidden, so screen readers announce the label and nothing else.
 *
 * The reveal animation is an enhancement, never a requirement. The heading is
 * fully visible in its base state and JS only adds a class that replays a rise;
 * if the observer never runs, the content still shows.
 */
export default function SectionHeading({ avatar, label }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`section-head ${seen ? 'is-seen' : ''}`} ref={ref}>
      {avatar && (
        <span className="section-avatar" aria-hidden="true">
          <img src={avatar} alt="" width="56" height="56" loading="lazy" />
        </span>
      )}
      <p className="section-label"><i>{'//'}</i> {label}</p>
    </div>
  );
}
