---
name: manage-projects
description: Add or update a project page in `_project/`. Use when showcasing a lab tool, bot, or dataset, or refreshing an existing project page.
---

# Project pages

One file per project in `_project/`, named `YYYY-MM-DD-Name.md`. Copy the front matter from
`2022-07-30-GFI-Bot.md`; `github` and `website` are optional, so omit rather than empty them.

The body is README-style prose, usually lifted from the project's own repository. Badges work.

## Rewrite the links

Nearly every past commit on these pages is a link fix. A README's relative links resolve against
the project's page URL on this site, not against GitHub, so:

- `[docs](docs/setup.md)` → absolute URL into the repo
- relative images → `https://raw.githubusercontent.com/...` or a file in `assets/images/`

Check each link after pasting. Broken URLs build perfectly happily.
