// Open projects. Unlike src/content/experience.js, detail is safe here —
// every one of these has a public repository.

import secopsShot from '../assets/img/secops-agent-vs-baseline.png';
import sportiqShot from '../assets/img/sportiq-landing.png';

const projects = [
  {
    slug: 'agentic-security-operations',
    tier: 1,
    title: 'Agentic Security Operations',
    subtitle: 'ML intrusion detection with evidence-grounded alert investigation',
    context: 'Personal project',
    summary:
      'A LightGBM flow detector served by a FastAPI service, a LangGraph agent that investigates each alert through seven read-only security tools, and a 38-case golden set that measures the agent against a rule-based baseline.',
    problem:
      'A flow-level intrusion detector can reach 0.9999 PR-AUC on its own test split and still miss 94% of a botnet it has never seen. A score is not a triage decision. An analyst asks what else the source did, what the target is, whether the address is known, whether a vulnerability matches and whether the neighbouring flows look the same. The platform automates that investigation with an agent that may only cite evidence returned by tools, and measures whether the agent is worth its cost against rules that use the same tools.',
    architecture: {
      description:
        'Network flows from CIC-IDS-2017 are scored by a LightGBM detector served over FastAPI, with SHAP attributions on every alert. An alert enters a LangGraph state machine: a planning step lists two to six questions, an investigator model answers them through seven typed, read-only tools over an indexed store of 1.7 million flows, an NVD CVE cache, the MITRE ATT&CK bundle and the detector itself, then a deterministic critic checks that every cited evidence id exists and every technique or CVE came from a lookup before a finalize step assigns verdict and severity from a fixed rubric. Every investigation persists its tool calls, tokens and cost, and a versioned golden set with a regression gate decides whether a change ships.',
      glyph: 'secops',
    },
    pipeline: [
      { step: 'Build the dataset', detail: 'Deduplicate 2.1 million CIC-IDS-2017 flows down to 1.7 million, split chronologically within each day and label, and keep identifiers and the destination port out of the features.' },
      { step: 'Train and select the detector', detail: 'Logistic regression, XGBoost and LightGBM tracked in MLflow. The operating threshold is chosen on validation at a 1% false positive rate and the test split is scored once.' },
      { step: 'Serve alerts', detail: 'A typed FastAPI service returns probability, attack family and top SHAP features, behind API keys, per-key rate limits and a read-only container.' },
      { step: 'Investigate', detail: 'The LangGraph agent plans, calls tools within a budget of twelve, and may only cite evidence that a tool returned.' },
      { step: 'Check and finalize', detail: 'Rules reject any finding whose evidence id, CVE or technique did not come from a tool call. Severity comes from a rubric, never from the model.' },
      { step: 'Evaluate and gate', detail: 'Thirty-eight golden alerts, including four prompt-injection cases, score verdict, grounding, cost and latency, and a compare command fails the build on regressions.' },
    ],
    tech: ['Python', 'LightGBM', 'XGBoost', 'SHAP', 'MLflow', 'FastAPI', 'LangGraph', 'Claude (Opus 5.5 / Sonnet 5.5)', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Streamlit', 'Langfuse', 'GitHub Actions'],
    challenges: [
      {
        title: 'The in-distribution number did not transfer',
        body:
          'The champion scored 0.9999 PR-AUC on the chronological test split, which is where most projects stop. Holding out Friday entirely, so that Botnet and DDoS traffic never appear in training, told a different story: 6% recall on the unseen botnet, and DDoS caught only because the operating threshold was tiny. An ablation also showed that adding the destination port as a feature pushed PR-AUC to 1.0000, which confirmed it was a testbed shortcut and justified leaving it out. I report the held-out numbers first, because they are the ones that would survive contact with a real network.',
      },
      {
        title: 'The model critic was making the agent worse',
        body:
          'The first full run put the agent behind the rule-based baseline on verdict accuracy, 0.658 against 0.842, even though it was better on everything that touched evidence. Eleven of its thirteen wrong verdicts were cases pushed to human review after two rejections from a Sonnet critic that judged whether each finding followed from its evidence. A twelve-case ablation isolated the critic as the cause, and the full set confirmed it: with deterministic rules only, verdict accuracy rose to 0.921 and cost per case fell from $0.183 to $0.124, with grounding still perfect. That number came from the evaluation harness, not from reading transcripts.',
      },
      {
        title: 'Tools that cannot leak the answer or be hijacked',
        body:
          'Every tool is read-only with typed, bounded inputs and no shell, file or URL parameters, and a registry test proves that none of them exposes a ground-truth label. Text from external sources such as CVE descriptions is flagged as untrusted, and four golden cases inject "ignore all previous instructions" into CVE descriptions and asset notes. The agent resisted all four in every configuration.',
      },
    ],
    results: [
      'Detector: 0.9999 test PR-AUC with 99.93% recall at a 0.45% false positive rate, and 6% recall on a held-out botnet family, reported side by side.',
      'The agent beats the rule-based baseline on composite score, 0.934 against 0.884, and on verdict accuracy, 0.921 against 0.842.',
      'Perfect evidence recall and precision, zero unsupported ATT&CK or CVE references, and all four prompt-injection cases resisted.',
      '$0.124 per investigation at a median latency of 35 seconds, with every run file committed and reproducible.',
      'A regression gate on composite, grounding and cost runs in CI by replaying recorded model calls at zero cost.',
    ],
    lessons:
      'Build the evaluation harness before trusting any component, including the ones meant to add safety. The model critic looked like the responsible design and measured as a net negative. Without the harness I would have shipped it. The second lesson is to hold out a whole day rather than a random slice: the honest generalisation number was far worse than the headline one, and it is the number a security team would actually care about.',
    links: { repo: 'https://github.com/Rblaze23/Agentic-security-operations', demo: null },
    images: [
      {
        src: secopsShot,
        alt: 'Bar chart comparing the rule-based baseline, the agent with a rules-only critic and the agent with a model critic on verdict accuracy, family agreement, severity, evidence recall, grounding and composite score over the 38-case golden set',
      },
    ],
  },

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
    slug: 'nosql-query-generation',
    tier: 2,
    title: 'NoSQL Query Generation',
    subtitle: 'Plain English into five database query languages',
    context: 'Academic project',
    summary:
      'A natural-language interface that turns plain English questions into MongoDB, Neo4j, Redis, HBase and RDF queries, with each database exposed to the LLM through its own Model Context Protocol server.',
    problem:
      'Every NoSQL database speaks its own query language: JSON and aggregation pipelines for MongoDB, Cypher for Neo4j, commands for Redis, SPARQL for RDF triple stores. Anyone who needs data from more than one of them has to learn several syntaxes, and people without a technical background cannot get at the data at all.',
    architecture: {
      description:
        'A query engine works out which database a question is aimed at, gathers that database’s schema as context, and asks an LLM to write the query. Each database sits behind its own Model Context Protocol server that exposes schema discovery, validation and execution as tools, so adding a new store means adding a server rather than changing the engine. Generated queries are validated against the live schema before they run, and the same LLM explains in plain English what each query does. A Streamlit interface adds a schema explorer, query history and a side-by-side comparison of how one question translates across the five databases.',
      glyph: 'nosql',
    },
    pipeline: [],
    tech: ['Python', 'MCP', 'Groq (Llama 3.3 70B)', 'MongoDB', 'Neo4j', 'Redis', 'HBase', 'Apache Jena (SPARQL)', 'Docker', 'Streamlit'],
    challenges: [],
    results: [
      'Five NoSQL database types queried through one natural-language interface.',
      'Schema-aware validation catches wrong field and collection names before a query runs.',
      'Every generated query comes with a plain-English explanation of what it does.',
      'Cross-database comparison shows how the same question translates into each query language.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/LLM-Assisted_Query_Generation', demo: null },
    images: [],
  },
  {
    slug: 'sportiq',
    tier: 2,
    title: 'SportIQ',
    subtitle: 'Stroke-level tennis technique analysis from one phone video',
    context: 'Personal project',
    summary:
      'Upload a training clip and SportIQ tracks the player, finds every swing, labels it, measures the biomechanics of each stroke, compares them with the player’s own history and writes coaching feedback with concrete drills.',
    problem:
      'Technique coaching depends on a trained eye watching in real time, and most players train without one. Video helps only if someone turns it into measurements: where the elbow was at contact, how deep the knees loaded, whether hips led shoulders led hand. Doing that by hand for every stroke in a session is not realistic, so the footage goes unwatched and the same flaw repeats for months.',
    architecture: {
      description:
        'A pure-Python core pipeline decodes the video, runs 3-D pose estimation per frame, smooths the landmark tracks and detects strokes from hitting-wrist speed peaks, with guards against camera cuts and tracking jumps. Each stroke is typed by rules or by a trained classifier when one is available, then seven biomechanical measures are computed and scored against reference ranges per stroke type. A personal baseline stored in SQLite flags measures that moved from the player’s history. An LLM turns the measured report into a short coaching summary and drills, constrained to a strict JSON schema so it only explains numbers the pipeline computed; without an API key a rule-based coach built from the same checks takes over, so the app works fully offline. A FastAPI service runs analyses as background jobs with live progress, and a Next.js web app replays each session with the skeleton drawn over the player, a clickable stroke timeline in slow motion, per-stroke measurements against target ranges and progress charts per player.',
      glyph: 'sportiq',
    },
    pipeline: [
      { step: 'Decode and track', detail: 'Downscale the clip, run 3-D pose estimation in video mode, fill gaps and smooth the landmark tracks.' },
      { step: 'Detect strokes', detail: 'Find swings from hitting-wrist speed peaks, rejecting camera cuts and tracking jumps.' },
      { step: 'Type each stroke', detail: 'Forehand, backhand or serve, by rules or by a random forest trained on body-normalised, handedness-mirrored pose trajectories.' },
      { step: 'Measure and score', detail: 'Seven biomechanical measures per stroke, each checked against a reference range, giving a 0 to 100 score and a consistency figure per stroke type.' },
      { step: 'Compare with history', detail: 'A personal baseline flags any measure that moved by at least one standard deviation from the player’s past sessions.' },
      { step: 'Coach and replay', detail: 'An LLM or the offline rule-based coach writes the summary and drills; the web app replays the session with the skeleton, timeline and charts.' },
    ],
    tech: ['Python', 'MediaPipe Pose', 'scikit-learn', 'SciPy', 'FastAPI', 'SQLite', 'Groq / Anthropic API', 'Next.js', 'TypeScript', 'Docker', 'GitHub Actions'],
    challenges: [],
    results: [
      'Seven biomechanical measures per stroke, from elbow angle at contact to kinetic-chain timing and peak hand speed, each scored against a reference range.',
      'The AI coach is constrained to a strict JSON schema and can only explain numbers the pipeline computed; a rule-based coach replaces it offline.',
      'Reference ranges live in one file so a coach can tune them without touching the pipeline.',
      'Thirty-seven tests, including a synthetic player with known geometry, run with lint and the web build in CI on every push.',
      'Runs as a CLI, a REST API with live progress events, a Next.js web app or a single Docker Compose command.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/SportiQ', demo: null },
    images: [
      {
        src: sportiqShot,
        alt: 'SportIQ landing page inviting the player to upload a training clip for stroke-level analysis',
      },
    ],
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
