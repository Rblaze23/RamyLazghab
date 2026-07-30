import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import './SceneRail.scss';

/**
 * Fixed right rail showing the scene that belongs to the section in view.
 *
 * Every scene is rendered and stacked; only opacity changes. That gives a real
 * cross-fade instead of a flash of empty space, and it means the browser has
 * already decoded the next image before it is needed.
 *
 * Purely decorative — aria-hidden, empty alt. Nothing here is information a
 * visitor needs, so a screen reader should skip it entirely.
 */
export default function SceneRail({ activeId }) {
  const { sections } = useContent();
  const active = sections.find((s) => s.id === activeId) || sections[0];

  return (
    <aside className="scene-rail" aria-hidden="true">
      <div className="scene-stack">
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
    </aside>
  );
}
