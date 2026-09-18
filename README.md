# osslab-pku.github.io

The website of the Open Source Software Data Analytics Lab at Peking University — <https://osslab-pku.org>

## Getting started

You need **Node 18+**. That is all — Ruby and Jekyll are installed for you.

```shell
git clone https://github.com/osslab-pku/osslab-pku.github.io.git
cd osslab-pku.github.io
npm install     # installs Bulma, a pinned Ruby, and all gems (~30s)
npm run dev     # http://localhost:4000, reloads as you save
```

Do **not** use the Ruby that comes with macOS. It is version 2.6, and the Command Line
Tools SDK ships no headers for it, so Jekyll's native gems cannot compile against it.
`npm install` sidesteps this by fetching a precompiled Ruby (via [mise](https://mise.jdx.dev/))
into `~/.local/share/mise`. Your system Ruby is left untouched. If you already run a
Ruby 3.3.x of your own, it is used as-is.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Serve at <http://localhost:4000> with live reload |
| `npm run build` | Build once into `_site/` |
| `npm run setup` | Re-run the Ruby/gem install if something breaks |
| `npm run clean` | Delete `_site/` and caches |

Extra flags pass through, e.g. `npm run dev -- --port 4001`.

**You do not need a local build to contribute.** Opening a pull request runs the same
build in CI and tells you if anything broke.

## Updating the site

Most changes are one Markdown file in the right folder.

| What | Where |
| --- | --- |
| Home page | `index.md` |
| Other pages | `_pages/` |
| News and announcements | `_posts/` |
| Member profiles | `_people/` (+ photo in `assets/images/`) |
| Publications | `_publication/` |
| Projects | `_project/` |
| Nav and footer menus | `_data/` |

On member profiles, the `type:` field decides which section of the People page you land
in: `advisor`, `phd`, `undergraduate`, `visiting`, or `graduated`. The `postdoc` and
`master` sections are commented out in `_layouts/people-overview.html` — uncomment them
before using those values, or the person silently will not appear.

To refresh the publication list in bulk from OpenAlex and Crossref:

```shell
node .agents/skills/manage-publications/scripts/check-publications.mjs
```

It only reports — it never edits anything. Entries are written by hand, so that
judgement calls (is this poster worth listing? is the venue string right?) stay
with a person. Replaces the old `get_pub.py`; DBLP now blocks scripted access.

If you want to make major changes to style, layout, or features, please open a pull
request and ask the current site maintainer to review. Some interesting directions:

1. A better looking publication list.
2. Richer personal profile pages, good enough to host a personal site inside ours.

## Deployment

Pushing to `master` builds and publishes the site via GitHub Actions
(`.github/workflows/pages.yml`). Pull requests run the same build as a check without
publishing.

This requires **Settings → Pages → Source** to be set to **GitHub Actions**.

## How the build fits together

Jekyll renders the Markdown and Liquid templates. The theme is a vendored fork of
[bulma-clean-theme](https://github.com/chrisrhymes/bulma-clean-theme), so `_layouts/`,
`_includes/`, and `_sass/` are edited directly here rather than pulled from a gem.

`_sass/_main.scss` imports Bulma's Sass source straight out of `node_modules/`, which is
why the build needs npm as well as Ruby.

Gem versions come from the `github-pages` gem, which pins Jekyll and every plugin to
exactly what GitHub Pages uses, and `Gemfile.lock` is committed so everyone builds
identically. `.ruby-version` is the single source of truth for the Ruby version, shared
by local setup and CI.

## Reference documentation

1. [Jekyll](https://jekyllrb.com/)
2. [Bulma](https://bulma.io/)
3. [Original Bulma theme repo](https://github.com/chrisrhymes/bulma-clean-theme/)
