# GT Podcast Block Bindings Documentation

This directory contains the source files for the [GT Podcast Block Bindings documentation site](https://bph.github.io/gt-podcast-bb/).

## Documentation Site

The documentation is hosted on GitHub Pages using Jekyll. Visit: **[bph.github.io/gt-podcast-bb](https://bph.github.io/gt-podcast-bb/)**

## Structure

```
docs/
├── _config.yml          # Jekyll configuration
├── index.md             # Documentation home page
├── getting-started.md   # Installation and setup guide
├── usage.md             # Usage guide with examples
├── api-reference.md     # Technical API documentation
├── development.md       # Development and contributing guide
├── faq.md               # Frequently asked questions
└── changelog.md         # Version history
```

## Pages

- **[Home](https://bph.github.io/gt-podcast-bb/)** - Overview and quick start
- **[Getting Started](https://bph.github.io/gt-podcast-bb/getting-started)** - Installation instructions
- **[Usage Guide](https://bph.github.io/gt-podcast-bb/usage)** - How to use the plugin
- **[API Reference](https://bph.github.io/gt-podcast-bb/api-reference)** - PHP and JavaScript API
- **[Development](https://bph.github.io/gt-podcast-bb/development)** - Contributing guide
- **[FAQ](https://bph.github.io/gt-podcast-bb/faq)** - Common questions
- **[Changelog](https://bph.github.io/gt-podcast-bb/changelog)** - Version history

## Building Locally

To preview the documentation site locally:

### Prerequisites

- Ruby 2.7+
- Bundler

### Setup

```bash
cd docs/

# Install Jekyll and dependencies
gem install bundler jekyll
bundle install

# Serve locally
bundle exec jekyll serve

# View at http://localhost:4000/gt-podcast-bb/
```

### With Docker

```bash
# From project root
docker run --rm -v "$PWD/docs:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve
```

## Updating Documentation

### Editing Pages

1. Edit the Markdown files in `docs/`
2. Commit and push to GitHub
3. GitHub Pages automatically rebuilds the site

### Testing Changes Locally

```bash
# Start local server
bundle exec jekyll serve

# Visit http://localhost:4000/gt-podcast-bb/
# Changes auto-reload
```

## GitHub Pages Settings

The site is configured to build from the `docs/` folder on the `main` branch.

**GitHub Repository Settings:**
```
Settings → Pages
Source: Deploy from a branch
Branch: main
Folder: /docs
```

## Theme

The site uses the **Cayman** Jekyll theme.

Other available themes:
- minima
- jekyll-theme-slate
- jekyll-theme-architect
- jekyll-theme-tactile

To change the theme, edit `_config.yml`:
```yaml
theme: jekyll-theme-name
```

## Front Matter

All pages include Jekyll front matter:

```yaml
---
layout: default
title: Page Title
---
```

## Markdown Features

The documentation uses GitHub Flavored Markdown (GFM):

- Tables
- Syntax highlighting
- Task lists
- Autolinks
- Strikethrough

## Contributing

To contribute to the documentation:

1. Fork the repository
2. Create a branch for your changes
3. Edit the relevant `.md` files in `docs/`
4. Submit a pull request

See the [Development Guide](development.md) for more details.

## Links

- **Live Site:** [bph.github.io/gt-podcast-bb](https://bph.github.io/gt-podcast-bb/)
- **Repository:** [github.com/bph/gt-podcast-bb](https://github.com/bph/gt-podcast-bb)
- **Jekyll Docs:** [jekyllrb.com](https://jekyllrb.com/)
- **GitHub Pages:** [docs.github.com/pages](https://docs.github.com/pages)
