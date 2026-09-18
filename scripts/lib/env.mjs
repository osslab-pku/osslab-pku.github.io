// Shared helpers for locating a usable Ruby and running Jekyll through it.
//
// Why this exists: macOS ships Ruby 2.6, and the Command Line Tools SDK does not
// ship its headers, so native gems (eventmachine, http_parser.rb) can never
// compile against it. Rather than asking everyone to install and configure a
// Ruby version manager by hand, we pull `mise` in as an npm devDependency and
// let it drop a *precompiled* Ruby into ~/.local/share/mise. Nothing is written
// outside the repo and your home directory, and the system Ruby is left alone.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** The single source of truth for which Ruby this project uses. */
export const RUBY_VERSION = readFileSync(join(root, ".ruby-version"), "utf8").trim();

const isWindows = process.platform === "win32";

/** Run a command, streaming its output. Returns the exit code. */
export function run(cmd, args, env = process.env) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    cwd: root,
    env,
    shell: isWindows,
  });
  if (result.error) {
    throw new Error(`Could not run \`${cmd}\`: ${result.error.message}`);
  }
  return result.status ?? 1;
}

/** Run a command quietly and return trimmed stdout, or null if it failed. */
function capture(cmd, args, env = process.env) {
  const result = spawnSync(cmd, args, {
    encoding: "utf8",
    cwd: root,
    env,
    shell: isWindows,
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

/** "3.3.12" and "3.3.9" are the same series; "3.2.1" is not. */
function sameSeries(a, b) {
  const head = (v) => v.split(".").slice(0, 2).join(".");
  return head(a) === head(b);
}

/** Locate the `mise` binary: the repo's own copy first, then a global install. */
function findMise() {
  const local = join(root, "node_modules", ".bin", isWindows ? "mise.cmd" : "mise");
  if (existsSync(local)) return local;
  const found = capture(isWindows ? "where" : "which", ["mise"]);
  return found ? found.split("\n")[0].trim() : null;
}

/**
 * Resolve an environment in which `bundle` runs against the pinned Ruby.
 *
 * Returns `{ env, version, source }`, or null if no suitable Ruby could be
 * found (and `autoInstall` was off, or installing failed).
 */
export function rubyEnv({ autoInstall = false } = {}) {
  // Respect a Ruby the developer already manages themselves (Homebrew, rbenv,
  // asdf, a devcontainer image) as long as it is the right series.
  const onPath = capture("ruby", ["-e", "print RUBY_VERSION"]);
  if (onPath && sameSeries(onPath, RUBY_VERSION)) {
    return { env: process.env, version: onPath, source: "ruby already on your PATH" };
  }

  const mise = findMise();
  if (!mise) return null;

  let home = capture(mise, ["where", `ruby@${RUBY_VERSION}`]);
  if (!home) {
    if (!autoInstall) return null;
    console.log(`Installing Ruby ${RUBY_VERSION} (precompiled, ~20s, no compiler needed)...`);
    if (run(mise, ["install", `ruby@${RUBY_VERSION}`], { ...process.env, MISE_YES: "1" }) !== 0) {
      return null;
    }
    home = capture(mise, ["where", `ruby@${RUBY_VERSION}`]);
  }
  if (!home) return null;

  // mise's Ruby installs a RubyGems hook that shells out to `mise` after every
  // gem install, so mise's own directory has to be on PATH too or `bundle
  // install` dies at the very end with "No such file or directory - mise".
  const env = {
    ...process.env,
    PATH: [join(home, "bin"), dirname(mise), process.env.PATH].join(delimiter),
  };
  return { env, version: RUBY_VERSION, source: `mise (${home})` };
}

export const paths = {
  bulma: join(root, "node_modules", "bulma"),
  gems: join(root, "vendor", "bundle"),
};

/** Print the standard "your environment isn't ready" message. */
export function explainMissingSetup(what) {
  console.error(`\n  ${what}\n`);
  console.error("  Run this first:\n");
  console.error("      npm install\n");
  console.error("  That installs Ruby, the gems, and Bulma.\n");
}
