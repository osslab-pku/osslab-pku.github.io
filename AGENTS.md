# osslab-pku.github.io

The public website of the Open Source Software Data Analytics Lab at Peking University, served at
<https://osslab-pku.org>. Jekyll, built on a **vendored fork** of bulma-clean-theme — `_layouts/`,
`_includes/` and `_sass/` live in this repo and are edited in place, which is why `_config.yml` has
no `theme:` key.

The upstream theme's leftovers (`bulma-clean-theme.gemspec`, `README-bulma-clean-theme.md`,
`page-1.md`…`page-5.md`, `showcase.md`, `changelog.txt`) are inherited clutter, not part of the site.

## Scripts never write content

**No script here may create, edit, or delete site content** — anything under `_posts/`, `_people/`,
`_publication/`, `_project/`, `_pages/`, `_data/`, or `index.md`. Scripts set up the environment and
build the site, nothing more. A script may *fetch and report* (`check-publications.mjs` queries
OpenAlex and prints what is missing), but the decision and the edit stay with the agent.

**Why:** the judgement is the work. Whether a poster or a Chinese-language article belongs on the
publication list is not a call an API can make, and the venue strings the lab refined by hand beat
the upstream ones. The previous generator, `get_pub.py`, overwrote curated entries on every run.

**How to apply:** when a task looks scriptable, write the knowledge into a skill and let an agent
read it. If a script genuinely helps, make it read-only and have it print a report.

## Commands

```shell
npm install     # one-shot setup: Bulma, a pinned Ruby via mise, and all gems
npm run dev     # serve at localhost:4000 with live reload
npm run build   # build once into _site/
```

`npm install` runs `scripts/setup.mjs` via the `prepare` hook. Ruby comes from an existing 3.3.x on
`PATH`, otherwise `mise` installs the version in `.ruby-version`. Gems live in `vendor/bundle`.

Deployment is `.github/workflows/pages.yml`: push to `master` publishes, pull requests build as a
check. Requires the repo's Pages source set to "GitHub Actions".

## Skills

Read the relevant skill in `.agents/skills/` before editing — each records traps that let content
build cleanly and then not appear.

This file and `.agents/` are the canonical copies; `CLAUDE.md` and `.claude/` are symlinks to them,
so any agent that looks for either convention finds the same instructions. Edit the `.agents`
versions — editing through the symlink works, but keep new files on that side.

| Task | Skill |
| --- | --- |
| Member profiles and photos | `manage-people` |
| Publication list | `manage-publications` |
| News and paper announcements | `post-lab-news` |
| Project and tool pages | `manage-projects` |
| Layouts, includes, Sass, `_config.yml` | `edit-site-theme` |

## Content model

| What | Where | Rendered at |
| --- | --- | --- |
| Home page | `index.md` | `/` |
| Standalone pages | `_pages/*.md` (permalink in front matter) | `/people/`, `/publications/`, … |
| News | `_posts/YYYY-MM-DD-Slug.md` | `/posts/` (paginated, 5/page) |
| Member profiles | `_people/<name>.md` | `/people/` |
| Publications | `_publication/*.md` | `/publications/` |
| Projects | `_project/YYYY-MM-DD-Name.md` | `/projects/` |
| Nav and footer menus | `_data/*.yml` | site chrome |

`people`, `publication` and `project` are collections declared in `_config.yml`.

## Compress images before committing

`assets/images/` is served as-is, and photos arrive straight from a phone or camera — one profile
picture was a 10 MB 3288×3288 PNG named `.jpg`. Aim for **~100 KB**.

```shell
# square profile photo -> 600x600, ~30 KB
npx -y sharp-cli -i photo.jpg -o out/ --format jpeg --quality 82 --mozjpeg resize 600 600 --fit cover
# screenshot or diagram -> keep dimensions, palette the PNG
npx -y sharp-cli -i shot.png -o out/ --format png --palette --effort 9
# wide photo -> cap the long edge
npx -y sharp-cli -i wide.jpg -o out/ --format jpeg --quality 80 --mozjpeg resize 1400 --withoutEnlargement
```

It cannot write in place, so output to a temp directory and move the file back. It also names the
output by the image's *real* format and lowercases the extension, so check the filename still
matches what the page references. Chain commands with `--` (`resize 600 600 -- flatten "#ffffff"`,
needed when flattening alpha onto white for JPEG).

## Things that will bite you

- **Bulma's Sass is imported from `node_modules/`** by `_sass/_main.scss`, so an npm install must
  precede any Jekyll build — CI included. That is why the workflow has a Node step.
- **`exclude:` in `_config.yml` replaces Jekyll's defaults**, so every new top-level developer file
  must be added there or it gets published.
- **`_config.yml` is not hot-reloaded.** Restart the server.
- **macOS system Ruby (2.6) cannot build this site** — the CLT SDK ships no headers for it, so
  native gems never compile. Never suggest `sudo gem install`.
- **mise's Ruby needs `mise` on `PATH`**; its RubyGems hook shells out to it, and without it
  `bundle install` dies with `No such file or directory - mise`. `scripts/lib/env.mjs` handles this.
- **DBLP is unusable from scripts** — proof-of-work bot challenge. Publication data now comes from
  OpenAlex and Crossref.
