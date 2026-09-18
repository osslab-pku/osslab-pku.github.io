#!/usr/bin/env node
// Installs the Ruby toolchain the site needs. Runs automatically after
// `npm install` (via the "prepare" lifecycle script), or on demand with
// `npm run setup`.
//
// With --soft, a failure prints guidance but exits 0, so that a missing Ruby
// does not make `npm install` itself look broken.

import { RUBY_VERSION, root, run, rubyEnv } from "./lib/env.mjs";

const soft = process.argv.includes("--soft");

// Continuous integration provisions Ruby itself; don't duplicate the work.
if (process.env.CI) {
  console.log("CI detected — skipping local Ruby setup.");
  process.exit(0);
}

function fail(message) {
  console.error(`\n  Setup incomplete: ${message}\n`);
  console.error("  You can retry with `npm run setup`. Note that you do not need a");
  console.error("  local build to contribute — pushing a branch runs the same build");
  console.error("  in CI, and the pull request will tell you if it breaks.\n");
  process.exit(soft ? 0 : 1);
}

const ruby = rubyEnv({ autoInstall: true });
if (!ruby) {
  fail(`could not provision Ruby ${RUBY_VERSION}.`);
}

console.log(`Ruby ${ruby.version} — ${ruby.source}`);

// Keep gems inside the repo (vendor/bundle) rather than in a shared system
// directory. No sudo, and nothing leaks between projects.
if (run("bundle", ["config", "set", "--local", "path", "vendor/bundle"], ruby.env) !== 0) {
  fail("could not configure bundler.");
}

console.log("Installing gems...");
if (run("bundle", ["install"], ruby.env) !== 0) {
  fail("`bundle install` failed. Scroll up for the gem that broke.");
}

console.log(`
  Ready.

      npm run dev     start the site at http://localhost:4000 with live reload
      npm run build   build once into _site/
`);
