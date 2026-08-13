=== Podcast data for block themes ===
Contributors: bph
Donate link: https://ko-fi.com/paulchenhaack
Tags: podcast, block-bindings, block-editor, gutenberg, episode
Requires at least: 6.8
Tested up to: 7.1
Stable tag: 0.4.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds block bindings for episode and podcast data, social icon links for podcast directories and a template for a podcast archive page. 

=== Description ===
** Still in beta stage, use at your own risk. **

This plugin turns your podcast data from the [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/) plugin (SSP) into block bindings you can use in any block theme — no PHP or custom fields UI required. It also ships two ready-made archive templates and podcast-specific icons for the Social Links block.

= What it gives you =

**Block bindings for episode data** (source `gt-podcast-bb/episode-data`):

* `recording_date` — formatted from the `date_recorded` meta.
* `download_link` — the episode's `audio_file` URL. Works on `wp:button` (URL) and on `wp:audio` (`src`), so you can wire up a native HTML5 audio player straight from the meta value.
* `podcast_description`, `podcast_title`, `podcast_subtitle`, `podcast_author`, `podcast_owner_name`, `podcast_owner_email`, `podcast_copyright`, `podcast_language` — pulled from SSP's Feed Details options.
* `subscribe_url` — populates each `wp:social-link` from SSP's Feed Details subscribe URLs. The plugin auto-derives the SSP option key from the block's own `service` slug (e.g. `applepod` → `apple_podcasts`, `feed` → `rss`) via a filterable map (`gt_podcast_ssp_service_map`), so no arg is needed for common services.

**Series-aware.** On `/series/{term}/` pages the feed-detail bindings pick up the currently queried series first, then fall back to the site-wide default series (`ss_podcasting_default_series`), then to the base SSP option.

**Podcast-specific Social Links icons.** Registers Apple Podcasts, Pocket Casts, CastBox, Podbean, and Podchaser as `wp:social-link` services so they render correctly with the core Social Links block.

**Two bundled block templates** (registered via `register_block_template()`):

* `taxonomy-series` — the Series taxonomy archive.
* `archive-podcast` — the Podcast post-type archive.

Themes can override either template by shipping their own `templates/taxonomy-series.html` or `templates/archive-podcast.html`; that is standard WordPress behavior, not a plugin quirk.

= Plugin vs. Theme Responsibilities =

When something doesn't render the way you expect, this chart helps you decide whether to fix it in the plugin or in your theme.

**Plugin owns (data + registrations):**

* All the bindings and helpers above.
* Cover-image binding falls back to the post's featured image when no `cover_image_id` meta is set.
* Custom `wp:social-link` services (Apple Podcasts, Pocket Casts, CastBox, Podbean, Podchaser) via `block_core_social_link_get_services`.
* Opting `core/audio.src`, `core/video.src`, `core/video.poster`, and `core/social-link.url` into `block_bindings_supported_attributes` (WP 6.9+) so those attributes accept bindings.
* Bundled `taxonomy-series` and `archive-podcast` templates as sensible defaults.

**Theme owns (presentation):**

* Which template renders `/podcast/` and `/series/{term}/`, and its visual layout. Any theme file with the same slug will override the plugin's registered template.
* Button styling, spacing, column widths, typography — the plugin ships unstyled markup so your `theme.json` and CSS drive the look.

= Common gotchas =

* **Template edits in the plugin folder don't appear on the site.** Your active theme is probably shipping its own template with the same slug — that always wins. Edit the theme file, or remove it if you want the plugin's default back.
* **Bindings return nothing on `/podcast/`.** That page has no queried series, so the plugin falls back to the `ss_podcasting_default_series` option — set a default series in SSP's settings if none is configured.
* **Audio bar doesn't play or download URL is empty.** Make sure the episode has an `audio_file` meta value set (SSP's episode editor).

== Frequently Asked Questions ==
== Upgrade Notice ==
== Screenshots ==

=== Installation ===
1. Upload the plugin files to the `/wp-content/plugins/gt-podcast-bb` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. The plugin requires Seriously Simple Podcasting plugin and Gutenberg plugin 21.1 or higher to be installed and activated.
4. Use the block bindings in your block editor to access episode and podcast data.    
5. Use the social icon links to link to your podcast on popular directories.
6. Use the template to create an archive page for your podcast using the social icons and the block bindings. 

=== Changelog ===
= 0.4.0 =
* Added: `subscribe_url` binding on the `episode-data` source — populates each `wp:social-link` from SSP's Feed Details subscribe URLs. Auto-derives the SSP option key from the block's own `service` attribute via a filterable map (`gt_podcast_ssp_service_map`), so no arg is needed for common services.
* Added: new episode-data keys: `podcast_title`, `podcast_subtitle`, `podcast_author`, `podcast_owner_name`, `podcast_owner_email`, `podcast_copyright`, `podcast_language`.
* Added: audio and video block support — filter `block_bindings_supported_attributes` opts `core/audio.src`, `core/video.src`, `core/video.poster` into the bindings allow-list (WP 6.9+), so the audio block can play an episode's `audio_file` directly.
* Added: `templates/archive-podcast.html` — bundled template for the `podcast` post-type archive. Registered alongside `taxonomy-series` via `register_block_template()`.
* Changed: feed-detail bindings are now series-aware — on `/series/{term}/` pages they read the current queried series first, then fall back to the site-wide default series (`ss_podcasting_default_series`), then to the base SSP option.
* Changed: cover-image binding falls back to the post's featured image when no `cover_image_id` meta is set.
* Changed: renamed `templates/template-code.html` → `templates/taxonomy-series.html`.
* Fixed: `GT_PODCAST_VERSION` constant now matches the plugin header version.
* Docs: added "Plugin vs. Theme Responsibilities" chart and common-gotchas section to `readme.md`.
* Tested up to WordPress 7.1.

= 0.3.6 =
* updated tested up to 6.9

= 0.3.5 = 
* Fixed template registration
* Fixed the method to identify the default podcast series
* added plugin icon
* removed hard-coded URLs from the social icons in the template 
* fixed query in the series-taxonomy template to inherit=true

= 0.2.1 =
* remove gitignore
* add /languages folder
* consistent text domain with plugin name. 
* rename Test-on-WordPress-playground.svg
* updated readme.md 

= 0.2.0 =
* Fixed placeholders for block variations
* Fixed template association with `taxonomy-series` for podcast archive. 
* Restrict podcast info to default _20 series. 
* Text domain consistency (gt-podcast-bb throughout)
* Block binding source names updated (gt-podcast-bb/episode-data, etc.)
* Template HTML updated with correct binding sources
* WordPress 6.8 requirement with Gutenberg dependency
= 0.1.0 =
* Initial release with block bindings for episode and podcast data.
* Added social icon links for popular podcast directories.
* Included a template for a podcast archive page. 

