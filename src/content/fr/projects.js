// French translation of src/content/projects.js.
// Slugs stay identical so a link works in either language.

import secopsShot from '../../assets/img/secops-agent-vs-baseline.png';
import sportiqShot from '../../assets/img/sportiq-landing.png';

const projectsFr = [
  {
    slug: 'agentic-security-operations',
    tier: 1,
    title: 'Agentic Security Operations',
    subtitle: 'Détection d’intrusion par ML et investigation d’alertes fondée sur les preuves',
    context: 'Projet personnel',
    summary:
      'Un détecteur de flux LightGBM servi par une API FastAPI, un agent LangGraph qui investigue chaque alerte à travers sept outils de sécurité en lecture seule, et un jeu de référence de 38 cas qui mesure l’agent face à une base de règles.',
    problem:
      'Un détecteur d’intrusion au niveau des flux peut atteindre 0,9999 de PR-AUC sur son propre jeu de test et manquer malgré tout 94 % d’un botnet qu’il n’a jamais vu. Un score n’est pas une décision de triage. Un analyste se demande ce que la source a fait d’autre, quelle est la cible, si l’adresse est connue, si une vulnérabilité correspond et si les flux voisins se ressemblent. La plateforme automatise cette investigation avec un agent qui ne peut citer que des preuves renvoyées par des outils, et mesure si l’agent vaut son coût face à des règles qui utilisent les mêmes outils.',
    architecture: {
      description:
        'Les flux réseau de CIC-IDS-2017 sont notés par un détecteur LightGBM servi via FastAPI, avec des attributions SHAP sur chaque alerte. Une alerte entre dans une machine à états LangGraph : une étape de planification liste deux à six questions, un modèle investigateur y répond à travers sept outils typés en lecture seule sur un magasin indexé de 1,7 million de flux, un cache de CVE du NVD, le référentiel MITRE ATT&CK et le détecteur lui-même, puis un critique déterministe vérifie que chaque identifiant de preuve cité existe et que chaque technique ou CVE provient bien d’une consultation, avant qu’une étape finale n’attribue le verdict et la sévérité selon une grille fixe. Chaque investigation conserve ses appels d’outils, ses jetons et son coût, et un jeu de référence versionné avec une barrière de régression décide si un changement est accepté.',
      glyph: 'secops',
    },
    pipeline: [
      { step: 'Construire le jeu de données', detail: 'Dédoublonner 2,1 millions de flux CIC-IDS-2017 pour en garder 1,7 million, découper chronologiquement au sein de chaque journée et de chaque étiquette, et tenir les identifiants et le port de destination à l’écart des variables.' },
      { step: 'Entraîner et sélectionner le détecteur', detail: 'Régression logistique, XGBoost et LightGBM suivis dans MLflow. Le seuil de fonctionnement est choisi sur la validation à 1 % de faux positifs et le jeu de test n’est noté qu’une seule fois.' },
      { step: 'Servir les alertes', detail: 'Une API FastAPI typée renvoie la probabilité, la famille d’attaque et les principales variables SHAP, derrière des clés d’API, une limitation de débit par clé et un conteneur en lecture seule.' },
      { step: 'Investiguer', detail: 'L’agent LangGraph planifie, appelle les outils dans un budget de douze appels, et ne peut citer que des preuves renvoyées par un outil.' },
      { step: 'Vérifier et finaliser', detail: 'Des règles rejettent toute conclusion dont l’identifiant de preuve, la CVE ou la technique ne provient pas d’un appel d’outil. La sévérité vient d’une grille, jamais du modèle.' },
      { step: 'Évaluer et verrouiller', detail: 'Trente-huit alertes de référence, dont quatre cas d’injection de prompt, notent le verdict, l’ancrage, le coût et la latence, et une commande de comparaison fait échouer la construction en cas de régression.' },
    ],
    tech: ['Python', 'LightGBM', 'XGBoost', 'SHAP', 'MLflow', 'FastAPI', 'LangGraph', 'Claude (Opus 5.5 / Sonnet 5.5)', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Streamlit', 'Langfuse', 'GitHub Actions'],
    challenges: [
      {
        title: 'Le chiffre en distribution ne se transférait pas',
        body:
          'Le champion atteignait 0,9999 de PR-AUC sur le découpage chronologique de test, là où la plupart des projets s’arrêtent. Mettre entièrement de côté le vendredi, de sorte que le trafic Botnet et DDoS n’apparaisse jamais à l’entraînement, racontait une autre histoire : 6 % de rappel sur le botnet inconnu, et le DDoS détecté uniquement parce que le seuil de fonctionnement était minuscule. Une ablation a aussi montré qu’ajouter le port de destination comme variable portait la PR-AUC à 1,0000, ce qui confirmait un raccourci propre au banc d’essai et justifiait de l’exclure. Je présente d’abord les chiffres hors distribution, parce que ce sont eux qui survivraient au contact d’un vrai réseau.',
      },
      {
        title: 'Le critique à base de modèle dégradait l’agent',
        body:
          'La première exécution complète plaçait l’agent derrière la base de règles en exactitude des verdicts, 0,658 contre 0,842, alors qu’il faisait mieux sur tout ce qui touchait aux preuves. Onze de ses treize verdicts erronés étaient des cas renvoyés en revue humaine après deux rejets d’un critique Sonnet chargé de juger si chaque conclusion découlait de ses preuves. Une ablation sur douze cas a isolé le critique comme cause, et le jeu complet l’a confirmé : avec des règles déterministes seules, l’exactitude des verdicts est montée à 0,921 et le coût par cas est passé de 0,183 $ à 0,124 $, avec un ancrage toujours parfait. Ce chiffre est venu du dispositif d’évaluation, pas de la lecture des transcriptions.',
      },
      {
        title: 'Des outils qui ne peuvent ni divulguer la réponse ni être détournés',
        body:
          'Chaque outil est en lecture seule, avec des entrées typées et bornées et aucun paramètre de shell, de fichier ou d’URL, et un test du registre prouve qu’aucun n’expose d’étiquette de vérité terrain. Le texte issu de sources externes, comme les descriptions de CVE, est marqué comme non fiable, et quatre cas de référence injectent « ignore all previous instructions » dans des descriptions de CVE et des notes d’actifs. L’agent a résisté aux quatre dans chaque configuration.',
      },
    ],
    results: [
      'Détecteur : 0,9999 de PR-AUC en test avec 99,93 % de rappel à 0,45 % de faux positifs, et 6 % de rappel sur une famille de botnet mise de côté, présentés côte à côte.',
      'L’agent bat la base de règles sur le score composite, 0,934 contre 0,884, et sur l’exactitude des verdicts, 0,921 contre 0,842.',
      'Rappel et précision des preuves parfaits, zéro référence ATT&CK ou CVE non étayée, et les quatre cas d’injection de prompt repoussés.',
      '0,124 $ par investigation pour une latence médiane de 35 secondes, chaque fichier d’exécution étant versionné et reproductible.',
      'Une barrière de régression sur le composite, l’ancrage et le coût tourne en CI en rejouant des appels de modèle enregistrés, sans aucun coût.',
    ],
    lessons:
      'Construire le dispositif d’évaluation avant de faire confiance à un composant, y compris ceux censés ajouter de la sécurité. Le critique à base de modèle avait l’air du choix responsable et s’est mesuré comme un net recul. Sans le dispositif, je l’aurais livré. La seconde leçon est de mettre de côté une journée entière plutôt qu’une tranche aléatoire : le chiffre honnête de généralisation était bien pire que le chiffre vedette, et c’est celui qui compterait vraiment pour une équipe de sécurité.',
    links: { repo: 'https://github.com/Rblaze23/Agentic-security-operations', demo: null },
    images: [
      {
        src: secopsShot,
        alt: 'Diagramme en barres comparant la base de règles, l’agent avec critique à base de règles et l’agent avec critique à base de modèle sur l’exactitude des verdicts, l’accord de famille, la sévérité, le rappel des preuves, l’ancrage et le score composite sur les 38 cas de référence',
      },
    ],
  },

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
    slug: 'nosql-query-generation',
    tier: 2,
    title: 'NoSQL Query Generation',
    subtitle: 'Du langage naturel vers cinq langages de requête',
    context: 'Projet académique',
    summary:
      'Une interface en langage naturel qui transforme des questions en requêtes MongoDB, Neo4j, Redis, HBase et RDF, chaque base étant exposée au LLM par son propre serveur Model Context Protocol.',
    problem:
      'Chaque base NoSQL a son propre langage de requête : JSON et pipelines d’agrégation pour MongoDB, Cypher pour Neo4j, commandes pour Redis, SPARQL pour les triplestores RDF. Quiconque a besoin de données issues de plusieurs d’entre elles doit apprendre plusieurs syntaxes, et les personnes sans profil technique n’y ont tout simplement pas accès.',
    architecture: {
      description:
        'Un moteur de requêtes détermine quelle base une question vise, récupère le schéma de cette base comme contexte et demande à un LLM d’écrire la requête. Chaque base se trouve derrière son propre serveur Model Context Protocol, qui expose la découverte du schéma, la validation et l’exécution sous forme d’outils : ajouter un nouveau magasin de données revient à ajouter un serveur, sans modifier le moteur. Les requêtes générées sont validées contre le schéma réel avant d’être exécutées, et le même LLM explique en langage clair ce que fait chaque requête. Une interface Streamlit ajoute un explorateur de schémas, un historique des requêtes et une comparaison côte à côte de la traduction d’une même question dans les cinq bases.',
      glyph: 'nosql',
    },
    pipeline: [],
    tech: ['Python', 'MCP', 'Groq (Llama 3.3 70B)', 'MongoDB', 'Neo4j', 'Redis', 'HBase', 'Apache Jena (SPARQL)', 'Docker', 'Streamlit'],
    challenges: [],
    results: [
      'Cinq types de bases NoSQL interrogés depuis une seule interface en langage naturel.',
      'La validation fondée sur le schéma détecte les noms de champs et de collections erronés avant l’exécution.',
      'Chaque requête générée s’accompagne d’une explication en langage clair de ce qu’elle fait.',
      'La comparaison inter-bases montre comment une même question se traduit dans chaque langage de requête.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/LLM-Assisted_Query_Generation', demo: null },
    images: [],
  },
  {
    slug: 'sportiq',
    tier: 2,
    title: 'SportIQ',
    subtitle: 'Analyse technique du tennis, coup par coup, à partir d’une vidéo de téléphone',
    context: 'Projet personnel',
    summary:
      'Déposez un extrait d’entraînement et SportIQ suit le joueur, repère chaque frappe, l’identifie, mesure la biomécanique de chaque coup, la compare à l’historique du joueur et rédige un retour de coaching avec des exercices concrets.',
    problem:
      'Le travail technique repose sur un œil entraîné qui observe en direct, et la plupart des joueurs s’entraînent sans. La vidéo n’aide que si quelqu’un la transforme en mesures : où était le coude à l’impact, jusqu’où les genoux se sont fléchis, si les hanches ont précédé les épaules puis la main. Le faire à la main pour chaque coup d’une séance n’est pas réaliste, alors les images restent inexploitées et le même défaut se répète pendant des mois.',
    architecture: {
      description:
        'Un pipeline Python sans interface décode la vidéo, estime la posture 3D image par image, lisse les trajectoires des points et détecte les frappes à partir des pics de vitesse du poignet dominant, avec des garde-fous contre les coupures de caméra et les sauts de suivi. Chaque coup est typé par des règles, ou par un classifieur entraîné lorsqu’il existe, puis sept mesures biomécaniques sont calculées et notées selon des plages de référence par type de coup. Une ligne de base personnelle stockée dans SQLite signale les mesures qui se sont écartées de l’historique du joueur. Un LLM transforme le rapport mesuré en un court résumé de coaching avec des exercices, contraint par un schéma JSON strict pour n’expliquer que des chiffres calculés par le pipeline ; sans clé d’API, un coach à base de règles construit sur les mêmes contrôles prend le relais, si bien que l’application fonctionne entièrement hors ligne. Un service FastAPI exécute les analyses en tâches de fond avec progression en direct, et une application web Next.js rejoue chaque séance avec le squelette superposé au joueur, une chronologie cliquable des coups au ralenti, les mesures de chaque coup face aux plages cibles et des courbes de progression par joueur.',
      glyph: 'sportiq',
    },
    pipeline: [
      { step: 'Décoder et suivre', detail: 'Réduire la vidéo, estimer la posture 3D en mode vidéo, combler les trous et lisser les trajectoires des points.' },
      { step: 'Détecter les frappes', detail: 'Repérer les coups à partir des pics de vitesse du poignet dominant, en rejetant les coupures de caméra et les sauts de suivi.' },
      { step: 'Typer chaque coup', detail: 'Coup droit, revers ou service, par des règles ou par une forêt aléatoire entraînée sur des trajectoires normalisées par le corps et symétrisées selon la main dominante.' },
      { step: 'Mesurer et noter', detail: 'Sept mesures biomécaniques par coup, chacune confrontée à une plage de référence, pour une note de 0 à 100 et un indice de régularité par type de coup.' },
      { step: 'Comparer à l’historique', detail: 'Une ligne de base personnelle signale toute mesure qui s’est écartée d’au moins un écart-type des séances passées du joueur.' },
      { step: 'Coacher et rejouer', detail: 'Un LLM ou le coach hors ligne à base de règles rédige le résumé et les exercices ; l’application web rejoue la séance avec le squelette, la chronologie et les courbes.' },
    ],
    tech: ['Python', 'MediaPipe Pose', 'scikit-learn', 'SciPy', 'FastAPI', 'SQLite', 'Groq / Anthropic API', 'Next.js', 'TypeScript', 'Docker', 'GitHub Actions'],
    challenges: [],
    results: [
      'Sept mesures biomécaniques par coup, de l’angle du coude à l’impact au timing de la chaîne cinétique et à la vitesse maximale de la main, chacune notée selon une plage de référence.',
      'Le coach IA est contraint par un schéma JSON strict et ne peut expliquer que des chiffres calculés par le pipeline ; un coach à base de règles le remplace hors ligne.',
      'Les plages de référence tiennent dans un seul fichier, qu’un entraîneur peut ajuster sans toucher au pipeline.',
      'Trente-sept tests, dont un joueur synthétique à la géométrie connue, exécutés avec le lint et la compilation web en intégration continue à chaque push.',
      'Fonctionne en ligne de commande, en API REST avec progression en direct, en application web Next.js ou via une seule commande Docker Compose.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/SportiQ', demo: null },
    images: [
      {
        src: sportiqShot,
        alt: 'Page d’accueil de SportIQ invitant le joueur à déposer un extrait d’entraînement pour une analyse coup par coup',
      },
    ],
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
