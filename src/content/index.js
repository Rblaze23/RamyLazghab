// Language bundles. Adding a language means adding a folder and one entry
// here; no component needs to change.

import site from './site';
import projects from './projects';
import experience from './experience';
import sections from './sections';

import siteFr from './fr/site';
import projectsFr from './fr/projects';
import experienceFr from './fr/experience';
import sectionsFr from './fr/sections';

// Interface strings that are not part of the portfolio content itself.
const UI = {
  en: {
    allWork: '← All work',
    readCaseStudy: 'Read case study →',
    viewRepository: 'View repository ↗',
    nextCaseStudy: 'Next case study',
    downloadCv: 'Download CV',
    notFound: 'Not found',
    notFoundBody: 'That case study does not exist.',
    backHome: '← Back to the homepage',
    readCaseStudies: 'Read the case studies',
    moreProjects: 'More projects',
    selectedWork: 'Selected work',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    problem: 'Problem',
    architecture: 'Architecture',
    pipeline: 'Pipeline',
    technologies: 'Technologies',
    challenges: 'Challenges',
    results: 'Results',
    screenshots: 'Screenshots',
    lessons: 'Lessons learned',
    theProblem: 'The problem',
    whatIBuilt: 'What I built',
    certificationsLabel: 'Certifications',
    achievementsLabel: 'Hackathons & achievements',
    caseStudySuffix: 'case study',
    atAGlance: 'At a glance',
    liveDemo: 'Try the live demo ↗',
    legend: {
      doc: 'Source documents',
      store: 'Retrieval & vector store',
      agent: 'Agents & LLM',
      model: 'Models & forecasts',
      flow: 'Data flow',
    },
  },
  fr: {
    allWork: '← Tous les projets',
    readCaseStudy: 'Lire l’étude de cas →',
    viewRepository: 'Voir le dépôt ↗',
    nextCaseStudy: 'Étude de cas suivante',
    downloadCv: 'Télécharger le CV',
    notFound: 'Introuvable',
    notFoundBody: 'Cette étude de cas n’existe pas.',
    backHome: '← Retour à l’accueil',
    readCaseStudies: 'Lire les études de cas',
    moreProjects: 'Autres projets',
    selectedWork: 'Projets sélectionnés',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    problem: 'Problème',
    architecture: 'Architecture',
    pipeline: 'Pipeline',
    technologies: 'Technologies',
    challenges: 'Défis techniques',
    results: 'Résultats',
    screenshots: 'Captures d’écran',
    lessons: 'Ce que j’en retiens',
    theProblem: 'Le problème',
    whatIBuilt: 'Ce que j’ai construit',
    certificationsLabel: 'Certifications',
    achievementsLabel: 'Hackathons & distinctions',
    caseStudySuffix: 'étude de cas',
    atAGlance: 'En bref',
    liveDemo: 'Essayer la démo ↗',
    legend: {
      doc: 'Documents sources',
      store: 'Recherche & magasin vectoriel',
      agent: 'Agents & LLM',
      model: 'Modèles & prévisions',
      flow: 'Flux de données',
    },
  },
};

const bundle = (site_, projects_, experience_, sections_, ui) => ({
  site: site_,
  projects: projects_,
  experience: experience_,
  sections: sections_,
  ui,
  caseStudies: projects_.filter((p) => p.slug !== null),
  moreProjects: projects_.filter((p) => p.tier === 3),
  getProject: (slug) => projects_.find((p) => p.slug === slug && p.slug !== null),
});

export const CONTENT = {
  en: bundle(site, projects, experience, sections, UI.en),
  fr: bundle(siteFr, projectsFr, experienceFr, sectionsFr, UI.fr),
};

export const LANGS = ['en', 'fr'];
export const DEFAULT_LANG = 'en';
export const LANG_LABELS = { en: 'EN', fr: 'FR' };
