import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../content/projects';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <main className="container section">
        <h1>Not found</h1>
        <p>That case study doesn’t exist.</p>
        <Link to="/">Back to the homepage</Link>
      </main>
    );
  }

  return (
    <main className="container section">
      <h1>{project.title}</h1>
      <p>{project.subtitle}</p>
    </main>
  );
}
