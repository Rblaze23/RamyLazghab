// French translation of src/content/projects.js.
// Slugs stay identical so a link works in either language.

const projectsFr = [
  {
    slug: 'telecomplus',
    tier: 1,
    title: 'TelecomPlus',
    subtitle: 'Support client multi-agents',
    context: 'Projet académique',
    summary:
      'Support client multi-agents combinant recherche documentaire et requêtes SQL, avec évaluation LLM-as-a-Judge et traçage complet des exécutions.',
    problem:
      'Les questions du support client reposent sur deux types de connaissances incompatibles : de la documentation non structurée comme les offres, les spécifications techniques et les conditions générales, et des données structurées comme les comptes et la consommation. Un système pensé pour l’un répond mal à l’autre, et les utilisateurs ne savent ni ne se soucient de quel type de question il s’agit.',
    architecture: {
      description:
        'Un graphe multi-agents classe d’abord l’intention de la question, puis l’oriente soit vers une recherche documentaire sur un index vectoriel, soit vers une requête SQL sur la base relationnelle, et compose une réponse ancrée dans ce qui a été récupéré. La qualité des réponses est mesurée par une évaluation LLM-as-a-Judge, chaque exécution étant tracée, afin que les changements de prompt ou de recherche soient évalués et non supposés.',
      glyph: 'telecomplus',
    },
    pipeline: [
      { step: 'Ingestion de la documentation', detail: 'Analyse du corpus PDF, en détectant les tableaux et en les convertissant en Markdown avant tout autre traitement du texte.' },
      { step: 'Découpage et indexation', detail: 'Segmentation du texte normalisé puis indexation dans un magasin vectoriel FAISS.' },
      { step: 'Classification de l’intention', detail: 'Chaque question entrante est orientée selon le type de connaissance qu’elle requiert.' },
      { step: 'Recherche ou requête', detail: 'Recherche documentaire pour les questions non structurées, SQL sur PostgreSQL pour les questions structurées.' },
      { step: 'Synthèse', detail: 'Composition de la réponse à partir des éléments récupérés plutôt que de la mémoire du modèle.' },
      { step: 'Évaluation et traçage', detail: 'Notation des réponses par LLM-as-a-Judge et enregistrement de chaque exécution à des fins de comparaison.' },
    ],
    tech: ['LangChain', 'LangGraph', 'OpenAI API', 'FAISS', 'PostgreSQL', 'Streamlit', 'Langfuse', 'MLflow'],
    challenges: [
      {
        title: 'Les tableaux dans les PDF détruisaient la qualité des réponses',
        body:
          'Le corpus était surtout constitué de documentation PDF, et les réponses réellement recherchées se trouvaient dans des tableaux : grilles tarifaires, comparatifs d’offres, spécifications techniques. L’extraction de texte standard aplatit un tableau en un flux de cellules isolées. Les relations de lignes et de colonnes, celles qui donnent son sens à un chiffre, disparaissent purement et simplement. La recherche renvoyait des passages thématiquement corrects mais factuellement inutilisables, et le modèle répondait avec assurance et à côté. J’ai modifié l’ingestion pour détecter les tableaux et les convertir en Markdown avant le découpage, ce qui préserve la structure dans un format que le modèle lit nativement. Les réponses sont passées d’approximativement correctes à exactes.',
      },
      {
        title: 'Orienter entre recherche documentaire et requêtes structurées',
        body:
          'Plutôt que de forcer chaque question dans un seul chemin, le graphe d’agents classe l’intention et oriente en conséquence. Pour savoir si un changement améliorait réellement les choses au lieu de me fier à quelques tests ponctuels, j’ai mis en place une évaluation LLM-as-a-Judge avec traçage complet, afin que chaque ajustement de prompt ou de recherche soit mesuré.',
      },
    ],
    results: [
      'Des réponses exactes aux questions portant sur des tableaux, ce que l’ingestion naïve ne permettait pas.',
      'Une orientation correcte entre recherche documentaire et requêtes sur la base de données.',
      'Un dispositif d’évaluation reproductible à la place d’une inspection manuelle.',
    ],
    lessons:
      'La qualité de la recherche est plafonnée par la qualité de l’ingestion. L’essentiel du gain est venu d’une analyse correcte des documents et non du prompt engineering, là où j’aurais spontanément passé mon temps. C’est le fait de construire le dispositif d’évaluation avant d’optimiser qui a rendu cela visible.',
    links: { repo: 'https://github.com/Rblaze23/Telecomplus-agent', demo: null },
    images: [],
  },

  {
    slug: 'movie-recommender',
    tier: 2,
    title: 'Movie Recommender',
    subtitle: 'Système de recommandation de bout en bout sur GCP',
    context: 'Projet personnel',
    summary: 'Un système de recommandation de bout en bout construit sur Google Cloud et exposé sous forme d’API REST.',
    problem:
      'Un modèle de recommandation n’a d’utilité qu’à partir du moment où quelque chose peut l’appeler. L’intérêt de ce projet ne résidait pas dans le modèle mais dans tout ce qui l’entoure : passer des données brutes à un modèle entraîné puis à un point d’accès déployé qui répond aux requêtes, entièrement sur une infrastructure cloud managée.',
    architecture: {
      description:
        'Les données et l’entraînement vivent dans BigQuery ML, si bien que le modèle se trouve auprès des données plutôt que dans un pipeline séparé. Vertex AI gère le cycle de vie du modèle, et la couche de service tourne sur Cloud Run sous forme d’API REST conteneurisée.',
      glyph: 'movie',
    },
    pipeline: [],
    tech: ['GCP', 'BigQuery ML', 'Vertex AI', 'Cloud Run', 'Python', 'API REST'],
    challenges: [],
    results: [
      'Modèle entraîné, déployé et accessible via un point d’accès REST.',
      'Pipeline entièrement managé, sans infrastructure auto-hébergée.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/GCP-Personalized-Movie-Recommendation-System', demo: null },
    images: [],
  },

  {
    slug: 'alzheimers',
    tier: 2,
    title: 'Prédiction d’Alzheimer',
    subtitle: 'Modèles d’ensemble et interprétabilité',
    context: 'Projet académique',
    summary:
      'Un ensemble combinant gradient boosting et deep learning pour une prédiction précoce, avec SHAP pour rendre les résultats interprétables.',
    problem:
      'La prédiction précoce d’Alzheimer relève de l’aide à la décision clinique, et dans ce contexte une prédiction inexpliquée ne sert presque à rien. Un clinicien doit savoir quels facteurs ont produit un résultat avant d’agir dessus, si bien que la seule performance n’a jamais été l’objectif.',
    architecture: {
      description:
        'Un ensemble associant des arbres de gradient boosting à un modèle de deep learning, couplé à SHAP pour attribuer chaque prédiction aux variables qui l’ont produite.',
      glyph: 'alzheimers',
    },
    pipeline: [],
    tech: ['Python', 'XGBoost', 'Deep Learning', 'SHAP', 'Pandas', 'scikit-learn'],
    challenges: [],
    results: [
      'Ensemble combinant gradient boosting et un modèle de deep learning.',
      'Attribution des variables prédiction par prédiction via SHAP.',
    ],
    lessons: '',
    links: { repo: null, demo: null },
    images: [],
  },

  {
    slug: 'ragenius',
    tier: 2,
    title: 'RAGenius',
    subtitle: 'Assistant de recherche sur PDF et CSV',
    context: 'Projet personnel',
    summary:
      'Un assistant multimodal qui répond à des questions portant à la fois sur des documents PDF et des jeux de données CSV, par génération augmentée par la recherche.',
    problem:
      'Une question de recherche tient rarement dans un seul fichier. Y répondre suppose souvent de croiser ce que dit un document avec ce que montre un jeu de données, ce qui oblige normalement à lire les deux à la main en gardant le lien en tête.',
    architecture: {
      description:
        'Les PDF et CSV déposés sont indexés dans un magasin vectoriel commun, si bien qu’une même question peut chercher à la fois dans le texte et dans les données tabulaires. Des modèles locaux via Ollama gardent les données sur la machine, avec un tableau de bord Streamlit pour l’exploration interactive.',
      glyph: 'ragenius',
    },
    pipeline: [],
    tech: ['LangChain', 'FAISS', 'Hugging Face', 'Ollama', 'Streamlit', 'Python'],
    challenges: [],
    results: [
      'Plusieurs fichiers déposés et interrogés ensemble dans une même session.',
      'Résumés automatiques en complément des réponses aux questions.',
      'Fonctionne avec des modèles locaux, les documents ne quittent donc jamais la machine.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/RAGenius', demo: null },
    images: [],
  },

  // --- Niveau 3 : cartes seules, sans page dédiée ---
  {
    slug: null, tier: 3, title: 'SportIQ', subtitle: 'Analyse de performance au tennis par IA',
    summary: 'Analyse vidéo en temps réel pour les sportifs : estimation de posture, reconnaissance des émotions et retours d’entraînement en NLP, avec métriques et visualisations pour améliorer la forme et la concentration.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'Estimation de posture', 'Vision par ordinateur', 'NLP'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/SportiQ', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'MoodSync', subtitle: 'Assistant IA pour psychologues',
    summary: 'Assistant temps réel avec détection des émotions, prise de notes intelligente et éclairage LED d’ambiance. Lauréat du Hack for Good.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Deep Learning', 'Reconnaissance des émotions vocales', 'NLP'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/MoodSync', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Startup Investment Program', subtitle: 'NLP pour la sélection d’investissements',
    summary: 'Utilisation du NLP et de Word2Vec pour aider les investisseurs à repérer des startups à fort potentiel à partir de leurs métadonnées et de la composition des équipes.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'NLP', 'Word2Vec'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Predicting-Profitable-Startups', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Prédiction des prix immobiliers', subtitle: 'Régression et feature engineering',
    summary: 'Régression par gradient boosting avec feature engineering avancé pour la compétition Kaggle sur les prix immobiliers.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'XGBoost', 'Feature Engineering'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/House-Prices-Prediction', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Prédiction du diabète', subtitle: 'Classification du risque clinique',
    summary: 'Étude comparative de classification utilisant la régression logistique, les SVM et les arbres de décision pour prédire le risque de diabète.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'scikit-learn', 'Classification'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Diabetes-Diagnosis', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Analyse de la satisfaction de carrière', subtitle: 'Étude par réduction de dimension',
    summary: 'Utilisation de l’ACP pour explorer la relation entre formation, poste occupé et satisfaction professionnelle.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'ACP', 'Analyse de données'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Academic-Path-and-Career-Satisfaction', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Plateforme de blended learning', subtitle: 'Formation en ligne et en présentiel',
    summary: 'Une application web pour organiser des sessions de formation mêlant présentiel et distanciel.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['React', 'Firebase', 'JavaScript'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Blended-learning-Platform', demo: null }, images: [],
  },
];

export const caseStudiesFr = projectsFr.filter((p) => p.slug !== null);
export const moreProjectsFr = projectsFr.filter((p) => p.tier === 3);
export const getProjectFr = (slug) => caseStudiesFr.find((p) => p.slug === slug);

export default projectsFr;
