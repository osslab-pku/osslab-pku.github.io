# osslab-pku.github.io

The website of Open Source Software Data Analytics Lab at Peking University

## Update Information

1. Main Page: `index.md`
2. Other Pages: `_page/` folder.
3. Personal Information: `_people/` folder.
4. News: `_posts/` folder.

If you want to make major changes in style, layout, or add new features, please open a pull request and ask for current site maintainer for review. Some interesting directions includes

1. Make a better looking publication list. (Probably by adding to a collection, some new includes and layouts)
2. Give new features to personal profile page, making it suitable for hosting a good enough personal website inside our website.

## Development

I hope that this website should be as simple as possible, and should be easy to maintain and update even if the original creator has gone.
Therefore, I choose to generate static websites from templates using [jekyll](https://jekyllrb.com/).

First you need to install [Ruby Gem](https://rubygems.org/) and [Bundler](https://bundler.io/), then

```shell script
bundle
```

To test this website locally, use

```
bundle exec jekyll serve
```

## Reference Documentation

1. [jekyll](https://jekyllrb.com/).
2. [bulma](https://bulma.io/).
3. [Original Bulma Theme Repo](https://github.com/chrisrhymes/bulma-clean-theme/)