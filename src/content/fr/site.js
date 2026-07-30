// French translation of src/content/site.js.
// Same shape, same keys. Technology names stay in English because that is how
// they are written in French job listings too.

const siteFr = {
  name: 'Ramy Lazghab',
  role: 'Ingénieur IA & Machine Learning',
  headline: 'Je construis des plateformes IA de bout en bout : intelligence documentaire, prévision, orchestration multi-agents.',
  headlineAccent: 'intelligence documentaire, prévision, orchestration multi-agents.',
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

  languages: 'Anglais : courant (IELTS) · Français : professionnel',

  skills: [
    {
      group: 'IA générative & LLM',
      items: ['LLMs', 'RAG', 'IA agentique', 'Systèmes multi-agents', 'Prompt Engineering',
              'LangChain', 'LangGraph', 'Hugging Face', 'MCP', 'LangSmith',
              'Anthropic API', 'OpenAI API', 'Évaluation LLM-as-a-Judge'],
    },
    {
      group: 'Machine Learning',
      items: ['Apprentissage supervisé', 'Apprentissage non supervisé', 'Régression logistique',
              'Random Forest', 'Arbres de décision', 'SVM', 'XGBoost', 'LightGBM',
              'Méthodes d’ensemble', 'Feature Engineering', 'ACP', 'SHAP', 'scikit-learn'],
    },
    {
      group: 'Deep Learning & apprentissage par renforcement',
      items: ['Réseaux de neurones', 'CNN', 'RNN & LSTM', 'Transformers', 'BERT',
              'PyTorch', 'TensorFlow', 'Vision par ordinateur', 'NLP',
              'Apprentissage par renforcement', 'A2C', 'Méthodes de gradient de politique'],
    },
    {
      group: 'MLOps & outils',
      items: ['Docker', 'Git', 'MLflow', 'Langfuse', 'Streamlit', 'API REST'],
    },
    {
      group: 'Cloud & données',
      items: ['Vertex AI (GCP)', 'BigQuery', 'BigQuery ML', 'Cloud Run', 'Pandas', 'NumPy',
              'Spark', 'PostgreSQL', 'Neo4j', 'FAISS', 'Qdrant'],
    },
    {
      group: 'Programmation',
      items: ['Python', 'SQL', 'Java', 'JavaScript', 'C', 'R'],
    },
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
