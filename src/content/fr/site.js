// French translation of src/content/site.js.
// Same shape, same keys. Technology names stay in English because that is how
// they are written in French job listings too.

const siteFr = {
  name: 'Ramy Lazghab',
  role: 'Ingénieur IA & Machine Learning',
  headline: 'Je construis des systèmes LLM et d’IA agentique prêts pour la production, qui transforment des données éparses en décisions.',
  headlineAccent: 'qui transforment des données éparses en décisions.',
  tagline: 'Actuellement, je développe des systèmes de veille réglementaire pour l’industrie cosmétique.',
  location: 'Basé à Paris, France. Ouvert à la mobilité.',
  email: 'ramy.lazghab@dauphine.eu',

  links: {
    github: 'https://github.com/Rblaze23',
    linkedin: 'https://www.linkedin.com/in/ramy-lazghab-1464a8201/',
    cv: '/assets/Resume.pdf',
  },

  about: [
    'Je suis ingénieur IA & Machine Learning, spécialisé dans les systèmes de production fondés sur les LLM, l’IA agentique et le RAG. Je conçois des plateformes de bout en bout qui associent intelligence documentaire, prévision et orchestration multi-agents pour répondre à de vrais besoins métier.',
    'Je développe actuellement des systèmes de veille réglementaire pour l’industrie cosmétique. Le travail couvre la recherche documentaire sur de larges corpus, des agents autonomes qui collectent des signaux en continu, et des modèles de machine learning dont les résultats doivent rester compréhensibles par des spécialistes qui ne sont pas data scientists.',
    'M2 Science des Données & Intelligence Artificielle, Université Paris Dauphine-PSL (2024 à 2026). Licence en Génie Informatique (IoT), Faculté des Sciences de Tunis.',
  ],

  languages: 'Anglais : courant · Français : professionnel',

  skills: [
    {
      group: 'IA générative & LLM',
      items: ['LLMs', 'RAG', 'IA agentique', 'Systèmes multi-agents', 'LangChain', 'LangGraph',
              'MCP', 'LangSmith', 'Anthropic API', 'OpenAI API', 'Évaluation LLM-as-a-Judge'],
    },
    {
      group: 'Machine Learning',
      items: ['Régression logistique', 'Random Forest', 'Arbres de décision', 'SVM',
              'XGBoost', 'LightGBM', 'Feature Engineering', 'ACP', 'SHAP', 'scikit-learn'],
    },
    {
      group: 'Deep Learning & apprentissage par renforcement',
      items: ['Réseaux de neurones', 'CNN', 'Transformers', 'BERT', 'PyTorch', 'TensorFlow',
              'Hugging Face', 'Apprentissage par renforcement', 'A2C'],
    },
    {
      group: 'MLOps & outils',
      items: ['Docker', 'Git', 'MLflow', 'Langfuse', 'Streamlit', 'API REST'],
    },
    {
      group: 'Cloud & données',
      items: ['Vertex AI (GCP)', 'BigQuery ML', 'Cloud Run', 'Spark',
              'PostgreSQL', 'Neo4j', 'FAISS', 'Qdrant'],
    },
    {
      group: 'Programmation',
      items: ['Python', 'SQL', 'Java', 'JavaScript', 'C', 'R'],
    },
  ],

  // Faits compacts pour la colonne de droite. Tout y est déjà dit ailleurs sur
  // la page ; cela garde l’essentiel à l’écran pendant la lecture.
  glance: [
    { label: 'Formation',    value: 'M2 Science des Données & IA, Paris Dauphine-PSL (2024 à 2026)' },
    { label: 'Basé à',       value: 'Paris, France. Ouvert à la mobilité.' },
    { label: 'Langues',      value: 'Anglais courant · Français professionnel' },
    { label: 'En ce moment', value: 'Systèmes de veille réglementaire pour l’industrie cosmétique' },
  ],

  certifications: [
    { name: 'LangChain Academy', issuer: 'LangChain', mark: 'LC',
      url: 'https://academy.langchain.com/certificates/nqrsewnhol' },
    { name: 'BigQuery ML', issuer: 'Google Cloud', mark: 'GC',
      url: 'https://www.credly.com/badges/9ec1dc8b-494f-42ee-a314-ba30b40342de/public_url' },
  ],

  achievements: [
    { result: '3e place', title: 'RAISE Summit AI Hackathon', detail: 'Paris', url: null },
    { result: 'Lauréat', title: 'Hack for Good', detail: 'MoodSync, un assistant temps réel pour psychologues', url: null },
    { result: 'Participant', title: 'EY Hack for Smart Insurance', detail: 'InsurAI', url: 'https://github.com/Rblaze23/InsurAI' },
    { result: 'Compétiteur', title: 'IEEE Xtreme 15.0 & 16.0', detail: 'Concours mondial de programmation de 24 heures', url: null },
  ],
};

export default siteFr;
