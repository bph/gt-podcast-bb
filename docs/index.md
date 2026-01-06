---
layout: default
title: Home
---

# GT Podcast Block Bindings

**Make podcast data available in WordPress block themes**

GT Podcast Block Bindings is a WordPress plugin that seamlessly integrates podcast metadata with the WordPress block editor. It allows content creators to display podcast episode and series information in block-based themes without writing code.

[![Test on WordPress Playground](https://raw.githubusercontent.com/bph/gt-podcast-bb/main/assets/Test-on-WordPress-Playground.svg)](https://playground.wordpress.net?blueprint-url=https://raw.githubusercontent.com/bph/gt-podcast-bb/refs/heads/main/_blueprint/blueprint.json)

[![WordPress Plugin Version](https://img.shields.io/badge/version-0.3.6-blue.svg)](https://github.com/bph/gt-podcast-bb)
[![WordPress Version](https://img.shields.io/badge/WordPress-6.8%2B-green.svg)](https://wordpress.org/)
[![License](https://img.shields.io/badge/license-GPL--2.0%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

---

## Features

### 📊 Block Bindings for Podcast Data
Connect WordPress blocks to podcast metadata from the [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/) plugin:
- Episode recording dates
- Download links
- Podcast descriptions
- Cover images and logos

### 🎨 Block Variations
Pre-configured blocks that automatically bind to podcast data:
- Episode Recording Date
- Podcast Description
- Episode Cover Image
- Podcast Logo
- Episode Download Button
- Episode Audio Player

### 🔗 Social Media Icons
Custom social link variations for major podcast platforms:
- Apple Podcasts
- Spotify
- Pocket Casts
- CastBox
- Podbean
- Podchaser

### 📄 Archive Template
Ready-made template for podcast series pages displaying all episodes with metadata.

---

## Quick Start

```bash
# Install via WordPress
1. Download the plugin
2. Upload to /wp-content/plugins/
3. Activate the plugin
4. Install Seriously Simple Podcasting
5. Start using podcast block variations!
```

[Get Started →](getting-started.md){: .btn}

---

## Requirements

- **WordPress:** 6.8 or higher
- **PHP:** 7.4 or higher
- **Gutenberg Plugin:** v21.1+ (or WordPress 6.9+)
- **Required Plugin:** [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/)

---

## Documentation

<div class="grid">
  <div class="card">
    <h3>📖 Getting Started</h3>
    <p>Install and configure the plugin</p>
    <a href="getting-started.html">Read Guide →</a>
  </div>

  <div class="card">
    <h3>🎯 Usage Guide</h3>
    <p>Learn how to use block bindings and variations</p>
    <a href="usage.html">View Examples →</a>
  </div>

  <div class="card">
    <h3>🔧 API Reference</h3>
    <p>Technical documentation for developers</p>
    <a href="api-reference.html">Browse API →</a>
  </div>

  <div class="card">
    <h3>💻 Development</h3>
    <p>Contribute to the plugin</p>
    <a href="development.html">Start Coding →</a>
  </div>
</div>

---

## Live Demo

Try the plugin instantly with WordPress Playground:

[![Test it with Playground](https://raw.githubusercontent.com/bph/gt-podcast-bb/main/assets/Test-on-WordPress-Playground.svg)](https://playground.wordpress.net?blueprint-url=https://raw.githubusercontent.com/bph/gt-podcast-bb/refs/heads/main/_blueprint/blueprint.json)

---

## Screenshots

![Podcast Archive Page](https://raw.githubusercontent.com/bph/gt-podcast-bb/main/assets/POC-podcast-archive-page.png)
*Podcast archive page showing episodes with metadata*

![Block Variations](https://raw.githubusercontent.com/bph/gt-podcast-bb/main/assets/podcast-description-logo.png)
*Podcast block variations in the inserter*

---

## Support

- **Issues:** [GitHub Issues](https://github.com/bph/gt-podcast-bb/issues)
- **WordPress.org:** [Plugin Support Forum](https://wordpress.org/support/plugin/gt-podcast-bb/)
- **Author:** [Birgit Pauli-Haack](https://icodeforapurpose.com/about)

---

## License

This plugin is licensed under the [GPL v2 or later](https://www.gnu.org/licenses/gpl-2.0.html).

---

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.card {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 1.5rem;
  background: #f6f8fa;
}

.card h3 {
  margin-top: 0;
  color: #0366d6;
}

.card a {
  color: #0366d6;
  text-decoration: none;
  font-weight: 600;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #0366d6;
  color: white !important;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.btn:hover {
  background: #0256c7;
}
</style>
