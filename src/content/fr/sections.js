// French labels and captions for the navigation rail and the scene rail.
// Images are shared with the English bundle; only the words change.

import sceneHome from '../../assets/img/scene-home.jpg';
import sceneExperience from '../../assets/img/scene-experience.jpg';
import sceneWork from '../../assets/img/scene-work.jpg';
import sceneSkills from '../../assets/img/scene-skills.jpg';
import sceneAbout from '../../assets/img/scene-about.jpg';
import sceneCertifications from '../../assets/img/scene-certifications.jpg';
import sceneContact from '../../assets/img/scene-contact.jpg';

const sectionsFr = [
  { id: 'home',           label: 'Accueil',        caption: 'Des systèmes IA de production, construits de bout en bout.', scene: sceneHome },
  { id: 'experience',     label: 'Expérience',     caption: 'Veille réglementaire et IA documentaire en entreprise.',     scene: sceneExperience },
  { id: 'work',           label: 'Projets',        caption: 'Projets ouverts, avec architecture et résultats.',           scene: sceneWork },
  { id: 'skills',         label: 'Compétences',    caption: 'La stack derrière les systèmes.',                            scene: sceneSkills },
  { id: 'about',          label: 'À propos',       caption: 'Qui je suis et où j’ai étudié.',                             scene: sceneAbout },
  { id: 'certifications', label: 'Certifications', caption: 'Diplômes, certifications et résultats de hackathons.',       scene: sceneCertifications },
  { id: 'contact',        label: 'Contact',        caption: 'Ouvert aux opportunités. Parlons-en.',                       scene: sceneContact },
];

export default sectionsFr;
