const site = {
  name: 'Ramy Lazghab',
  role: 'AI & Machine Learning Engineer',
  headline: 'I build end-to-end AI platforms: document intelligence, forecasting, multi-agent orchestration.',
  headlineAccent: 'document intelligence, forecasting, multi-agent orchestration.',
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
    'M.Sc. Data Science & Artificial Intelligence, Université Paris Dauphine — PSL (2024–2026). B.Sc. Computer Engineering (IoT), Faculty of Sciences of Tunis.',
  ],

  languages: 'English — Fluent (IELTS) · French — Professional',

  skills: [
    {
      group: 'AI / ML & Frameworks',
      items: ['LLMs', 'RAG', 'Multi-Agent Systems', 'Prompt Engineering', 'LangChain', 'LangGraph',
              'Hugging Face', 'PyTorch', 'TensorFlow', 'XGBoost', 'LightGBM'],
    },
    {
      group: 'LLM Platforms & MLOps',
      items: ['Anthropic API', 'OpenAI API', 'MCP', 'LangSmith', 'Docker', 'Git', 'MLflow'],
    },
    {
      group: 'Cloud & Data',
      items: ['GCP — Vertex AI', 'BigQuery', 'Cloud Run', 'Streamlit', 'Pandas', 'NumPy',
              'Spark', 'PostgreSQL', 'Neo4j', 'FAISS', 'Qdrant'],
    },
    {
      group: 'Programming',
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
    { result: '3rd place', title: 'RAISE Summit AI Hackathon', detail: 'Paris', url: null },
    { result: 'Winner', title: 'Hack for Good', detail: 'MoodSync — real-time assistant for psychologists', url: null },
    { result: 'Participant', title: 'EY Hack for Smart Insurance', detail: 'InsurAI', url: 'https://github.com/Rblaze23/InsurAI' },
    { result: 'Competitor', title: 'IEEE Xtreme 15.0 & 16.0', detail: '24-hour global programming competition', url: null },
  ],
};

export default site;
