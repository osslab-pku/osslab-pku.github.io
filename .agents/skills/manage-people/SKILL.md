---
name: manage-people
description: Add or update a member profile in `_people/` and its photo. Use when someone joins the lab, graduates, changes role or title, adds a personal website, or a profile photo is missing or broken.
---

# Member profiles

One file per person in `_people/`, named lowercase with no separators (`runzhihe.md`). Copy the
shape from a neighbouring file. Only the traps below are worth reading first.

## `type` decides which section they appear in

Working values: `advisor`, `phd`, `undergraduate`, `visiting`, `graduated`.

`postdoc` and `master` blocks exist in `_layouts/people-overview.html` but are **commented out**.
A profile with either type builds fine and never appears anywhere. If you need one, uncomment
that block as part of the same change and say so.

## Role changes are always two fields

```diff
-subtitle: Undergraduate (to be a Ph.D. Student)
+subtitle: 1st Year Ph.D. Student
-type: undergraduate
+type: phd
```

Changing only `subtitle` files them under the wrong heading; changing only `type` leaves a stale
title on the card. Graduating is the same shape: `type: graduated` plus a rewritten `subtitle`.

## Photos

`image` is an **absolute** URL (`https://osslab-pku.github.io/assets/images/name.jpg`), with the
file in `assets/images/`.

**Check the real filename's case with `ls`.** A photo saved as `liangliu.JPG` and referenced as
`.jpg` works on macOS and 404s on the live site. This has been fixed twice already. Prefer
lowercase `.jpg` for new files, and `placeholder.png` when no photo was supplied.

Compress before committing — see "Compress images before committing" in `AGENTS.md`. Profile
photos want 600×600 cover, around 30 KB.

## `personal_website` hides the profile page

When set, the card links out to that URL instead of the person's page here, so the file's body
becomes unreachable. Only set it when that is what the person wants.
