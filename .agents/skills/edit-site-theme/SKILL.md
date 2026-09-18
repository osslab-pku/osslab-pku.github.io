---
name: edit-site-theme
description: Change the site's look or structure — `_layouts/`, `_includes/`, `_sass/`, `_data/`, `_config.yml`. Use for restyling, nav changes, people-page sections, or adding a collection.
---

# Theme and layout changes

The theme is a vendored fork of bulma-clean-theme: `_layouts/`, `_includes/` and `_sass/` are
edited in place, there is no gem to upgrade, and `_config.yml` has no `theme:` key.

Changes here affect every page. Prefer the smallest Liquid edit that works — this site is
deliberately maintainable by a student who has never seen Jekyll, so a framework or build step
added here is a cost the lab pays for years.

## Sass

`assets/css/app.scss` needs its empty front matter (`---` twice) or Jekyll will not compile it.

`_sass/_main.scss` sets Bulma variables **before** `@import "../node_modules/bulma/bulma.sass"`,
so overrides placed below that line do nothing. Bulma's source is read from `node_modules/`,
which is why `npm install` must precede any build, CI included.

Output is `compressed`, so check the rendered page rather than the CSS.

## Commented-out sections

`_layouts/people-overview.html` has its `postdoc` and `master` sections commented out; profiles
with those types silently vanish. Uncomment the block rather than working around it, and say so.

## `_config.yml`

Jekyll does not hot-reload it — restart `npm run dev` after any change.

`exclude:` **replaces** Jekyll's defaults rather than extending them, so every new top-level
developer file has to be added there. This is how `README.md`, `get_pub.py` and a 1.4 MB
`screenshot.png` used to end up on the public site.

## Verify

Theme edits break pages you were not looking at. After `npm run build`, click through `/`,
`/people/`, `/publications/`, `/projects/`, `/posts/`, and one individual post. Push a branch
rather than committing structural changes straight to `master`.
