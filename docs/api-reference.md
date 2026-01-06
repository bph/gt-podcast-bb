---
layout: default
title: API Reference
---

# API Reference

Complete technical documentation for developers working with GT Podcast Block Bindings.

---

## Table of Contents

- [PHP API](#php-api)
- [JavaScript API](#javascript-api)
- [Block Bindings Sources](#block-bindings-sources)
- [Hooks and Filters](#hooks-and-filters)
- [Data Structures](#data-structures)

---

## PHP API

### Constants

#### GT_PODCAST_VERSION
```php
define( 'GT_PODCAST_VERSION', '0.3.6' );
```
Plugin version number.

#### GT_PODCAST_PLUGIN_DIR
```php
define( 'GT_PODCAST_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
```
Absolute path to plugin directory with trailing slash.

#### GT_PODCAST_PLUGIN_URL
```php
define( 'GT_PODCAST_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
```
URL to plugin directory with trailing slash.

---

### Functions

#### gt_podcast_init()
```php
function gt_podcast_init(): void
```

Main initialization function. Sets up all plugin functionality.

**Hooked to:** `init` action
**Since:** 0.3.6

**Actions:**
- Registers block binding sources
- Adds social link services filter
- Enqueues editor assets
- Registers block templates

---

#### gt_register_binding_sources()
```php
function gt_register_binding_sources(): void
```

Registers three block binding sources for podcast data.

**Since:** 0.3.6
**Requires:** WordPress 6.5+

**Registered Sources:**
- `gt-podcast-bb/episode-data`
- `gt-podcast-bb/cover-image`
- `gt-podcast-bb/podcast-image`

---

#### gt_episode_data_callback()
```php
function gt_episode_data_callback(
    array $source_args,
    WP_Block $block_instance,
    string $attribute_name
): ?string
```

Callback for episode data block bindings.

**Parameters:**
- `$source_args` (array) - Must contain 'key' argument
- `$block_instance` (WP_Block) - Block context with postId
- `$attribute_name` (string) - Attribute being bound

**Returns:** `string|null` - Bound value or null

**Supported Keys:**
- `recording_date` - Formatted recording date
- `download_link` - Audio file URL
- `cover_image` - Episode cover image URL
- `podcast_description` - Podcast description HTML
- `podcast_image` - Podcast logo URL

**Example:**
```php
// Usage in block markup
$bindings = array(
    'content' => array(
        'source' => 'gt-podcast-bb/episode-data',
        'args' => array( 'key' => 'recording_date' )
    )
);
```

---

#### gt_cover_image_callback()
```php
function gt_cover_image_callback(
    array $source_args,
    WP_Block $block_instance,
    string $attribute_name
): ?string
```

Callback for cover image block bindings.

**Parameters:**
- `$source_args` (array) - Unused
- `$block_instance` (WP_Block) - Block context with postId
- `$attribute_name` (string) - Unused

**Returns:** `string|null` - Cover image URL or null

**Post Meta Key:** `cover_image_id`

---

#### gt_podcast_image_callback()
```php
function gt_podcast_image_callback(
    array $source_args,
    WP_Block $block_instance,
    string $attribute_name
): ?string
```

Callback for podcast image block bindings.

**Parameters:**
- `$source_args` (array) - Unused
- `$block_instance` (WP_Block) - Unused
- `$attribute_name` (string) - Unused

**Returns:** `string|null` - Podcast logo URL or null

**Option Key:** `ss_podcasting_data_image`

---

#### gt_get_recording_date()
```php
function gt_get_recording_date( int $post_id ): ?string
```

Get formatted recording date for a post.

**Parameters:**
- `$post_id` (int) - Post ID

**Returns:** `string|null` - Formatted date or null

**Post Meta Key:** `date_recorded`
**Format:** Site's date format from `get_option('date_format')`

**Example:**
```php
$date = gt_get_recording_date( 123 );
// Returns: "November 15, 2024"
```

---

#### gt_get_download_link()
```php
function gt_get_download_link( int $post_id ): ?string
```

Get download link for a post.

**Parameters:**
- `$post_id` (int) - Post ID

**Returns:** `string|null` - Valid audio file URL or null

**Post Meta Key:** `audio_file`
**Validation:** URLs are validated with `FILTER_VALIDATE_URL`

---

#### gt_get_cover_image_url()
```php
function gt_get_cover_image_url( int $post_id ): ?string
```

Get cover image URL for a post.

**Parameters:**
- `$post_id` (int) - Post ID

**Returns:** `string|null` - Cover image URL or null

**Post Meta Key:** `cover_image_id` (attachment ID)

---

#### gt_get_podcast_option()
```php
function gt_get_podcast_option( string $type ): ?string
```

Get podcast option with series-specific fallback.

**Parameters:**
- `$type` (string) - Option type (description, image, title, etc.)

**Returns:** `string|null` - Option value or null

**Option Keys:**
- Series-specific: `ss_podcasting_data_{type}_{series_id}`
- Base: `ss_podcasting_data_{type}`

**Example:**
```php
$description = gt_get_podcast_option( 'description' );
$image = gt_get_podcast_option( 'image' );
```

---

#### gt_get_podcast_description()
```php
function gt_get_podcast_description(): ?string
```

Get podcast description from options.

**Returns:** `string|null` - Sanitized podcast description or null

**Sanitization:** `wp_kses_post()`

---

#### gt_get_podcast_image_url()
```php
function gt_get_podcast_image_url(): ?string
```

Get podcast image URL from options.

**Returns:** `string|null` - Valid podcast image URL or null

**Validation:** `FILTER_VALIDATE_URL`

---

#### gt_register_social_services()
```php
function gt_register_social_services( array $services_data ): array
```

Register custom social link services for podcast platforms.

**Parameters:**
- `$services_data` (array) - Existing social link services

**Returns:** `array` - Merged array of services

**Hooked to:** `block_core_social_link_get_services` filter

**Added Services:**
- `applepod` - Apple Podcasts
- `pocketcasts` - Pocket Casts
- `castbox` - CastBox
- `podbean` - Podbean
- `podchaser` - Podchaser

---

## JavaScript API

### Block Binding Sources

#### Episode Data Source
```javascript
registerBlockBindingsSource({
    name: 'gt-podcast-bb/episode-data',
    label: __('Episode data', 'gt-podcast-bb'),
    getValues({ bindings }) {
        // Returns placeholder values for editor
    },
    canUserEditValue: () => false
});
```

**Supported Keys:**
- `recording_date`
- `download_link`
- `podcast_description`

---

#### Cover Image Source
```javascript
registerBlockBindingsSource({
    name: 'gt-podcast-bb/cover-image',
    label: __('Cover Image', 'gt-podcast-bb'),
    getValues({ bindings }) {
        // Returns placeholder for editor
    },
    canUserEditValue: () => false
});
```

---

#### Podcast Image Source
```javascript
registerBlockBindingsSource({
    name: 'gt-podcast-bb/podcast-image',
    label: __('Podcast Image', 'gt-podcast-bb'),
    getValues({ bindings }) {
        // Returns placeholder for editor
    },
    canUserEditValue: () => false
});
```

---

### Block Variations

#### Variation Configuration
```javascript
const variationConfig = {
    name: 'podcast-recording-date',
    title: __( 'Episode Recording Date', 'gt-podcast-bb' ),
    description: __( 'Display the podcast episode recording date', 'gt-podcast-bb' ),
    icon: 'calendar-alt',
    category: 'media',
    attributes: {
        metadata: {
            bindings: {
                content: {
                    source: 'gt-podcast-bb/episode-data',
                    args: { key: 'recording_date' }
                }
            }
        }
    },
    scope: [ 'inserter' ]
};
```

---

### Helper Functions

#### createBindingMetadata()
```javascript
/**
 * Creates block binding metadata
 * @param {string} bindingKey - The key for the binding source
 * @param {string} bindingAttribute - The block attribute to bind to
 * @return {Object} Metadata object with bindings configuration
 */
const createBindingMetadata = ( bindingKey, bindingAttribute ) => ({
    metadata: {
        bindings: {
            [ bindingAttribute ]: {
                source: 'gt-podcast-bb/episode-data',
                args: { key: bindingKey }
            }
        }
    }
});
```

---

#### createPlatformIcon()
```javascript
/**
 * Creates an SVG icon component for a platform
 * @param {string} pathData - SVG path data string
 * @return {JSX.Element} SVG icon component
 */
const createPlatformIcon = ( pathData ) => (
    <SVG role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path d={ pathData } />
    </SVG>
);
```

---

## Block Bindings Sources

### gt-podcast-bb/episode-data

**Type:** Server-side
**Callback:** `gt_episode_data_callback()`
**Context:** Requires `postId`

**Attributes:**
| Attribute | Type | Description |
|-----------|------|-------------|
| `content` | string | Text content |
| `url` | string | URL attribute |

**Arguments:**
| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | string | Yes | Data key to retrieve |

**Example:**
```json
{
    "source": "gt-podcast-bb/episode-data",
    "args": {
        "key": "recording_date"
    }
}
```

---

### gt-podcast-bb/cover-image

**Type:** Server-side
**Callback:** `gt_cover_image_callback()`
**Context:** Requires `postId`

**Attributes:**
| Attribute | Type | Description |
|-----------|------|-------------|
| `url` | string | Image URL |

**Example:**
```json
{
    "source": "gt-podcast-bb/cover-image"
}
```

---

### gt-podcast-bb/podcast-image

**Type:** Server-side
**Callback:** `gt_podcast_image_callback()`
**Context:** None required

**Attributes:**
| Attribute | Type | Description |
|-----------|------|-------------|
| `url` | string | Image URL |

**Example:**
```json
{
    "source": "gt-podcast-bb/podcast-image"
}
```

---

## Hooks and Filters

### Actions

#### init
```php
do_action( 'init' );
```
Plugin initialization happens on this hook via `gt_podcast_init()`.

---

#### enqueue_block_editor_assets
```php
do_action( 'enqueue_block_editor_assets' );
```
Editor assets are enqueued on this hook via `gt_enqueue_editor_assets()`.

---

### Filters

#### block_core_social_link_get_services
```php
apply_filters( 'block_core_social_link_get_services', array $services_data );
```
Add custom podcast platform services via `gt_register_social_services()`.

---

## Data Structures

### Post Meta Fields

#### Seriously Simple Podcasting Episode Meta

| Meta Key | Type | Description |
|----------|------|-------------|
| `audio_file` | string | URL to episode audio file |
| `date_recorded` | string | Recording date (any strtotime format) |
| `cover_image_id` | int | Attachment ID for episode cover |

**Example:**
```php
update_post_meta( $post_id, 'audio_file', 'https://example.com/episode.mp3' );
update_post_meta( $post_id, 'date_recorded', '2024-11-15' );
update_post_meta( $post_id, 'cover_image_id', 123 );
```

---

### Options

#### Seriously Simple Podcasting Options

| Option Key | Type | Description |
|------------|------|-------------|
| `ss_podcasting_data_description` | string | Podcast description |
| `ss_podcasting_data_image` | string | Podcast logo URL |
| `ss_podcasting_data_title` | string | Podcast title |
| `ss_podcasting_default_series` | int | Default series ID |

**Series-specific format:**
```
ss_podcasting_data_{type}_{series_id}
```

**Example:**
```php
get_option( 'ss_podcasting_data_description' );
get_option( 'ss_podcasting_data_description_5' ); // Series ID 5
```

---

### Social Link Services

```php
array(
    'applepod' => array(
        'name' => 'Apple Podcasts',
        'icon' => '<svg>...</svg>'
    ),
    'pocketcasts' => array(
        'name' => 'Pocket Casts',
        'icon' => '<svg>...</svg>'
    ),
    // ... more services
)
```

---

## WordPress Compatibility

### Required WordPress Functions

- `register_block_bindings_source()` - WordPress 6.5+
- `register_block_template()` - WordPress 6.7+
- `unregister_block_template()` - WordPress 6.7+

### Fallback Behavior

If required functions don't exist:
- Admin notice displayed
- Plugin degrades gracefully
- No fatal errors

---

## Error Handling

All functions return `null` on error or when data is not found. No exceptions are thrown.

**Example:**
```php
$date = gt_get_recording_date( 999999 );
// Returns: null (post doesn't exist)

$url = gt_get_download_link( $post_id );
// Returns: null (no audio file or invalid URL)
```

---

## Next Steps

- **[Development Guide →](development.md)** - Build and extend the plugin
- **[FAQ →](faq.md)** - Common questions
- **[Usage Guide →](usage.md)** - Practical examples

---

[← Back to Usage](usage.md) | [Next: Development Guide →](development.md)
