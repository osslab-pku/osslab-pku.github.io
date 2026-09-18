#!/usr/bin/env node
// Thin wrapper that runs `bundle exec jekyll <args>` against the pinned Ruby,
// with friendly errors when the environment has not been set up yet.
//
// Extra flags pass straight through, e.g.
//     npm run dev -- --host 0.0.0.0

import { existsSync } from "node:fs";
import { explainMissingSetup, paths, run, rubyEnv } from "./lib/env.mjs";

if (!existsSync(paths.bulma)) {
  explainMissingSetup("Bulma is missing from node_modules/ — the stylesheets cannot compile.");
  process.exit(1);
}

const ruby = rubyEnv();
if (!ruby) {
  explainMissingSetup("No suitable Ruby found.");
  process.exit(1);
}

if (!existsSync(paths.gems)) {
  explainMissingSetup("Gems are not installed yet.");
  process.exit(1);
}

process.exit(run("bundle", ["exec", "jekyll", ...process.argv.slice(2)], ruby.env));
