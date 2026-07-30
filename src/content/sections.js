// Single source of truth for the homepage sections. Both the left navigation
// rail and the right scene rail read from this, so they can never disagree
// about what exists or what order it is in.

import sceneHome from '../assets/img/scene-home.jpg';
import sceneExperience from '../assets/img/scene-experience.jpg';
import sceneWork from '../assets/img/scene-work.jpg';
import sceneSkills from '../assets/img/scene-skills.jpg';
import sceneAbout from '../assets/img/scene-about.jpg';
import sceneCertifications from '../assets/img/scene-certifications.jpg';
import sceneContact from '../assets/img/scene-contact.jpg';

const sections = [
  { id: 'home',           label: 'Home',           caption: 'Production AI systems, built end to end.',        scene: sceneHome },
  { id: 'experience',     label: 'Experience',     caption: 'Regulatory intelligence and document AI at work.', scene: sceneExperience },
  { id: 'work',           label: 'Work',           caption: 'Open projects, with architecture and results.',    scene: sceneWork },
  { id: 'skills',         label: 'Skills',         caption: 'The stack behind the systems.',                    scene: sceneSkills },
  { id: 'about',          label: 'About',          caption: 'Who I am and where I studied.',                    scene: sceneAbout },
  { id: 'certifications', label: 'Certifications', caption: 'Credentials and hackathon results.',               scene: sceneCertifications },
  { id: 'contact',        label: 'Contact',        caption: 'Open to opportunities. Let’s talk.',               scene: sceneContact },
];

export default sections;
