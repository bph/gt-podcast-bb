# GT Podcast Block Bindings

**Make podcast data available in WordPress block themes**

[![WordPress Plugin Version](https://img.shields.io/badge/version-0.3.6-blue.svg)](https://github.com/bph/gt-podcast-bb)
[![WordPress Version](https://img.shields.io/badge/WordPress-6.8%2B-green.svg)](https://wordpress.org/)
[![License](https://img.shields.io/badge/license-GPL--2.0%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Test on WordPress Playground](assets/Test-on-WordPress-Playground.svg)](https://playground.wordpress.net?blueprint-url=https://raw.githubusercontent.com/bph/gt-podcast-bb/refs/heads/main/_blueprint/blueprint.json)

GT Podcast Block Bindings seamlessly integrates podcast metadata with the WordPress block editor. Display podcast episode and series information in block-based themes without writing code.

## 📚 Documentation

**[View Full Documentation →](https://bph.github.io/gt-podcast-bb/)**

- **[Getting Started](https://bph.github.io/gt-podcast-bb/getting-started)** - Installation and setup
- **[Usage Guide](https://bph.github.io/gt-podcast-bb/usage)** - Examples and patterns
- **[API Reference](https://bph.github.io/gt-podcast-bb/api-reference)** - Technical documentation
- **[Development](https://bph.github.io/gt-podcast-bb/development)** - Contributing guide
- **[FAQ](https://bph.github.io/gt-podcast-bb/faq)** - Common questions

## ✨ Features

### Block Bindings for Podcast Data
Connect WordPress blocks to podcast metadata from the [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/) plugin:
- Episode recording dates
- Download links
- Podcast descriptions
- Cover images and logos

### Block Variations
Pre-configured blocks for podcast data:
- Episode Recording Date
- Podcast Description
- Episode Cover Image
- Podcast Logo
- Episode Download Button
- Episode Audio Player

### Social Media Icons
Custom social link variations for podcast platforms:
- Apple Podcasts
- Pocket Casts
- CastBox
- Podbean
- Podchaser

### Archive Template
Ready-made `taxonomy-series` template for displaying podcast episodes with metadata.

## 🚀 Quick Start

1. Install and activate the plugin
2. Install [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/)
3. Configure your podcast in Podcasts → Settings
4. Use block variations in the editor or bind blocks manually

## 📋 Requirements

- **WordPress:** 6.8 or higher
- **PHP:** 7.4 or higher
- **Gutenberg Plugin:** v21.1+ (or WordPress 6.9+)
- **Required Plugin:** [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/)

## 📸 Screenshots

![Podcast Archive page](assets/POC-podcast-archive-page.png)
*Podcast archive page showing episodes with metadata*

Use block markup in the Code Editor: 
### Archive Header

### Podcast description
``` 
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"gtimes/episode-data","args":{"key":"podcast_description"}}}}} -->
  <p></p>
  <!-- /wp:paragraph -->
```
### Podcast logo
``` 
 <!-- wp:image {"metadata":{"bindings":{"url":{"source":"gtimes/episode-data","args":{"key":"podcast_image"}}}}} -->
  <figure class="wp-block-image"><img src="#" alt=""/></figure>
  <!-- /wp:image -->
  ```

## Episode Query Loop

### Cover image
```  
<!-- wp:image {"align":"left","width":"400px","height":"400px","metadata":{"bindings":{"url":{"source":"gtimes/episode-data","args":
  {"key":"cover_image"}}}}} -->
  <figure class="wp-block-image alignleft" style="width:400px;height:400px"><img src="#" alt="" 
  style="width:400px;height:400px"/></figure>
  <!-- /wp:image -->
 
  ```

### Download button
```  
<!-- wp:button {"metadata":{"bindings":{"url":{"source":"gtimes/episode-data","args":{"key":"download_link"}}}}} -->
  <div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#">Download Episode</a></div>
<!-- /wp:button -->
  ```
### Recording date
```
  <!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"gtimes/episode-data","args":{"key":"recording_date"}}}}} -->
  ```

![Podcast block variations](assets/podcast-description-logo.png)
*Podcast block variations in the inserter*

![Episode block variations](assets/Episode-recording-date-coverimage.png)
*Episode block variations*

![Episode download button](assets/Episode-download-button.png)
*Episode download button variation*

## 🧭 Plugin vs. Theme Responsibilities

When troubleshooting a template that doesn't display podcast data correctly, use this chart to decide whether to fix the plugin or the theme.

| Concern | Owner | Why |
|---|---|---|
| Meta-field bindings (`recording_date`, `download_link`, `cover_image`) | **Plugin** | Data logic. Available in any theme via the `gt-podcast-bb/episode-data` and `gt-podcast-bb/cover-image` binding sources. |
| Feed-detail bindings (`podcast_description`, `podcast_image`, `podcast_title`, `podcast_subtitle`, `podcast_author`, `podcast_owner_name`, `podcast_owner_email`, `podcast_copyright`, `podcast_language`) | **Plugin** | Data logic. Series-aware on `/series/{term}/` archives, falls back to `ss_podcasting_default_series`, then to the base SSP option. |
| Cover-image fallback to the post's featured image | **Plugin** | Data logic. Keeps the layout intact when an episode has no explicit cover. |
| Custom social-link services (Apple Podcasts, Pocket Casts, CastBox, Podbean, Podchaser) | **Plugin** | Feature registration via the `block_core_social_link_get_services` filter. |
| Subscribe-URL bindings for `wp:social-link` (key `subscribe_url`, arg `service`) | **Plugin** | Reads `ss_podcasting_{service}_url[_{series_id}]` from SSP's Feed Details. Same series-aware fallback as feed details. Requires `core/social-link.url` to be added to `block_bindings_supported_attributes` — the plugin does this. |
| Audio/video player bindings (`core/audio.src`, `core/video.src`, `core/video.poster`) | **Plugin** | Opts these core-block attributes into `block_bindings_supported_attributes` (WP 6.9+) so the audio block can play an episode's `audio_file` directly. |
| Bundled `taxonomy-series` and `archive-podcast` block templates | **Plugin** | Provides working defaults via `register_block_template()`. Note: **any theme file with the same slug will override them** — that's WordPress core behavior, not a plugin bug. |
| Which template renders `/podcast/` and `/series/{term}/`, and its visual layout | **Theme** | Site-specific design. To customize, edit or add `templates/archive-podcast.html` and `templates/taxonomy-series.html` in your theme (or in the Site Editor). |
| Button styling, spacing, column widths, typography | **Theme** | Presentation belongs in `theme.json` and template markup. The plugin ships unstyled markup so global styles apply. |

### Common gotchas

- **Template edits in the plugin folder don't appear on my site.** Your active theme likely ships its own `templates/taxonomy-series.html` or `templates/archive-podcast.html`. Theme files always beat plugin-registered templates. Fix by editing the theme file (or removing it so the plugin's registered template takes over).
- **Bindings return nothing on `/podcast/`.** That page is a post-type archive with no queried series. The plugin falls back to the `ss_podcasting_default_series` option — set a default series in SSP's settings if none is configured.
- **Social icons all say "Share Icon".** The plugin didn't load. On WordPress Studio (or any host with `open_basedir`) this usually means the plugin lives outside the allowed path — copy the plugin into `wp-content/plugins/` instead of symlinking from outside the site tree.

## 🔧 Development

### Build from Source

```bash
git clone https://github.com/bph/gt-podcast-bb.git
cd gt-podcast-bb
npm install
npm run build
```

### Contributing

Contributions are welcome! Please see the [Development Guide](https://bph.github.io/gt-podcast-bb/development) for details.

## 📖 Usage Examples

### Manual Block Binding

```html
<!-- Bind paragraph to recording date -->
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"gt-podcast-bb/episode-data","args":{"key":"recording_date"}}}}} -->
<p></p>
<!-- /wp:paragraph -->

<!-- Bind button to download link -->
<!-- wp:button {"metadata":{"bindings":{"url":{"source":"gt-podcast-bb/episode-data","args":{"key":"download_link"}}}}} -->
<div class="wp-block-button">
  <a class="wp-block-button__link" href="#">Download Episode</a>
</div>
<!-- /wp:button -->
```

For more examples, see the [Usage Guide](https://bph.github.io/gt-podcast-bb/usage).

## 📝 License

This plugin is licensed under the [GPL v2 or later](https://www.gnu.org/licenses/gpl-2.0.html).

## 👤 Author

**Birgit Pauli-Haack**
- Website: [icodeforapurpose.com](https://icodeforapurpose.com/about)
- GitHub: [@bph](https://github.com/bph)

## 🤝 Support

- **Documentation:** [bph.github.io/gt-podcast-bb](https://bph.github.io/gt-podcast-bb/)
- **Issues:** [GitHub Issues](https://github.com/bph/gt-podcast-bb/issues)
- **WordPress.org:** [Support Forum](https://wordpress.org/support/plugin/gt-podcast-bb/)

