# frozen_string_literal: true

source "https://rubygems.org"

# The `github-pages` gem pins Jekyll and every plugin to exactly the versions
# GitHub Pages itself builds with, so a site that builds locally builds in CI.
# Upgrade deliberately with `bundle update github-pages`, never casually.
gem "github-pages", group: :jekyll_plugins

# Ruby 3.x dropped webrick from stdlib; `jekyll serve` still needs it.
gem "webrick", "~> 1.8"
