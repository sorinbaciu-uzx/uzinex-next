/* eslint-disable */
// Phase 1 of per-product FAQs: extract native Q&A pairs already written in
// product descriptions (authentic author content) and write to
// data/product-faqs.json keyed by slug.
//
// Input:  data/produse.json (field: description)
// Output: data/product-faqs.json  -> { [slug]: [{q, a}, ...] }
//
// Strategy:
//  1. Locate FAQ section in description (header "Intrebari frecvente ...")
//  2. Find trailing section boundary (header "De ce UZINEX ..." or end)
//  3. Split into Q/A pairs: a question is a line ending with `?`, answer is
//     following non-empty lines until next question.
//  4. Skip any Q that matches an inline FAQ (data/product-enrichments.json)
//     to avoid same question appearing twice on the page.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = (n) => path.join(ROOT, 'data', n);

const produse = JSON.parse(fs.readFileSync(DATA('produse.json'), 'utf8'));
const enrichments = JSON.parse(fs.readFileSync(DATA('product-enrichments.json'), 'utf8'));

function normalizeQuestion(q) {
  return (q || '')
    .toLowerCase()
    .replace(/[?!.,;:"'()\[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function findFaqSection(description) {
  if (!description) return null;
  const lowered = description.toLowerCase();
  // header marker — accept with or without diacritics
  const headers = ['intrebari frecvente', 'întrebări frecvente'];
  let start = -1;
  for (const h of headers) {
    const i = lowered.indexOf(h);
    if (i >= 0 && (start === -1 || i < start)) start = i;
  }
  if (start < 0) return null;
  // Skip past the header line to body
  const afterHeader = description.indexOf('\n', start);
  if (afterHeader < 0) return null;

  // End marker: marketing/structural section headers that follow the FAQ.
  // Ordered by specificity — the FIRST match wins (smallest index). These are
  // the "De Ce să Alegi UZINEX pentru ...?" / "De ce să Achiziționezi ... de
  // la UZINEX?" boilerplates that show up across descriptions as trailing
  // marketing pitches and were being mis-parsed as FAQ entries.
  const endMarkers = [
    'de ce să alegi',
    'de ce sa alegi',
    'de ce să achiziționezi',
    'de ce sa achizitionezi',
    'de ce uzinex',
    'caracteristici tehnice',
    'specificatii tehnice',
    'contactează echipa uzinex',
    'contacteaza echipa uzinex',
  ];
  // End markers must appear AT THE START OF A LINE (as section headers), not
  // mid-sentence inside an FAQ answer. Author descriptions frequently include
  // "Contactează echipa UZINEX..." inside answers ("Contactează echipa UZINEX
  // cu aceste date înainte de comandă"). Treating that as an end marker
  // truncated some FAQ sections to only 1 Q.
  let end = description.length;
  const fromHeader = lowered.slice(afterHeader);
  for (const m of endMarkers) {
    let searchFrom = 0;
    while (searchFrom < fromHeader.length) {
      const i = fromHeader.indexOf(m, searchFrom);
      if (i < 0) break;
      // Accept only if preceded by newline (or start) — i.e. it's a section
      // header, not a continuation of an answer paragraph.
      const prevChar = i === 0 ? '\n' : fromHeader[i - 1];
      if (prevChar === '\n') {
        const absolute = afterHeader + i;
        if (absolute < end) end = absolute;
        break; // earliest header-style match wins for this marker
      }
      searchFrom = i + m.length;
    }
  }
  return description.slice(afterHeader, end).trim();
}

// Safety net: post-filter any question that is clearly a marketing section
// header (e.g. "De ce să Alegi UZINEX pentru X?"). These may have slipped
// through the end-marker detection when a local typo or spacing changed the
// exact substring — the pattern-level check catches all variants.
function isMarketingHeaderQuestion(q) {
  const s = (q || '').toLowerCase();
  // "de ce ... uzinex" with "alegi" / "achiziționezi" anywhere
  if (
    /^de ce (să |sa )?(alegi|să alegi|sa alegi|achizi[țt]ionezi|cumperi)/.test(s) &&
    /(uzinex| de la | pentru )/.test(s)
  ) {
    return true;
  }
  // Questions that mention UZINEX in the asking part are marketing pitches
  if (/^de ce\b/.test(s) && /uzinex/.test(s)) return true;
  return false;
}

function parseQAPairs(section) {
  if (!section) return [];
  // Normalize newlines, collapse 3+ blank lines to 2
  const lines = section
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''));

  const pairs = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.endsWith('?') && line.length > 15) {
      // This is a question. Collect answer lines until next `?` line or end.
      const question = line.replace(/^[•\-*]\s*/, '').trim();
      const answerParts = [];
      i++;
      while (i < lines.length) {
        const next = lines[i];
        // Next question detection: ends with `?` AND is substantial AND
        // doesn't look like a sentence inside an answer (heuristic: starts
        // with a capital letter AND has few preceding context words)
        if (next.endsWith('?') && next.length > 15 && /^[A-ZĂÂÎȘȚ]/.test(next)) {
          break;
        }
        if (next) answerParts.push(next);
        i++;
      }
      const answer = answerParts.join(' ').replace(/\s+/g, ' ').trim();
      if (answer && answer.length > 20) {
        pairs.push({ q: question, a: answer });
      }
    } else {
      i++;
    }
  }
  return pairs;
}

function getInlineFaqQuestion(slug) {
  const items = enrichments[slug] || [];
  const inline = items.find((x) => x && x.type === 'faq');
  return inline?.data?.question || null;
}

function main() {
  const result = {};
  let totalExtracted = 0;
  let productsWithFaq = 0;
  let productsSkipped = 0;

  for (const prod of produse) {
    const section = findFaqSection(prod.description);
    if (!section) {
      productsSkipped++;
      continue;
    }
    let pairs = parseQAPairs(section);

    // Remove marketing section headers that look like questions
    pairs = pairs.filter((p) => !isMarketingHeaderQuestion(p.q));

    // Exclude Q that matches the inline FAQ question (case-insensitive, normalized)
    const inlineQ = getInlineFaqQuestion(prod.slug);
    if (inlineQ) {
      const target = normalizeQuestion(inlineQ);
      pairs = pairs.filter((p) => normalizeQuestion(p.q) !== target);
    }

    // Dedup within pairs (safety)
    const seen = new Set();
    const unique = [];
    for (const p of pairs) {
      const key = normalizeQuestion(p.q);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(p);
      }
    }

    if (unique.length > 0) {
      result[prod.slug] = unique;
      productsWithFaq++;
      totalExtracted += unique.length;
    }
  }

  fs.writeFileSync(DATA('product-faqs.json'), JSON.stringify(result, null, 2));

  console.log('Phase 1 (native extraction) summary:');
  console.log('  Products processed:', produse.length);
  console.log('  Products with native FAQ extracted:', productsWithFaq);
  console.log('  Products without native FAQ (skipped):', productsSkipped);
  console.log('  Total Q&A pairs extracted:', totalExtracted);
  console.log('  Avg Q&A per product (with FAQ):', (totalExtracted / Math.max(productsWithFaq, 1)).toFixed(1));
  console.log('  Written:', DATA('product-faqs.json'));
}

main();
