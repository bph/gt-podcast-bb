---
layout: default
title: FAQ
---

# Frequently Asked Questions

Common questions and answers about GT Podcast Block Bindings.

---

## Installation & Setup

### Q: What are the minimum requirements?

**A:** You need:
- WordPress 6.8 or higher
- PHP 7.4 or higher
- Seriously Simple Podcasting plugin
- Gutenberg 21.1+ (or WordPress 6.9+)

---

### Q: Do I need the Gutenberg plugin?

**A:** Only if you're running WordPress 6.8. The Block Bindings API was introduced in WordPress 6.5, but full support for all features requires Gutenberg 21.1+ or WordPress 6.9+.

---

### Q: Can I use this with other podcast plugins?

**A:** Not currently. The plugin is specifically designed to work with Seriously Simple Podcasting and expects specific post meta fields and options that SSP provides.

---

## Usage

### Q: Why don't I see actual podcast data in the editor?

**A:** Block bindings show placeholder text in the editor. The actual podcast data only appears on the frontend (published page/post). This is intentional WordPress behavior for all block bindings.

**Example:**
- **In Editor:** "Recording date"
- **On Frontend:** "November 15, 2024"

---

### Q: Where do I find the block variations?

**A:** Open the block inserter (+) and search for "podcast" or:
- Episode Recording Date - in inserter
- Podcast Description - in inserter
- Episode Cover Image - in inserter
- Podcast Logo - in inserter
- Episode Download Button - inside Buttons block
- Episode Audio Player - in inserter

---

### Q: Why doesn't the download button variation appear in the inserter?

**A:** The download button is a variation of the Button block, which only appears inside a Buttons parent block.

**Steps:**
1. Add a Buttons block
2. Click + inside the Buttons block
3. Look for "Episode Download Button"

This is standard WordPress behavior for button variations.

---

### Q: Can I customize the block variations?

**A:** Block variations are pre-configured for ease of use. However, you can:
1. Insert a variation
2. Modify its attributes (color, size, etc.)
3. The binding will remain intact

Or create custom blocks with manual bindings for full control.

---

### Q: How do I use these in a Query Loop?

**A:** Block bindings work perfectly in Query Loops:

1. Add a Query Loop block
2. Configure to show podcast episodes
3. Inside the Post Template, add block variations
4. Each episode in the loop will display its own data

---

## Troubleshooting

### Q: Block variations aren't showing up

**Possible solutions:**

1. **Clear WordPress cache**
   ```
   - Disable caching plugins temporarily
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   ```

2. **Rebuild JavaScript**
   ```bash
   npm run build
   ```

3. **Check WordPress version**
   - Must be 6.8+ with Gutenberg 21.1+
   - Or WordPress 6.9+

4. **Verify plugin is active**
   ```
   Plugins → Installed Plugins → GT Podcast Block Bindings
   Should show "Deactivate" (meaning it's active)
   ```

---

### Q: Social icons aren't appearing

**A:**

1. **Check if icons registered**
   - Add a Social Links block
   - Add a Social Link
   - Look for podcast platforms in the dropdown

2. **JavaScript not loading**
   - Check browser console for errors
   - Rebuild: `npm run build`

3. **Wrong block**
   - Must use core/social-links block
   - Not a regular Links block

---

### Q: No podcast data on frontend

**Possible causes:**

1. **Seriously Simple Podcasting not configured**
   - Go to Podcasts → Settings
   - Fill in all podcast details
   - Save settings

2. **Episode missing required fields**
   - Check episode has audio_file post meta
   - Check recording date is set
   - Verify cover_image_id if using cover images

3. **Wrong post type**
   - Bindings only work on podcast episode post type
   - Check you're viewing an actual episode, not a regular post

---

### Q: Images not showing

**Solutions:**

1. **For episode covers:**
   - Ensure `cover_image_id` post meta is set
   - Must be a valid attachment ID
   - Check attachment exists in Media Library

2. **For podcast logo:**
   - Go to Podcasts → Settings
   - Upload podcast image
   - Save settings
   - Option key: `ss_podcasting_data_image`

3. **Verify URL is valid**
   - The binding returns URLs
   - URLs must pass `FILTER_VALIDATE_URL`

---

### Q: Recording date shows in wrong format

**A:** The date format comes from:
```
Settings → General → Date Format
```

Change this to adjust how recording dates display.

---

## Technical Questions

### Q: Can I use these bindings in custom blocks?

**A:** Yes! Use the binding sources in any custom block:

```json
{
    "metadata": {
        "bindings": {
            "content": {
                "source": "gt-podcast-bb/episode-data",
                "args": {
                    "key": "recording_date"
                }
            }
        }
    }
}
```

---

### Q: How do I access podcast data programmatically?

**A:** Use the provided PHP functions:

```php
// Get recording date
$date = gt_get_recording_date( $post_id );

// Get download link
$url = gt_get_download_link( $post_id );

// Get cover image
$cover = gt_get_cover_image_url( $post_id );

// Get podcast description
$description = gt_get_podcast_description();

// Get podcast logo
$logo = gt_get_podcast_image_url();
```

All functions return `null` if data not found.

---

### Q: Can I filter the binding values?

**A:** Not directly through the plugin, but you can:

1. **Filter at source (SSP post meta)**
   ```php
   add_filter( 'update_post_metadata', function( $check, $post_id, $meta_key, $meta_value ) {
       if ( $meta_key === 'date_recorded' ) {
           // Modify value
           return $modified_value;
       }
       return $check;
   }, 10, 4 );
   ```

2. **Modify the callback functions**
   - Copy functions to your theme
   - Register different binding sources
   - Point to your custom callbacks

---

### Q: Does this work with Full Site Editing (FSE)?

**A:** Yes! The plugin is designed for block themes and FSE. Use it in:
- Templates
- Template parts
- Pages
- Posts
- Query loops

---

### Q: Can I use this in classic theme?

**A:** The plugin works best with block themes, but you can use block bindings in:
- Block-enabled posts/pages in classic themes
- Widget areas (if block-based)
- Shortcodes that output blocks

---

## Performance

### Q: Does this plugin slow down my site?

**A:** No. The plugin:
- Only loads in the block editor (admin)
- Uses WordPress core APIs
- No database queries beyond standard post meta lookups
- JavaScript is minimal and tree-shaken

---

### Q: Are bindings cached?

**A:** Block bindings use standard WordPress post meta and options, which are already cached by WordPress object cache. No additional caching is needed.

---

### Q: How many HTTP requests does it add?

**A:** Zero on the frontend. All data comes from WordPress database, no external requests.

---

## Compatibility

### Q: Does this work with page builders?

**A:**
- **Works with:** Block-based builders (WordPress Site Editor)
- **Limited support:** Elementor, Beaver Builder (only in block widget areas)
- **Not supported:** Classic page builders without block support

---

### Q: Is it compatible with multisite?

**A:** Yes, activate per-site or network-wide. Each site maintains its own podcast data.

---

### Q: Does it work with custom post types?

**A:** The bindings work on any post type that has the required post meta fields. By default, it's designed for Seriously Simple Podcasting's `podcast` post type.

---

### Q: Can I use it with WooCommerce?

**A:** Not recommended. The plugin is specifically for podcast data, not products. However, you could technically use the block binding concepts with WooCommerce product meta.

---

## Customization

### Q: Can I change the placeholder text in the editor?

**A:** Yes, modify the JavaScript binding source:

```javascript
// In resources/js/editor.js
const placeholders = {
    recording_date: __('Your custom placeholder', 'gt-podcast-bb'),
    // ...
};
```

Then rebuild: `npm run build`

---

### Q: Can I add more data sources?

**A:** Yes! See the [Development Guide](development.md#extending-the-plugin) for instructions on adding custom binding sources.

---

### Q: Can I modify the archive template?

**A:** Yes:
1. **Via Site Editor:**
   ```
   Appearance → Editor → Templates → Podcast Series Archive
   ```

2. **Via code:**
   - Override in your theme's templates folder
   - Or unregister and register your own

---

## Contributing

### Q: How can I contribute?

**A:** Several ways:
1. **Report bugs:** [GitHub Issues](https://github.com/bph/gt-podcast-bb/issues)
2. **Suggest features:** [GitHub Discussions](https://github.com/bph/gt-podcast-bb/discussions)
3. **Submit code:** [Pull Requests](https://github.com/bph/gt-podcast-bb/pulls)
4. **Translate:** [WordPress.org](https://translate.wordpress.org/)
5. **Write tutorials:** Blog posts, videos

See [Development Guide](development.md#contributing) for details.

---

### Q: Where's the roadmap?

**A:** Check:
- [GitHub Projects](https://github.com/bph/gt-podcast-bb/projects)
- [GitHub Milestones](https://github.com/bph/gt-podcast-bb/milestones)
- [Discussions](https://github.com/bph/gt-podcast-bb/discussions)

---

## Support

### Q: Where do I get help?

**A:**
1. **Documentation:** [Read the docs](index.md)
2. **GitHub Issues:** [Report bugs](https://github.com/bph/gt-podcast-bb/issues)
3. **WordPress Forum:** [Support forum](https://wordpress.org/support/plugin/gt-podcast-bb/)

---

### Q: Is there a demo?

**A:** Yes! Try it instantly with WordPress Playground:

[![Test on Playground](https://raw.githubusercontent.com/bph/gt-podcast-bb/main/assets/Test-on-WordPress-Playground.svg)](https://playground.wordpress.net?blueprint-url=https://raw.githubusercontent.com/bph/gt-podcast-bb/refs/heads/main/_blueprint/blueprint.json)

---

### Q: Can I hire someone to customize this for me?

**A:** This is free, open-source software. You can:
1. Hire any WordPress developer
2. Contact the author: [Birgit Pauli-Haack](https://icodeforapurpose.com/about)
3. Post on [WordPress Jobs](https://jobs.wordpress.net/)

---

## Didn't find your answer?

- **[Read Full Documentation →](index.md)**
- **[Ask on GitHub →](https://github.com/bph/gt-podcast-bb/issues)**
- **[WordPress Support Forum →](https://wordpress.org/support/plugin/gt-podcast-bb/)**

---

[← Back to Development](development.md) | [Next: Changelog →](changelog.md)
