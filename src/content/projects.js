// Open projects. Unlike src/content/experience.js, detail is safe here —
// every one of these has a public repository.

const projects = [
  {
    slug: 'telecomplus',
    tier: 1,
    title: 'TelecomPlus',
    subtitle: 'Multi-agent customer support',
    context: 'Academic project',
    summary:
      'Multi-agent customer support combining document retrieval and SQL routing, with LLM-as-a-Judge evaluation and full run tracking.',
    problem:
      'Customer support questions draw on two incompatible kinds of knowledge: unstructured documentation such as plans, technical specs and policies, and structured records such as accounts and usage. A system built around one answers the other badly, and users neither know nor care which kind of question they are asking.',
    architecture: {
      description:
        'A multi-agent graph classifies query intent first, then routes to either document retrieval over a vector index or a SQL query against the relational database, and synthesises an answer grounded in whatever it retrieved. Answer quality is measured by LLM-as-a-Judge evaluation with every run tracked, so changes to prompts or retrieval are assessed rather than assumed.',
      glyph: 'telecomplus',
    },
    pipeline: [
      { step: 'Ingest documentation', detail: 'Parse the PDF corpus, detecting tables and rendering them as Markdown before anything else touches the text.' },
      { step: 'Chunk and embed', detail: 'Split the normalised text and index it into a FAISS vector store.' },
      { step: 'Classify intent', detail: 'An incoming question is routed by what kind of knowledge it needs.' },
      { step: 'Retrieve or query', detail: 'Document retrieval for unstructured questions, SQL against PostgreSQL for structured ones.' },
      { step: 'Synthesise', detail: 'Compose the answer against retrieved evidence rather than from model memory.' },
      { step: 'Evaluate and track', detail: 'Score responses with LLM-as-a-Judge and record every run for comparison.' },
    ],
    tech: ['LangChain', 'LangGraph', 'OpenAI API', 'FAISS', 'PostgreSQL', 'Streamlit', 'Langfuse', 'MLflow'],
    challenges: [
      {
        title: 'Tables inside PDFs were destroying answer quality',
        body:
          'The corpus was mostly PDF documentation, and the answers users actually wanted lived in tables: pricing tiers, plan comparisons, technical specs. Standard text extraction flattens a table into a stream of loose cell values. The row and column relationships that give a number its meaning are simply gone. Retrieval returned chunks that were topically right and factually unusable, and the model answered confidently and wrongly. I changed ingestion to detect tables and render them as Markdown before chunking, preserving structure in a format the model reads natively. Answers went from approximately correct to exact.',
      },
      {
        title: 'Routing between retrieval and structured queries',
        body:
          'Rather than forcing every question down one path, the agent graph classifies intent and routes accordingly. To know whether a change actually helped instead of trusting spot checks, I put LLM-as-a-Judge evaluation in front of it with full run tracking, so every adjustment to prompts or retrieval was measured.',
      },
    ],
    results: [
      'Exact answers to table-based questions, which the naive ingestion pipeline could not produce.',
      'Correct routing between document retrieval and structured database queries.',
      'A repeatable evaluation harness in place of manual inspection.',
      // TODO: confirm exact number — judge scores before/after the Markdown table change
    ],
    lessons:
      'Retrieval quality is capped by ingestion quality. Nearly all the improvement came from parsing the documents properly rather than from prompt engineering, which is where I would instinctively have spent the time. Building the evaluation harness before optimising was what made that visible.',
    links: { repo: 'https://github.com/Rblaze23/Telecomplus-agent', demo: null },
    images: [],
  },

  {
    slug: 'movie-recommender',
    tier: 2,
    title: 'Movie Recommender',
    subtitle: 'End-to-end recommender on GCP',
    context: 'Personal project',
    summary: 'An end-to-end recommendation system built on Google Cloud and exposed as a REST API.',
    problem:
      'A recommendation model is only useful once something can call it. The interesting part of this project was not the model but everything around it: getting from raw data to a trained model to a deployed endpoint that responds to requests, entirely on managed cloud infrastructure.',
    architecture: {
      description:
        'Data and model training live in BigQuery ML so the model sits next to the data rather than in a separate pipeline. Vertex AI handles the managed model lifecycle, and the serving layer runs on Cloud Run as a containerised REST API.',
      glyph: 'movie',
    },
    pipeline: [],
    tech: ['GCP', 'BigQuery ML', 'Vertex AI', 'Cloud Run', 'Python', 'REST API'],
    challenges: [],
    results: [
      'Trained model deployed and reachable as a REST endpoint.',
      'Fully managed pipeline with no self-hosted infrastructure.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/GCP-Personalized-Movie-Recommendation-System', demo: null },
    images: [],
  },

  {
    slug: 'alzheimers',
    tier: 2,
    title: 'Alzheimer’s Prediction',
    subtitle: 'Ensemble modelling with interpretability',
    context: 'Academic project',
    summary:
      'An ensemble of gradient boosting and deep learning for early prediction, with SHAP used to make the output interpretable.',
    problem:
      'Early prediction of Alzheimer’s is a clinical decision-support problem, and in that setting an unexplained prediction is close to useless. A clinician needs to know which factors drove a result before acting on it, so accuracy alone was never the goal.',
    architecture: {
      description:
        'An ensemble combining gradient-boosted trees with a deep learning model, paired with SHAP to attribute each prediction back to the features that produced it.',
      glyph: 'alzheimers',
    },
    pipeline: [],
    tech: ['Python', 'XGBoost', 'Deep Learning', 'SHAP', 'Pandas', 'scikit-learn'],
    challenges: [],
    results: [
      'Ensemble combining gradient boosting with a deep learning model.',
      'Per-prediction feature attribution via SHAP.',
      // TODO: confirm exact number — model performance metrics
    ],
    lessons: '',
    // TODO: confirm — no public repo found under github.com/Rblaze23 for this project
    links: { repo: null, demo: null },
    images: [],
  },

  {
    slug: 'ragenius',
    tier: 2,
    title: 'RAGenius',
    subtitle: 'Research assistant over PDF and CSV',
    context: 'Personal project',
    summary:
      'A multi-modal assistant that answers questions across PDF documents and CSV datasets using retrieval-augmented generation.',
    problem:
      'Research questions rarely sit inside a single file. Answering them often means combining what a document says with what a dataset shows, which normally requires reading both by hand and holding the connection in your head.',
    architecture: {
      description:
        'Uploaded PDFs and CSVs are indexed into a shared vector store, so a single question can retrieve across document text and tabular data together. Local models via Ollama keep the data on the machine, with a Streamlit dashboard for interactive exploration.',
      glyph: 'ragenius',
    },
    pipeline: [],
    tech: ['LangChain', 'FAISS', 'Hugging Face', 'Ollama', 'Streamlit', 'Python'],
    challenges: [],
    results: [
      'Multiple files uploaded and queried together in one session.',
      'Automatic summaries alongside question answering.',
      'Runs against local models, so documents never leave the machine.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/RAGenius', demo: null },
    images: [],
  },

  // --- Tier 3: cards only, no case-study route ---
  {
    slug: null, tier: 3, title: 'SportIQ', subtitle: 'AI tennis performance analysis',
    summary: 'Real-time video analysis for athletes: pose estimation, emotion recognition and NLP coaching feedback, with metrics and visualisations to improve form and focus.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'Pose Estimation', 'Computer Vision', 'NLP'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/SportiQ', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'MoodSync', subtitle: 'AI assistant for psychologists',
    summary: 'Real-time assistant with emotion detection, smart note-taking and LED mood lighting. Winner of Hack for Good.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Deep Learning', 'Speech Emotion Recognition', 'NLP'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/MoodSync', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Startup Investment Program', subtitle: 'NLP for investment screening',
    summary: 'Used NLP and Word2Vec to help investors identify high-potential startups from startup metadata and team data.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'NLP', 'Word2Vec'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Predicting-Profitable-Startups', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'House Price Prediction', subtitle: 'Regression with feature engineering',
    summary: 'Gradient-boosted regression with advanced feature engineering for the Kaggle housing competition.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'XGBoost', 'Feature Engineering'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/House-Prices-Prediction', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Diabetes Prediction', subtitle: 'Clinical risk classification',
    summary: 'Comparative classification study using Logistic Regression, SVM and Decision Trees to predict diabetes risk.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'scikit-learn', 'Classification'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Diabetes-Diagnosis', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Career Satisfaction Analysis', subtitle: 'Dimensionality reduction study',
    summary: 'Used PCA to explore the relationship between education, job role and career satisfaction.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'PCA', 'Data Analysis'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Academic-Path-and-Career-Satisfaction', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Blended Learning Platform', subtitle: 'Online and offline training',
    summary: 'A web application for running blended online and in-person training sessions.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['React', 'Firebase', 'JavaScript'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Blended-learning-Platform', demo: null }, images: [],
  },
];

export const caseStudies = projects.filter((p) => p.slug !== null);
export const moreProjects = projects.filter((p) => p.tier === 3);
export const getProject = (slug) => caseStudies.find((p) => p.slug === slug);

export default projects;
