---
name: post-lab-news
description: Write a news announcement in `_posts/` — paper accepted, award, talk, tool release. Use when someone wants lab news posted or an existing announcement updated.
---

# News posts

Short announcements in `_posts/`, most often a paper acceptance. Copy the front matter from a
neighbouring file.

A paper acceptance usually needs **two** changes: a post here and an entry in `_publication/`
(see `manage-publications`). Ask if the user only requested one.

## Filename

Must start with a date — `_posts/2026-07-30-ASE.md`. Jekyll silently ignores files that do not,
and a future date hides the post until then. The slug is a short venue name, not the headline.

## Body

Follow `_posts/2026-07-30-ASE.md`:

1. One paragraph naming who did the work, the venue in full, and a congratulation.
2. `**Paper:**` — title linked to the official page.
3. The abstract, as one paragraph.
4. `## Related Resources` — preprint, blog post, talk, artifact.

Plain and factual, no marketing adjectives.

Venue names, track names, co-author lists and arXiv IDs are all things people will notice are
wrong. Use what you were given and ask for the rest. If you have the paper link, fetch the
abstract rather than paraphrasing from memory.
