// ORACLE and PIF AI are proprietary work projects.
//
// CONFIDENTIALITY BOUNDARY — approved by Ramy Lazghab, 2026-07-29.
// This copy is deliberately vague and must NOT be expanded. Do not add
// pipeline steps, named data sources, document counts, model architectures,
// retrieval strategy, prompt design, validation logic, client names, or any
// performance figure. Adding implementation detail here is a confidentiality
// regression, not an improvement.
//
// These entries intentionally have NO `slug` field: they render on the
// homepage only and must never acquire a case-study page.

const experience = [
  {
    id: 'oracle',
    title: 'ORACLE',
    subtitle: 'Regulatory intelligence',
    problem:
      'In a heavily regulated industry, the rules change continuously, and the evidence that predicts what gets restricted next is scattered across a large body of scientific and legal literature plus fast-moving public sources. No team can track that manually at the volume it arrives. Finding out late means reformulating a product under deadline instead of planning for it.',
    role: [
      'I worked on the AI side of an internal regulatory intelligence platform, where three things work together.',
      'First, a retrieval layer over a large curated document corpus, so the system answers questions with evidence drawn from real source material rather than generating plausible-sounding text.',
      'Second, a set of autonomous agents I designed and orchestrated to continuously gather live information from public sources and convert it into structured signals the rest of the system can use, turning a constantly moving external picture into something measurable.',
      'Third, machine learning models I trained on those signals to produce forward-looking risk predictions, rather than only describing the present.',
      'On top of that I built the explanation layer: LLMs that articulate why a model reached a given prediction and generate a supporting visual for each contributing factor. That mattered more than it sounds. The people who act on these predictions are regulatory specialists, not ML engineers, and a forecast they cannot interrogate is a forecast they will not use.',
    ],
    tech: ['Multi-agent orchestration', 'LangGraph', 'RAG', 'Qdrant', 'XGBoost', 'Anthropic API', 'Streamlit'],
  },
  {
    id: 'pif-ai',
    title: 'PIF AI',
    subtitle: 'Generative document intelligence',
    problem:
      'Regulatory compliance dossiers are slow, manual document work. Someone reads scattered customer-supplied material, extracts what matters, and rewrites it into a fixed, auditable structure, then does it again for the next product. It is expensive, and it is exactly the kind of work where a small oversight surfaces later in an audit.',
    role: [
      'I built a generative AI system that produces these dossiers automatically. It reads the customer’s source documents, interprets what is in them, and renders the required structured document from that content.',
      'Because the output is a compliance artifact rather than a draft, generation on its own is not sufficient, because plausible is not the same as correct. So the system also runs validation agents that check what was produced, and sits behind a human review workflow where a reviewer can accept or regenerate any individual part of the document instead of discarding the whole thing and starting again.',
      'It shipped as part of the company’s production web application, as a feature real customers use.',
    ],
    tech: ['Generative AI', 'LLM document understanding', 'RAG', 'Validation agents', 'Anthropic API'],
  },
];

export default experience;
