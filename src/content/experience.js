// The three entries below are proprietary work projects from an internship.
//
// CONFIDENTIALITY BOUNDARY — approved by Ramy Lazghab, 2026-07-29, tightened
// 2026-09-25 at the employer's request. This copy is deliberately vague and
// must NOT be expanded. Do not add product names, a tech stack, pipeline
// steps, named data sources, document counts, model architectures, retrieval
// strategy, prompt design, validation logic, evaluation methodology,
// competitor comparisons, client names, or any performance figure. Titles
// describe what each system does, never what it is called internally. The
// stack lives in the Skills section as a personal toolkit, not here. Adding
// implementation detail here is a confidentiality regression, not an
// improvement.
//
// These entries intentionally have NO `slug` field: they render on the
// homepage only and must never acquire a case-study page.

const experience = [
  {
    id: 'oracle',
    title: 'Regulatory intelligence',
    subtitle: 'Forecasting what gets restricted next',
    problem:
      'In a heavily regulated industry, the rules change continuously, and the evidence that predicts what gets restricted next is scattered across a large body of scientific and legal literature plus fast-moving public sources. No team can track that manually at the volume it arrives. Finding out late means reformulating a product under deadline instead of planning for it.',
    role: [
      'I worked on the AI side of an internal regulatory intelligence platform, where three things work together.',
      'First, a retrieval layer over a large curated document corpus, so the system answers questions with evidence drawn from real source material rather than generating plausible-sounding text.',
      'Second, a set of autonomous agents I designed and orchestrated to continuously gather live information from public sources and convert it into structured signals the rest of the system can use, turning a constantly moving external picture into something measurable.',
      'Third, machine learning models I trained on those signals to produce forward-looking risk predictions, rather than only describing the present.',
      'On top of that I built the explanation layer: LLMs that articulate why a model reached a given prediction and generate a supporting visual for each contributing factor. That mattered more than it sounds. The people who act on these predictions are regulatory specialists, not ML engineers, and a forecast they cannot interrogate is a forecast they will not use.',
    ],
  },
  {
    id: 'pif-ai',
    title: 'Generative document intelligence',
    subtitle: 'Compliance dossiers produced from source documents',
    problem:
      'Regulatory compliance dossiers are slow, manual document work. Someone reads scattered customer-supplied material, extracts what matters, and rewrites it into a fixed, auditable structure, then does it again for the next product. It is expensive, and it is exactly the kind of work where a small oversight surfaces later in an audit.',
    role: [
      'I built a generative AI system that produces these dossiers automatically. It reads the customer’s source documents, interprets what is in them, and renders the required structured document from that content.',
      'Because the output is a compliance artifact rather than a draft, generation on its own is not sufficient, because plausible is not the same as correct. So the system also runs validation agents that check what was produced, and sits behind a human review workflow where a reviewer can accept or regenerate any individual part of the document instead of discarding the whole thing and starting again.',
      'It was delivered to production as part of the company’s web application.',
    ],
  },
  {
    id: 'magnet',
    title: 'Public regulatory radar',
    subtitle: 'Regulatory monitoring across several industries',
    problem:
      'Regulatory intelligence tools are usually locked behind a paid subscription, and the ones that are free are curated by hand, so they cover one sector and go stale. The goal was a public tool that tracks what is moving across several regulated industries, cites its sources for every claim, and stays trustworthy without anyone curating it.',
    role: [
      'I designed and built a standalone public web service that follows regulatory developments across five regulated domains, from cosmetics and chemicals to packaging, food contact materials and agriculture, and publishes a sourced timeline for each topic without requiring an account.',
      'Rather than a hand-maintained watchlist, the system runs an automated sweep that asks each domain what moved recently, collapses the developments that surface in more than one domain so they are analysed and paid for once, and routes the rest through a multi-lane retrieval and synthesis pipeline whose output is gated by a verification step: a claim the system cannot support is dropped, not caveated.',
      'Search is a deterministic cascade that resolves ingredients and topics through exact, accent-insensitive, fuzzy and vocabulary matching before a model is ever called, so the common path is instant and free and the LLM handles only the long tail.',
      'I also built a reproducible benchmark for the pipeline, so that every change to it is measured against real output rather than assumed to help.',
    ],
  },
];

export default experience;
