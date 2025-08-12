=== GT Podcast Block Bindings ===
Contributors: bph
Donate link: https://ko-fi.com/paulchenhaack
Tags: podcast, block-bindings, block-editor, gutenberg, episode
Requires at least: 6.8
Tested up to: 6.8
Stable tag: 0.2.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds block bindings for episode and podcast data, social icon links for podcast directories and a template for a podcast archive page. 

=== Description ===
This plugin provides block bindings for the GT Podcast Block Bindings plugin, allowing you to easily access
episode and podcast data in the block editor. It also includes social icon links for popular podcast directories and a template for a podcast archive page.
=== Installation ===
1. Upload the plugin files to the `/wp-content/plugins/gt-podcast-bb` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the block bindings in your block editor to access episode and podcast data.    
4. Use the social icon links to link to your podcast on popular directories.
The plugin requires Seriously Simple Podcasting plugin and Gutenberg plugin to be installed and activated.
=== Changelog ===
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

