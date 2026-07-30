// French translation of src/content/experience.js.
//
// CONFIDENTIALITY BOUNDARY — the same rule applies here as in the English file.
// This is a translation of copy approved by Ramy Lazghab on 2026-07-29 and must
// stay at exactly that level of detail. Do not add pipeline steps, named data
// sources, document counts, model architectures, retrieval strategy, prompt
// design, validation logic, client names, or any performance figure.
//
// No `slug` field, deliberately: these render on the homepage only.

const experienceFr = [
  {
    id: 'oracle',
    title: 'ORACLE',
    subtitle: 'Veille réglementaire',
    problem:
      'Dans un secteur fortement réglementé, les règles évoluent en permanence, et les indices qui annoncent la prochaine restriction sont dispersés dans une vaste littérature scientifique et juridique ainsi que dans des sources publiques qui bougent vite. Aucune équipe ne peut suivre ce volume manuellement. L’apprendre trop tard oblige à reformuler un produit dans l’urgence au lieu de l’anticiper.',
    role: [
      'J’ai travaillé sur la partie IA d’une plateforme interne de veille réglementaire, où trois éléments fonctionnent ensemble.',
      'D’abord, une couche de recherche documentaire sur un large corpus curé, afin que le système réponde en s’appuyant sur des sources réelles plutôt qu’en produisant un texte simplement plausible.',
      'Ensuite, un ensemble d’agents autonomes que j’ai conçus et orchestrés pour collecter en continu des informations issues de sources publiques et les convertir en signaux structurés exploitables par le reste du système, ce qui rend mesurable un environnement extérieur en mouvement constant.',
      'Enfin, des modèles de machine learning que j’ai entraînés sur ces signaux pour produire des prévisions de risque, et non uniquement une description du présent.',
      'J’ai également construit la couche d’explication : des LLM qui expliquent pourquoi un modèle aboutit à une prédiction donnée et génèrent un visuel pour chaque facteur contributif. Ce point compte plus qu’il n’y paraît. Les personnes qui agissent sur ces prévisions sont des spécialistes de la réglementation, pas des ingénieurs en ML, et une prévision qu’elles ne peuvent pas interroger est une prévision qu’elles n’utiliseront pas.',
    ],
    tech: ['Orchestration multi-agents', 'LangGraph', 'RAG', 'Qdrant', 'XGBoost', 'Anthropic API', 'Streamlit'],
  },
  {
    id: 'pif-ai',
    title: 'PIF AI',
    subtitle: 'Intelligence documentaire générative',
    problem:
      'La constitution des dossiers de conformité réglementaire est un travail documentaire lent et manuel. Quelqu’un lit des documents clients épars, en extrait ce qui compte, puis réécrit le tout dans une structure figée et auditable, et recommence pour le produit suivant. C’est coûteux, et c’est exactement le type de tâche où un petit oubli ressort plus tard lors d’un audit.',
    role: [
      'J’ai construit un système d’IA générative qui produit ces dossiers automatiquement. Il lit les documents sources du client, interprète leur contenu et génère le document structuré attendu à partir de cette matière.',
      'Comme le résultat est une pièce de conformité et non un brouillon, la génération seule ne suffit pas, car plausible n’est pas synonyme de correct. Le système exécute donc aussi des agents de validation qui contrôlent ce qui a été produit, et s’appuie sur un circuit de relecture humaine où un relecteur peut accepter ou régénérer n’importe quelle partie du document plutôt que de tout jeter et recommencer.',
      'Il a été livré au sein de l’application web de production de l’entreprise, comme une fonctionnalité utilisée par de vrais clients.',
    ],
    tech: ['IA générative', 'Compréhension documentaire par LLM', 'RAG', 'Agents de validation', 'Anthropic API'],
  },
];

export default experienceFr;
