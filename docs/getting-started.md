---
layout: default
title: Getting Started
---

# Getting Started

This guide will help you install and configure GT Podcast Block Bindings.

---

## Prerequisites

Before installing GT Podcast Block Bindings, ensure your WordPress installation meets these requirements:

| Requirement | Version |
|------------|---------|
| WordPress | 6.8+ |
| PHP | 7.4+ |
| Gutenberg Plugin | 21.1+ (or WordPress 6.9+) |

**Required Plugin:**
- [Seriously Simple Podcasting](https://wordpress.org/plugins/seriously-simple-podcasting/)

---

## Installation

### Method 1: WordPress Admin (Recommended)

1. **Download the Plugin**
   - Download the latest release from [GitHub](https://github.com/bph/gt-podcast-bb/releases)
   - Or from [WordPress.org](https://wordpress.org/plugins/gt-podcast-bb/)

2. **Upload to WordPress**
   ```
   WordPress Admin → Plugins → Add New → Upload Plugin
   ```
   - Click "Choose File" and select the downloaded ZIP file
   - Click "Install Now"

3. **Activate the Plugin**
   - Click "Activate Plugin" after installation completes
   - Or navigate to Plugins → Installed Plugins → Activate

### Method 2: Manual Installation

1. **Upload Files**
   ```bash
   # Extract the ZIP file
   unzip gt-podcast-bb.zip

   # Upload to your WordPress installation
   mv gt-podcast-bb /path/to/wordpress/wp-content/plugins/
   ```

2. **Set Permissions**
   ```bash
   chmod 755 /path/to/wordpress/wp-content/plugins/gt-podcast-bb
   ```

3. **Activate**
   - Go to WordPress Admin → Plugins
   - Find "Podcast data for block themes"
   - Click "Activate"

### Method 3: Git Clone (Development)

```bash
cd /path/to/wordpress/wp-content/plugins/
git clone https://github.com/bph/gt-podcast-bb.git
cd gt-podcast-bb
npm install
npm run build
```

---

## Required Plugin Setup

### Install Seriously Simple Podcasting

GT Podcast Block Bindings requires the **Seriously Simple Podcasting** plugin to work.

1. **Install SSP**
   ```
   WordPress Admin → Plugins → Add New
   Search for "Seriously Simple Podcasting"
   Click "Install Now" → "Activate"
   ```

2. **Configure SSP**
   - Go to Podcasts → Settings
   - Configure your podcast details:
     - Podcast Title
     - Podcast Description
     - Podcast Image/Logo
     - Category and subcategory

3. **Create a Series** (Optional)
   - Go to Podcasts → Series
   - Create a new series for your podcast
   - Add series-specific metadata

---

## Verification

After installation, verify the plugin is working:

### 1. Check Block Bindings Sources

1. Create or edit a post
2. Add a Paragraph block
3. Click the block options (three dots)
4. Look for these binding sources:
   - ✅ Episode Data
   - ✅ Cover Image
   - ✅ Podcast Image

### 2. Check Block Variations

1. Open the block inserter (+)
2. Search for "podcast"
3. You should see:
   - ✅ Episode Recording Date
   - ✅ Podcast Description
   - ✅ Episode Cover Image
   - ✅ Podcast Logo
   - ✅ Episode Audio Player

### 3. Check Social Icons

1. Add a Social Links block
2. Add a Social Link
3. Look for podcast platforms:
   - ✅ Apple Podcasts
   - ✅ Pocket Casts
   - ✅ CastBox
   - ✅ Podbean
   - ✅ Podchaser

---

## Initial Configuration

### 1. Set Up Your Podcast Data

Configure your podcast in Seriously Simple Podcasting:

```
Podcasts → Settings → General Tab
```

Fill in:
- **Podcast Title:** Your podcast name
- **Podcast Description:** Brief description
- **Podcast Image:** Square image (1400x1400px or larger)
- **Category:** Select primary category

### 2. Create Your First Episode

```
Podcasts → Add New
```

Fill in:
- **Episode Title**
- **Episode Content**
- **Upload Audio File** (MP3 recommended)
- **Episode Image** (optional cover art)
- **Recording Date** (custom field)

### 3. Create a Podcast Archive Page

The plugin provides a `taxonomy-series` template:

1. **Via Theme Editor:**
   ```
   Appearance → Editor → Templates → Add New Template
   Select "Podcast Series Archive"
   ```

2. **Or use the provided template**
   - The plugin automatically registers the template
   - Assign it to your podcast series taxonomy

---

## Quick Start: Your First Podcast Page

### Step 1: Create a New Page

```
Pages → Add New
Title: "My Podcast"
```

### Step 2: Add Podcast Metadata

1. **Add Podcast Logo**
   ```
   Click + → Search "Podcast Logo"
   Insert the block
   ```
   The logo will auto-populate from your SSP settings

2. **Add Podcast Description**
   ```
   Click + → Search "Podcast Description"
   Insert the block
   ```
   The description will auto-populate from your SSP settings

3. **Add Social Subscribe Links**
   ```
   Click + → Search "Social Links"
   Add links for:
   - Apple Podcasts (paste your Apple Podcasts URL)
   - Spotify (paste your Spotify URL)
   - RSS Feed
   ```

### Step 3: Create Episode List

Use a Query Loop to display episodes:

```
Click + → Search "Query Loop"
Configure:
- Post Type: Episodes
- Order: Newest First
- Posts per page: 10
```

Inside the query loop, add:
- **Episode Cover Image** (variation)
- **Post Title** (linked)
- **Episode Recording Date** (variation)
- **Post Excerpt**
- **Episode Download Button** (variation)

---

## Troubleshooting

### Plugin Not Activating

**Error:** "GT Podcast Block Bindings requires WordPress 6.8 or higher"

**Solution:**
- Update WordPress to 6.8+
- Or install Gutenberg plugin 21.1+

### Block Variations Not Showing

**Possible Causes:**
1. JavaScript not loading
   - Check browser console for errors
   - Clear WordPress cache
   - Rebuild assets: `npm run build`

2. Gutenberg version too old
   - Update WordPress to 6.9+
   - Or update Gutenberg plugin to 21.1+

### Binding Sources Not Available

**Solution:**
- Ensure WordPress 6.5+
- Block Bindings API introduced in WP 6.5
- Update WordPress

### No Podcast Data Showing

**Solution:**
1. Verify Seriously Simple Podcasting is active
2. Check SSP settings are configured
3. Ensure episode has required metadata:
   - Audio file
   - Recording date (custom field)
   - Cover image ID (optional)

---

## Next Steps

Now that you've installed the plugin:

1. **[Learn Usage →](usage.md)** - How to use block bindings and variations
2. **[API Reference →](api-reference.md)** - Technical documentation
3. **[Development Guide →](development.md)** - Contribute to the plugin

---

## Support

Need help?

- **Documentation:** [Full Documentation](index.md)
- **Issues:** [GitHub Issues](https://github.com/bph/gt-podcast-bb/issues)
- **Support Forum:** [WordPress.org](https://wordpress.org/support/plugin/gt-podcast-bb/)

---

[← Back to Home](index.md) | [Next: Usage Guide →](usage.md)
