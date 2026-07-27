const THRESHOLD = 0.12;

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function tf(tokens) {
  const map = {};
  tokens.forEach((token) => {
    map[token] = (map[token] || 0) + 1;
  });

  const count = tokens.length || 1;
  Object.keys(map).forEach((key) => {
    map[key] /= count;
  });

  return map;
}

function buildIndex(faqs) {
  const documentCount = faqs.length;
  const documentFrequency = {};
  const tokenSets = faqs.map((faq) => tokenize(`${faq.q} ${faq.a}`));

  tokenSets.forEach((tokens) => {
    new Set(tokens).forEach((token) => {
      documentFrequency[token] = (documentFrequency[token] || 0) + 1;
    });
  });

  const idf = {};
  Object.keys(documentFrequency).forEach((token) => {
    idf[token] = Math.log((documentCount + 1) / (documentFrequency[token] + 1)) + 1;
  });

  const vectors = tokenSets.map((tokens) => {
    const termFrequency = tf(tokens);
    const vector = {};
    Object.keys(termFrequency).forEach((token) => {
      vector[token] = termFrequency[token] * (idf[token] || 0);
    });
    return vector;
  });

  return { idf, vectors };
}

function vectorize(text, idf) {
  const termFrequency = tf(tokenize(text));
  const vector = {};
  Object.keys(termFrequency).forEach((token) => {
    vector[token] = termFrequency[token] * (idf[token] || 0);
  });
  return vector;
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  Object.keys(a).forEach((key) => {
    magnitudeA += a[key] * a[key];
    if (b[key]) {
      dot += a[key] * b[key];
    }
  });

  Object.keys(b).forEach((key) => {
    magnitudeB += b[key] * b[key];
  });

  if (!magnitudeA || !magnitudeB) {
    return 0;
  }

  return dot / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

export function bestMatch(query, faqs) {
  if (!faqs.length) {
    return { faq: null, score: 0 };
  }

  const { idf, vectors } = buildIndex(faqs);
  const queryVector = vectorize(query, idf);

  let bestFaq = null;
  let bestScore = -1;

  faqs.forEach((faq, index) => {
    const score = cosineSimilarity(queryVector, vectors[index]);
    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  });

  return { faq: bestFaq, score: bestScore };
}

export { THRESHOLD };
