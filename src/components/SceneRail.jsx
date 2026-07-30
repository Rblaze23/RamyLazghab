import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import './SceneRail.scss';

/**
 * Fixed right rail: the scene for the section in view, above a compact facts
 * card that stays on screen for the whole scroll.
 *
 * Every scene is rendered and stacked; only opacity changes. That gives a real
 * cross-fade instead of a flash of empty space, and the browser has already
 * decoded the next image before it is needed.
 *
 * The image is decorative and hidden from assistive technology. The facts card
 * is not: it carries real information, so it stays in the accessibility tree.
 * Everything in it appears elsewhere on the page too, so a screen-reader user
 * loses nothing.
 */
export default function SceneRail({ activeId }) {
  const { sections, site, ui } = useContent();
  const active = sections.find((s) => s.id === activeId) || sections[0];

  return (
    <aside className="scene-rail">
      <div className="scene-stack" aria-hidden="true">
        {sections.map((s) => (
          <img
            key={s.id}
            src={s.scene}
            alt=""
            className={s.id === activeId ? 'is-active' : ''}
            loading="lazy"
            width="620"
            height="800"
          />
        ))}
        <span className="scene-veil" />
        <span className="scene-caption">{active.caption}</span>
      </div>

      <div className="glance">
        <p className="glance-label"><i aria-hidden="true">{'//'}</i> {ui.atAGlance}</p>

        <dl>
          {site.glance.map((row) => (
            <div className="glance-row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="glance-certs">
          {site.certifications.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noreferrer">
              <span className="mark" aria-hidden="true">{c.mark}</span>
              {c.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
