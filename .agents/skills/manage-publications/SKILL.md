---
name: manage-publications
description: Add or update entries in the publication list (`_publication/`), or check the whole list against OpenAlex and Crossref. Use when a paper is accepted or published, a DOI is issued, or publication metadata needs fixing.
---

# Publication list

One file per paper in `_publication/`, **front matter only** — the body stays empty.
`_layouts/publication.html` renders the collection sorted by `year`, newest first. Copy the
shape from a neighbouring file; `author` uses BibTeX-style ` and ` separators and `year` is
quoted.

Filenames vary (`2026-04-15-ICSE-CVE.md`, `2024-10.1145-3690632.md`). Nothing depends on them
beyond uniqueness — do not rename existing files.

For a single paper, write the file by hand. Never invent a DOI, page range, venue, or
co-author list.

## Papers with no DOI yet

The layout emits the DOI unconditionally, so `doi: ''` renders a dead link to `https://doi.org/`
labelled `DOI:` with nothing after it. Include the key anyway — omitting it looks the same — and
tell the user it stays that way until the DOI is issued.

Leave these placeholder entries in place. `check-publications.mjs` matches them by title and
flags them once the DOI exists.

A just-accepted paper belongs on the list before any index knows about it. OpenAlex and Crossref
will not have it yet, and an arXiv preprint is not the publication — so neither wait for the DOI
nor drop the paper. Write the entry with `doi: ''` from the title and the full author list **as
the user gives them**; if they only name the paper, ask. Do not lift the authors from the lab
news post or the preprint: posts congratulate one or two students by first name, and a preprint
title is often not the accepted one. The venue and its dates are ordinary facts about the
conference and are safe to look up.

## Bulk check

```shell
node .agents/skills/manage-publications/scripts/check-publications.mjs   # --since, --json
```

Read-only, zero dependencies, and it must stay read-only (see "Scripts never write content" in
`AGENTS.md`). It reports; you decide and edit. It combines OpenAlex (discovery, DOI, authors,
pages) with Crossref (venue name, which OpenAlex leaves null on most conference papers).

| Report section | Action |
| --- | --- |
| DOI now issued | Edit that placeholder file, do not create a new one |
| Not in the list | Candidates needing judgement — see below |
| In the list but missing fields | Usually just `pages` |
| Already listed under a different DOI | Upstream duplicate (ACM and IEEE both mint DOIs); ignore |
| Ignored — not publications | arXiv preprints, Zenodo artifacts |

### What the report cannot decide

- Posters, demo-track and workshop papers look identical to full papers. Chinese-language
  articles appear too. Whether they belong is the lab's call — work through the candidates with
  the user rather than adding them all.
- **A paper the lab did not lead does not belong here**, even with Prof. Zhou as a co-author —
  this list is the lab's own work, not every collaboration she joins. The signal is another
  group's paper she was invited onto: someone else's student first, Prof. Zhou in the middle of
  the author list, and no one else from the lab. Check the names against `_people/` — but as a
  prompt to ask, never as a filter to delete by. `_people/` holds current members and only some
  alumni, so early papers by former students read as external when they are not. Leave a new
  candidate off when it looks like this; propose removals to the user rather than making them.
- **Upstream venue strings are often worse than the ones in the repo.** Crossref gives
  "Proceedings of the 34th ACM International Conference on the Foundations of Software
  Engineering" where the lab wrote "Demonstrations Track of…". Never replace a hand-written
  `proceeding` with the upstream one, and leave keys the report does not mention alone —
  hand-added PDF and slide links live there.

## Author disambiguation

OpenAlex merges researchers who share a name: its "Minghui Zhou" entity also holds nuclear
physics, metallurgy and ornithology papers. The script filters on institution **and** field
together; dropping either pollutes the results badly.
