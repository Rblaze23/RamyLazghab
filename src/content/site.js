const site = {
  name: 'Ramy Lazghab',
  role: 'AI & Machine Learning Engineer',
  headline: 'I build production-grade LLM and agentic AI systems, turning unstructured documents and data into forecasts, decisions, and dashboards.',
  headlineAccent: 'turning unstructured documents and data into forecasts, decisions, and dashboards.',
  tagline: 'Currently building regulatory intelligence systems for the cosmetics industry.',
  location: 'Based in Paris, France. Open to relocation.',
  email: 'ramy.lazghab@dauphine.eu',

  links: {
    github: 'https://github.com/Rblaze23',
    linkedin: 'https://www.linkedin.com/in/ramy-lazghab-1464a8201/',
    cv: '/assets/Resume.pdf', // resolved against PUBLIC_URL at render time
  },

  about: [
    'I’m an AI & Machine Learning Engineer specialising in production systems built on LLMs, agentic AI and RAG. I design end-to-end platforms that combine document intelligence, forecasting and multi-agent orchestration for real business problems.',
    'I’m currently building regulatory intelligence systems for the cosmetics industry, where the work spans retrieval over large document corpora, autonomous agents gathering live signals, and machine learning models whose output has to be explainable to people without an ML background.',
    'M.Sc. Data Science & Artificial Intelligence, Université Paris Dauphine-PSL (2024 to 2026). B.Sc. Computer Engineering (IoT), Faculty of Sciences of Tunis.',
  ],

  languages: 'English: Fluent (IELTS) · French: Professional',

  // Every entry below is backed either by the CV or by a public repository:
  // classical ML from Diabetes-Diagnosis and House-Prices-Prediction, deep
  // learning from the Alzheimer's ensemble and MoodSync, reinforcement
  // learning from RL-A2C-Parallelized, PCA from Academic-Path-and-Career-
  // Satisfaction. Nothing here is padding.
  skills: [
    {
      group: 'Generative AI & LLMs',
      items: ['LLMs', 'RAG', 'Agentic AI', 'Multi-Agent Systems', 'Prompt Engineering',
              'LangChain', 'LangGraph', 'Hugging Face', 'MCP', 'LangSmith',
              'Anthropic API', 'OpenAI API', 'LLM-as-a-Judge evaluation'],
    },
    {
      group: 'Machine Learning',
      items: ['Supervised Learning', 'Unsupervised Learning', 'Logistic Regression',
              'Random Forest', 'Decision Trees', 'SVM', 'XGBoost', 'LightGBM',
              'Ensemble Methods', 'Feature Engineering', 'PCA', 'SHAP', 'scikit-learn'],
    },
    {
      group: 'Deep Learning & Reinforcement Learning',
      items: ['Neural Networks', 'CNNs', 'RNNs & LSTMs', 'Transformers', 'BERT',
              'PyTorch', 'TensorFlow', 'Computer Vision', 'NLP',
              'Reinforcement Learning', 'A2C', 'Policy Gradient Methods'],
    },
    {
      group: 'MLOps & Tooling',
      items: ['Docker', 'Git', 'MLflow', 'Langfuse', 'Streamlit', 'REST APIs'],
    },
    {
      group: 'Cloud & Data',
      items: ['Vertex AI (GCP)', 'BigQuery', 'BigQuery ML', 'Cloud Run', 'Pandas', 'NumPy',
              'Spark', 'PostgreSQL', 'Neo4j', 'FAISS', 'Qdrant'],
    },
    {
      group: 'Programming',
      items: ['Python', 'SQL', 'Java', 'JavaScript', 'C', 'R'],
    },
  ],

  // Compact facts for the right rail. Everything here is already stated
  // elsewhere on the page; this keeps it on screen while a visitor scrolls.
  glance: [
    { label: 'Education',    value: 'M.Sc. Data Science & AI, Paris Dauphine-PSL (2024 to 2026)' },
    { label: 'Based in',     value: 'Paris, France. Open to relocation.' },
    { label: 'Languages',    value: 'English fluent (IELTS) · French professional' },
    { label: 'Now',          value: 'Regulatory intelligence systems for the cosmetics industry' },
  ],

  certifications: [
    { name: 'LangChain Academy', issuer: 'LangChain', mark: 'LC',
      url: 'https://academy.langchain.com/certificates/nqrsewnhol' },
    { name: 'BigQuery ML', issuer: 'Google Cloud', mark: 'GC',
      url: 'https://www.credly.com/badges/9ec1dc8b-494f-42ee-a314-ba30b40342de/public_url' },
  ],

  achievements: [
    { result: '3rd place', title: 'RAISE Summit AI Hackathon', detail: 'Paris', url: null },
    { result: 'Winner', title: 'Hack for Good', detail: 'MoodSync, a real-time assistant for psychologists', url: null },
    { result: 'Participant', title: 'EY Hack for Smart Insurance', detail: 'InsurAI', url: 'https://github.com/Rblaze23/InsurAI' },
    { result: 'Competitor', title: 'IEEE Xtreme 15.0 & 16.0', detail: '24-hour global programming competition', url: null },
  ],
};

export default site;
