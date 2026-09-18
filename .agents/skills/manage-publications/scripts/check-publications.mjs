#!/usr/bin/env node
// Report how _publication/ differs from the lab's published record.
//
// READ-ONLY BY DESIGN. This script never creates, edits, or deletes a file. It
// fetches metadata, compares it with what is already in _publication/, and
// prints what it found. Deciding what belongs on the list and writing the files
// is the agent's job, not the script's — a poster, a demo-track paper, a
// workshop paper, and a Chinese-language article all look identical to an API,
// and the venue strings the lab has refined by hand are better than the ones
// upstream returns.
//
// Replaces the old get_pub.py, which scraped DBLP. DBLP now sits behind a
// proof-of-work bot challenge, so scripted access there no longer works at all.
//
// Two sources, each used for what it is actually good at:
//   OpenAlex  discovers the works and gives DOI, authors, year, page range.
//             Free, no key, no auth.
//   Crossref  resolves the venue name by DOI. OpenAlex leaves `source` null on
//             most conference papers, and the venue is the one field this
//             site's publication list cannot do without.
//
// Zero dependencies — Node 18+ built-in fetch only. No pip install.
//
//   node .agents/skills/manage-publications/scripts/check-publications.mjs
//   node .agents/skills/manage-publications/scripts/check-publications.mjs --since 2024
//   node .agents/skills/manage-publications/scripts/check-publications.mjs --json

import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

// --- Who and what to look up -------------------------------------------------
//
// OpenAlex merges different researchers who share a name: the author entity for
// "Minghui Zhou" also contains nuclear physics, metallurgy and ornithology
// papers by other people. Filtering on institution AND field is what separates
// the lab's actual output, so do not drop either filter.

const AUTHOR = "A5065977454"; // Minghui Zhou — https://openalex.org/A5065977454
const INSTITUTION = "I20231570"; // Peking University
const FIELD = "fields/17"; // Computer Science
const TYPES = ["article", "conference-paper", "review"];
const CONTACT = "osslab@pku.edu.cn"; // OpenAlex/Crossref polite pool

// Registrants that mint DOIs for preprints, datasets and replication packages.
// Not publications, though OpenAlex types several of them as plain "article".
const NOT_A_PAPER = {
  "10.48550": "arXiv preprint",
  "10.5281": "Zenodo artifact",
  "10.6084": "figshare artifact",
  "10.31219": "OSF preprint",
};

const PUBLICATION_DIR = resolve(process.argv[1], "../../../../../_publication");

// The fields an entry in this collection is expected to carry.
const FIELDS = ["author", "doi", "pages", "proceeding", "timestamp", "title", "year"];

// --- Arguments ---------------------------------------------------------------

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const option = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const asJson = has("--json");
const since = Number(option("--since", "2010"));

if (has("--help")) {
  console.log(`
  check-publications — compare _publication/ with OpenAlex + Crossref

  Reports only. Never writes. Use the report to decide what to add, then write
  the Markdown files yourself following the conventions in SKILL.md.

    --since <year>   earliest publication year (default 2010)
    --json           machine-readable output
    --help           this message
`);
  process.exit(0);
}

// --- Reading the existing entries (read-only) --------------------------------

/** Parse YAML front matter well enough to compare. Folded lines are joined. */
function parseFrontMatter(text) {
  const lines = text.split("\n");
  if (lines[0].trim() !== "---") return null;
  const end = lines.indexOf("---", 1);
  if (end === -1) return null;

  const keys = {};
  let current = null;
  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const match = /^([A-Za-z_][\w-]*):\s?(.*)$/.exec(line);
    if (match) {
      current = match[1];
      keys[current] = match[2].trim();
    } else if (current && /^\s+\S/.test(line)) {
      keys[current] = `${keys[current]} ${line.trim()}`.trim();
    }
  }
  for (const key of Object.keys(keys)) keys[key] = unquote(keys[key]);
  return keys;
}

function unquote(raw) {
  const s = raw.trim();
  if (s.length >= 2 && s[0] === s[s.length - 1] && (s[0] === "'" || s[0] === '"')) {
    return s[0] === "'" ? s.slice(1, -1).replace(/''/g, "'") : s.slice(1, -1);
  }
  return s;
}

const normalizeDoi = (doi) =>
  String(doi ?? "")
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/\\_/g, "_")
    .trim()
    .toLowerCase();

const normalizeTitle = (title) =>
  String(title ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// --- Fetching -----------------------------------------------------------------

async function getJson(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": `osslab-pku-website (mailto:${CONTACT})` },
  });
  if (response.status === 429) {
    process.stderr.write("  rate limited, waiting 5s...\n");
    await new Promise((r) => setTimeout(r, 5000));
    return getJson(url);
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return response.json();
}

async function fetchWorks() {
  const filter = [
    `author.id:${AUTHOR}`,
    `authorships.institutions.lineage:${INSTITUTION}`,
    `primary_topic.field.id:${FIELD}`,
    `type:${TYPES.join("|")}`,
    `from_publication_date:${since}-01-01`,
  ].join(",");
  const select = "id,doi,title,publication_year,publication_date,type,biblio,authorships,primary_location";

  const works = [];
  let cursor = "*";
  while (cursor) {
    const page = await getJson(
      `https://api.openalex.org/works?filter=${encodeURIComponent(filter)}` +
        `&select=${select}&per-page=200&cursor=${encodeURIComponent(cursor)}&mailto=${CONTACT}`
    );
    works.push(...page.results);
    cursor = page.results.length ? page.meta.next_cursor : null;
  }
  return works;
}

/** OpenAlex leaves `source` null on most conference papers; Crossref knows the venue. */
async function fetchVenue(doi) {
  try {
    const { message } = await getJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
    return {
      proceeding: (message["container-title"] || [])[0] || (message.event || {}).name || null,
      pages: message.page || null,
    };
  } catch {
    return { proceeding: null, pages: null };
  }
}

// --- Shaping ------------------------------------------------------------------

function pagesOf(work, crossrefPages) {
  const { first_page: first, last_page: last } = work.biblio || {};
  if (first && last) return `${first}--${last}`;
  if (crossrefPages) return crossrefPages.replace("-", "--");
  return "";
}

// --- Compare -------------------------------------------------------------------

const files = readdirSync(PUBLICATION_DIR).filter((f) => !f.startsWith("."));
const byDoi = new Map();
const byTitle = new Map();
for (const file of files) {
  const keys = parseFrontMatter(readFileSync(join(PUBLICATION_DIR, file), "utf8"));
  if (!keys) continue;
  const entry = { file, keys };
  const doi = normalizeDoi(keys.doi);
  if (doi) byDoi.set(doi, entry);
  const title = normalizeTitle(keys.title);
  if (title) byTitle.set(title, entry);
}

if (!asJson) {
  process.stderr.write(`Reading ${PUBLICATION_DIR}\n`);
  process.stderr.write(`  ${files.length} existing entries (${byDoi.size} with a DOI)\n\n`);
  process.stderr.write("Querying OpenAlex...\n");
}

const works = await fetchWorks();
if (!asJson) process.stderr.write(`  ${works.length} works since ${since}\n\n`);

const missing = [];
const incomplete = [];
const needsDoi = [];
const duplicates = [];
const excluded = [];
let ok = 0;

for (const work of works) {
  const doi = normalizeDoi(work.doi);
  if (!doi) {
    excluded.push({ title: work.title, why: "no DOI in OpenAlex" });
    continue;
  }

  const registrant = NOT_A_PAPER[doi.split("/")[0]];
  const repository = ((work.primary_location || {}).source || {}).type === "repository";
  if (registrant || repository) {
    if (!byDoi.has(doi)) excluded.push({ title: work.title, why: registrant || "repository copy" });
    continue;
  }

  const title = normalizeTitle(work.title);
  const matchedByDoi = byDoi.get(doi);
  const matchedByTitle = byTitle.get(title);
  const existing = matchedByDoi || matchedByTitle;

  let venue = ((work.primary_location || {}).source || {}).display_name || null;
  let crossrefPages = null;
  if (!venue || !existing) {
    const crossref = await fetchVenue(doi);
    venue = venue || crossref.proceeding;
    crossrefPages = crossref.pages;
    await new Promise((r) => setTimeout(r, 120)); // be polite to Crossref
  }

  const upstream = {
    author: work.authorships.map((a) => a.author.display_name).join(" and "),
    doi,
    pages: pagesOf(work, crossrefPages),
    proceeding: venue || "",
    timestamp: work.publication_date || "",
    title: work.title,
    year: String(work.publication_year),
  };

  if (!existing) {
    missing.push({ suggested: `${work.publication_year}-${doi.replace(/\//g, "-")}.md`, upstream });
    continue;
  }

  // A paper announced on acceptance has a placeholder entry with an empty DOI.
  const gaps = FIELDS.filter((f) => !existing.keys[f]).map((f) => ({ field: f, upstream: upstream[f] }))
    .filter((g) => g.upstream);

  if (!matchedByDoi && matchedByTitle) {
    // Same title, different DOI. Either the entry is a placeholder waiting for
    // its DOI, or upstream holds a second record for a paper already listed —
    // ACM and IEEE both mint DOIs for the same conference paper often enough
    // that this matters.
    if (!existing.keys.doi) {
      needsDoi.push({ file: existing.file, title: existing.keys.title, upstream, gaps });
    } else {
      duplicates.push({
        file: existing.file,
        title: existing.keys.title,
        listed: existing.keys.doi,
        upstream: upstream.doi,
      });
    }
  } else if (gaps.length) {
    incomplete.push({ file: existing.file, title: existing.keys.title, gaps });
  } else {
    ok += 1;
  }
}

// --- Output --------------------------------------------------------------------

if (asJson) {
  console.log(JSON.stringify({ missing, needsDoi, incomplete, duplicates, excluded, upToDate: ok }, null, 2));
  process.exit(0);
}

const section = (title, items, render) => {
  if (!items.length) return;
  console.log(`\n${title} (${items.length})\n${"-".repeat(title.length + 6)}`);
  items.forEach((item) => console.log(render(item)));
};

section("DOI now issued — placeholder entries to complete", needsDoi, (n) =>
  `\n  ${n.file}\n    ${n.title}\n` +
  n.gaps.map((g) => `      ${g.field}: ${g.upstream}`).join("\n")
);

section("Not in the list", missing, (m) =>
  `\n  ${m.upstream.year}  ${m.upstream.title}\n` +
  `      proceeding: ${m.upstream.proceeding || "(unknown — check the publisher)"}\n` +
  `      doi: ${m.upstream.doi}   pages: ${m.upstream.pages || "(none)"}\n` +
  `      author: ${m.upstream.author}\n` +
  `      suggested filename: ${m.suggested}`
);

section("In the list but missing fields", incomplete, (i) =>
  `\n  ${i.file}\n` + i.gaps.map((g) => `      ${g.field}: ${g.upstream}`).join("\n")
);

section("Already listed under a different DOI — no action needed unless wrong", duplicates, (d) =>
  `\n  ${d.file}\n    ${d.title}\n      listed:   ${d.listed}\n      upstream: ${d.upstream}`
);

section("Ignored — not publications", excluded, (e) => `  ${e.why.padEnd(18)} ${e.title.slice(0, 68)}`);

console.log(`
Up to date: ${ok}

This report changed nothing. Decide which of these belong on the list, then write
or edit the entries yourself — see SKILL.md for the front matter conventions and
for why upstream venue names are often worse than the ones already in the repo.
`);
