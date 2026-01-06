---
layout: default
title: Usage Guide
---

# Usage Guide

Learn how to use GT Podcast Block Bindings to display podcast data in your WordPress block theme.

---

## Table of Contents

- [Using Block Variations](#using-block-variations)
- [Manual Block Bindings](#manual-block-bindings)
- [Podcast Social Icons](#podcast-social-icons)
- [Archive Template](#archive-template)
- [Common Patterns](#common-patterns)

---

## Using Block Variations

Block variations are the easiest way to add podcast data. They appear in the block inserter and are pre-configured with bindings.

### Available Variations

| Variation | Block Type | Displays |
|-----------|-----------|----------|
| Episode Recording Date | Paragraph | Episode recording date |
| Podcast Description | Paragraph | Main podcast description |
| Episode Cover Image | Image | Episode-specific cover art |
| Podcast Logo | Image | Main podcast logo |
| Episode Download Button | Button | Link to audio file |
| Episode Audio Player | Audio | Audio player with episode |

### How to Use Block Variations

#### 1. Episode Recording Date

```
1. Click the block inserter (+)
2. Type "Episode Recording Date"
3. Insert the block
```

The block automatically displays the recording date from the `date_recorded` post meta field.

**Example Output:**
```
November 15, 2024
```

#### 2. Podcast Description

```
1. Click + to open inserter
2. Search for "Podcast Description"
3. Insert the block
```

Displays the main podcast description from Seriously Simple Podcasting settings.

#### 3. Episode Cover Image

```
1. Click +
2. Search "Episode Cover Image"
3. Insert
```

Shows the episode-specific cover art. Falls back to podcast logo if no episode image exists.

#### 4. Episode Download Button

> **Note:** The download button variation appears in the "Buttons" block variations panel, not in the main inserter.

```
1. Add a Buttons block first
2. Click + inside the Buttons block
3. Select "Episode Download Button"
```

Creates a button that links to the episode's audio file.

---

## Manual Block Bindings

For more control, you can manually bind blocks to podcast data using the Block Bindings panel.

### Binding a Paragraph to Recording Date

1. **Add a Paragraph Block**

2. **Open Block Settings**
   - Click the block
   - Open the right sidebar
   - Scroll to "Advanced" section

3. **Add Binding (Code Editor)**

   Switch to Code Editor view and add:

   ```html
   <!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"gt-podcast-bb/episode-data","args":{"key":"recording_date"}}}}} -->
   <p></p>
   <!-- /wp:paragraph -->
   ```

### Available Binding Keys

For the `gt-podcast-bb/episode-data` source:

| Key | Description | Data Type |
|-----|-------------|-----------|
| `recording_date` | Episode recording date | Formatted date string |
| `download_link` | Episode audio file URL | URL string |
| `podcast_description` | Main podcast description | HTML string |
| `cover_image` | Episode cover image URL | URL string |
| `podcast_image` | Main podcast logo URL | URL string |

### Binding Examples

#### Podcast Logo to Image Block

```html
<!-- wp:image {"metadata":{"bindings":{"url":{"source":"gt-podcast-bb/podcast-image"}}}} -->
<figure class="wp-block-image">
  <img src="#" alt="Podcast Logo"/>
</figure>
<!-- /wp:image -->
```

#### Episode Cover to Image Block

```html
<!-- wp:image {"width":"400px","metadata":{"bindings":{"url":{"source":"gt-podcast-bb/cover-image"}}}} -->
<figure class="wp-block-image is-resized">
  <img src="#" alt="Episode Cover" style="width:400px"/>
</figure>
<!-- /wp:image -->
```

#### Download Button

```html
<!-- wp:button {"metadata":{"bindings":{"url":{"source":"gt-podcast-bb/episode-data","args":{"key":"download_link"}}}}} -->
<div class="wp-block-button">
  <a class="wp-block-button__link wp-element-button" href="#">
    Download Episode
  </a>
</div>
<!-- /wp:button -->
```

#### Audio Player

```html
<!-- wp:audio {"metadata":{"bindings":{"src":{"source":"gt-podcast-bb/episode-data","args":{"key":"download_link"}}}}} -->
<figure class="wp-block-audio">
  <audio controls src="#"></audio>
</figure>
<!-- /wp:audio -->
```

---

## Podcast Social Icons

Add subscription links to podcast directories with custom icons.

### Adding Social Icons

1. **Add Social Links Block**
   ```
   Click + → Search "Social Links"
   ```

2. **Add Individual Links**
   - Click + inside the Social Links block
   - Select platform:
     - Apple Podcasts
     - Spotify
     - Pocket Casts
     - CastBox
     - Podbean
     - Podchaser
     - RSS Feed

3. **Configure URLs**
   - Paste your podcast URL for each platform
   - Example Apple Podcasts: `https://podcasts.apple.com/podcast/id123456789`

### Full Example

```html
<!-- wp:social-links {"iconColor":"white","iconBackgroundColor":"primary"} -->
<ul class="wp-block-social-links has-icon-color has-icon-background-color">

  <!-- wp:social-link {"url":"https://podcasts.apple.com/podcast/id123","service":"applepod"} /-->

  <!-- wp:social-link {"url":"https://open.spotify.com/show/abc123","service":"spotify"} /-->

  <!-- wp:social-link {"url":"https://pca.st/podcast/xyz","service":"pocketcasts"} /-->

  <!-- wp:social-link {"url":"https://example.com/feed","service":"feed"} /-->

</ul>
<!-- /wp:social-links -->
```

---

## Archive Template

The plugin includes a ready-made archive template for podcast series.

### Using the Template

#### Automatic Application

The `taxonomy-series` template is automatically registered and will be used for podcast series archive pages.

URL structure:
```
yoursite.com/series/your-podcast-name/
```

#### Template Structure

The template includes:

1. **Header Section**
   - Series title (Query Title block)
   - Podcast description
   - Podcast logo
   - Social subscription links

2. **Episodes List** (Query Loop)
   - Episode cover images
   - Post titles (linked)
   - Post dates
   - Recording dates
   - Excerpts
   - Download buttons

3. **Pagination**
   - Previous/Next page navigation

### Customizing the Template

1. **Via Site Editor**
   ```
   Appearance → Editor → Templates
   Find "Podcast Series Archive"
   Click "Edit"
   ```

2. **Modify Blocks**
   - Add/remove blocks
   - Change styling
   - Adjust layout
   - Customize query parameters

3. **Save Changes**
   - Changes apply to all series archives
   - Can create variations per series using template parts

---

## Common Patterns

### Pattern 1: Episode Card

Create a reusable episode card:

```html
<!-- wp:group {"style":{"spacing":{"padding":"1.5rem"}},"backgroundColor":"light-gray"} -->
<div class="wp-block-group has-light-gray-background-color has-background">

  <!-- Episode Cover -->
  <!-- wp:image {"width":"200px","metadata":{"bindings":{"url":{"source":"gt-podcast-bb/cover-image"}}}} -->
  <figure class="wp-block-image is-resized">
    <img src="#" alt="Episode Cover" style="width:200px"/>
  </figure>
  <!-- /wp:image -->

  <!-- Episode Title -->
  <!-- wp:post-title {"isLink":true} /-->

  <!-- Recording Date -->
  <!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"gt-podcast-bb/episode-data","args":{"key":"recording_date"}}}}} -->
  <p></p>
  <!-- /wp:paragraph -->

  <!-- Excerpt -->
  <!-- wp:post-excerpt {"excerptLength":30} /-->

  <!-- Download Button -->
  <!-- wp:buttons -->
  <div class="wp-block-buttons">
    <!-- wp:button {"metadata":{"bindings":{"url":{"source":"gt-podcast-bb/episode-data","args":{"key":"download_link"}}}}} -->
    <div class="wp-block-button">
      <a class="wp-block-button__link wp-element-button">Download</a>
    </div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->

</div>
<!-- /wp:group -->
```

### Pattern 2: Podcast Header

```html
<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide">

  <!-- wp:columns -->
  <div class="wp-block-columns">

    <!-- Logo Column -->
    <!-- wp:column {"width":"200px"} -->
    <div class="wp-block-column" style="flex-basis:200px">
      <!-- wp:image {"width":"200px","metadata":{"bindings":{"url":{"source":"gt-podcast-bb/podcast-image"}}}} -->
      <figure class="wp-block-image is-resized">
        <img src="#" alt="Podcast Logo" style="width:200px"/>
      </figure>
      <!-- /wp:image -->
    </div>
    <!-- /wp:column -->

    <!-- Info Column -->
    <!-- wp:column -->
    <div class="wp-block-column">

      <!-- Podcast Description -->
      <!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"gt-podcast-bb/episode-data","args":{"key":"podcast_description"}}}}} -->
      <p></p>
      <!-- /wp:paragraph -->

      <!-- Subscribe Text -->
      <!-- wp:heading {"level":3} -->
      <h3>Subscribe</h3>
      <!-- /wp:heading -->

      <!-- Social Links -->
      <!-- wp:social-links -->
      <ul class="wp-block-social-links">
        <!-- wp:social-link {"url":"#","service":"applepod"} /-->
        <!-- wp:social-link {"url":"#","service":"spotify"} /-->
        <!-- wp:social-link {"url":"#","service":"pocketcasts"} /-->
      </ul>
      <!-- /wp:social-links -->

    </div>
    <!-- /wp:column -->

  </div>
  <!-- /wp:columns -->

</div>
<!-- /wp:group -->
```

### Pattern 3: Latest Episodes Query

```html
<!-- wp:query {"query":{"perPage":5,"postType":"podcast","order":"desc","orderBy":"date"}} -->
<div class="wp-block-query">

  <!-- wp:post-template -->

    <!-- wp:group {"style":{"spacing":{"padding":"1rem","margin":{"bottom":"1rem"}}}} -->
    <div class="wp-block-group">

      <!-- wp:columns -->
      <div class="wp-block-columns">

        <!-- Cover Column -->
        <!-- wp:column {"width":"150px"} -->
        <div class="wp-block-column" style="flex-basis:150px">
          <!-- wp:image {"width":"150px","metadata":{"bindings":{"url":{"source":"gt-podcast-bb/cover-image"}}}} -->
          <figure class="wp-block-image is-resized">
            <img src="#" alt="" style="width:150px"/>
          </figure>
          <!-- /wp:image -->
        </div>
        <!-- /wp:column -->

        <!-- Info Column -->
        <!-- wp:column -->
        <div class="wp-block-column">
          <!-- wp:post-title {"isLink":true,"fontSize":"large"} /-->
          <!-- wp:post-date /-->
          <!-- wp:post-excerpt {"excerptLength":25} /-->
        </div>
        <!-- /wp:column -->

      </div>
      <!-- /wp:columns -->

    </div>
    <!-- /wp:group -->

  <!-- /wp:post-template -->

  <!-- wp:query-pagination -->
  <div class="wp-block-query-pagination">
    <!-- wp:query-pagination-previous /-->
    <!-- wp:query-pagination-numbers /-->
    <!-- wp:query-pagination-next /-->
  </div>
  <!-- /wp:query-pagination -->

</div>
<!-- /wp:query -->
```

---

## Tips and Best Practices

### 1. Use Variations for Speed
Block variations are faster than manual bindings. Use them whenever possible.

### 2. Fallback Content
The editor shows placeholder text. Actual data appears on the frontend.

### 3. Image Sizing
Always specify width/height for podcast images to prevent layout shift.

### 4. Test in Query Loops
Block bindings work in Query Loops. Test your patterns with multiple episodes.

### 5. Cache Considerations
Podcast data is retrieved from post meta and options. Changes reflect immediately.

---

## Next Steps

- **[API Reference →](api-reference.md)** - Technical documentation
- **[Development Guide →](development.md)** - Extend the plugin
- **[FAQ →](faq.md)** - Common questions

---

[← Back to Getting Started](getting-started.md) | [Next: API Reference →](api-reference.md)
