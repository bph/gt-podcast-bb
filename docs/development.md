---
layout: default
title: Development Guide
---

# Development Guide

Learn how to contribute to and extend GT Podcast Block Bindings.

---

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Building the Plugin](#building-the-plugin)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Contributing](#contributing)
- [Release Process](#release-process)

---

## Development Setup

### Prerequisites

- **Node.js** 18+ and npm
- **PHP** 7.4+
- **Composer** (for PHP CodeSniffer)
- **WordPress** 6.8+ local installation
- **Git**

### Clone the Repository

```bash
git clone https://github.com/bph/gt-podcast-bb.git
cd gt-podcast-bb
```

### Install Dependencies

```bash
# Install JavaScript dependencies
npm install

# Install PHP development dependencies
composer install
```

### Development Environment

Recommended setup:
- **Local WordPress:** [Local by Flywheel](https://localwp.com/), [MAMP](https://www.mamp.info/), or [Docker](https://github.com/docker/awesome-compose/tree/master/wordpress)
- **Code Editor:** VS Code with PHP Intelephense and ESLint extensions
- **Browser:** Chrome/Firefox with React DevTools

### Symlink to WordPress

```bash
# Create symlink in WordPress plugins directory
ln -s /path/to/gt-podcast-bb /path/to/wordpress/wp-content/plugins/gt-podcast-bb
```

---

## Project Structure

```
gt-podcast-bb/
├── assets/                  # Documentation assets
├── docs/                    # GitHub Pages documentation
├── languages/               # Internationalization files
├── node_modules/            # npm dependencies (gitignored)
├── public/                  # Compiled JavaScript
│   └── js/
│       ├── editor.js         # Compiled editor script
│       ├── block-variations.js
│       └── podcast-icons.js
├── resources/               # Source files
│   └── js/
│       ├── editor.js         # Block bindings source
│       ├── block-variations.js
│       └── podcast-icons.js
├── templates/               # Block templates
│   └── template-code.html   # Taxonomy-series template
├── vendor/                  # Composer dependencies (gitignored)
├── _blueprint/              # WordPress Playground config
├── composer.json            # PHP dependencies
├── package.json             # npm dependencies
├── webpack.config.js        # Webpack configuration
├── gt-podcast-bb.php        # Main plugin file
├── readme.txt               # WordPress.org readme
└── readme.md                # GitHub readme
```

---

## Building the Plugin

### Development Build

Watch for changes and rebuild automatically:

```bash
npm start
```

This runs `wp-scripts start` which:
- Compiles JavaScript with webpack
- Watches for file changes
- Generates source maps
- Enables React Fast Refresh

### Production Build

Create optimized production builds:

```bash
npm run build
```

This runs `wp-scripts build` which:
- Minifies JavaScript
- Removes console.logs
- Generates `.asset.php` files
- Optimizes for performance

### Build Output

Compiled files are output to `public/js/`:

```
public/js/
├── editor.js
├── editor.asset.php
├── block-variations.js
├── block-variations.asset.php
├── podcast-icons.js
└── podcast-icons.asset.php
```

The `.asset.php` files contain dependency arrays and version hashes.

---

## Coding Standards

### PHP Standards

This project follows **WordPress PHP Coding Standards**.

#### Check PHP Code

```bash
# Check all PHP files
vendor/bin/phpcs

# Check specific file
vendor/bin/phpcs gt-podcast-bb.php

# Auto-fix issues
vendor/bin/phpcbf
```

#### PHPDoc Comments

All functions must have PHPDoc blocks:

```php
/**
 * Get formatted recording date for a post
 *
 * @since 0.3.6
 * @param int $post_id Post ID to retrieve the recording date for
 * @return string|null Formatted date string or null if not found
 */
function gt_get_recording_date( $post_id ) {
    // ...
}
```

### JavaScript Standards

This project uses **WordPress JavaScript Coding Standards** via `@wordpress/scripts`.

#### Linting

```bash
# Lint JavaScript files
npm run lint:js

# Auto-fix JavaScript issues
npm run lint:js:fix
```

#### JSDoc Comments

All functions should have JSDoc:

```javascript
/**
 * Creates block binding metadata
 *
 * @param {string} bindingKey - The key for the binding source
 * @param {string} bindingAttribute - The block attribute to bind to
 * @return {Object} Metadata object with bindings configuration
 */
const createBindingMetadata = ( bindingKey, bindingAttribute ) => {
    // ...
};
```

### Code Style

- **Indentation:** Tabs (not spaces)
- **Line Length:** Max 100 characters
- **Quotes:** Single quotes in PHP, backticks in JavaScript for templates
- **Naming:**
  - PHP functions: `snake_case` with `gt_` prefix
  - JavaScript functions: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`

---

## Testing

### Manual Testing

1. **Activate the Plugin**
   ```
   WordPress Admin → Plugins → Activate
   ```

2. **Test Block Bindings**
   - Create a new post
   - Add blocks with bindings
   - Verify placeholder text in editor
   - Preview/publish to see actual data

3. **Test Block Variations**
   - Open block inserter
   - Search for "podcast"
   - Insert variations
   - Verify they work correctly

4. **Test Social Icons**
   - Add Social Links block
   - Add podcast platform links
   - Verify icons display correctly

### WordPress Playground Testing

Test without local setup:

```bash
# Available via the Test on Playground button
# Or manually:
https://playground.wordpress.net?blueprint-url=https://raw.githubusercontent.com/bph/gt-podcast-bb/main/_blueprint/blueprint.json
```

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### PHP Version Testing

Test with:
- PHP 7.4
- PHP 8.0
- PHP 8.1
- PHP 8.2+

---

## Contributing

### Reporting Bugs

1. **Check Existing Issues**
   - Search [GitHub Issues](https://github.com/bph/gt-podcast-bb/issues)

2. **Create New Issue**
   - Use bug report template
   - Include:
     - WordPress version
     - PHP version
     - Plugin version
     - Steps to reproduce
     - Expected vs actual behavior
     - Screenshots/error logs

### Suggesting Features

1. **Open Feature Request**
   - Use feature request template
   - Explain use case
   - Provide examples

### Pull Requests

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then:
   git clone https://github.com/YOUR_USERNAME/gt-podcast-bb.git
   cd gt-podcast-bb
   git remote add upstream https://github.com/bph/gt-podcast-bb.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

3. **Make Changes**
   - Follow coding standards
   - Add PHPDoc/JSDoc comments
   - Test thoroughly

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

5. **Push to Fork**
   ```bash
   git push origin feature/my-new-feature
   ```

6. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out PR template
   - Link related issues

### PR Requirements

- ✅ Passes PHP CodeSniffer
- ✅ Passes ESLint
- ✅ No console errors
- ✅ Tested in latest WordPress
- ✅ Documentation updated
- ✅ Follows coding standards

---

## Extending the Plugin

### Adding a New Binding Source

1. **Register in PHP**

```php
// In gt-podcast-bb.php
register_block_bindings_source(
    'gt-podcast-bb/my-custom-source',
    array(
        'label' => __( 'My Custom Source', 'gt-podcast-bb' ),
        'get_value_callback' => 'gt_my_custom_callback',
        'uses_context' => array( 'postId' ),
    )
);

function gt_my_custom_callback( $source_args, $block_instance, $attribute_name ) {
    $post_id = $block_instance->context['postId'] ?? get_the_ID();
    return get_post_meta( $post_id, 'my_custom_field', true );
}
```

2. **Register in JavaScript**

```javascript
// In resources/js/editor.js
registerBlockBindingsSource({
    name: 'gt-podcast-bb/my-custom-source',
    label: __('My Custom Source', 'gt-podcast-bb'),
    getValues({ bindings }) {
        const values = {};
        for (const [attributeName] of Object.entries(bindings)) {
            values[attributeName] = __('Custom Value', 'gt-podcast-bb');
        }
        return values;
    },
    canUserEditValue: () => false
});
```

### Adding a Block Variation

```javascript
// In resources/js/block-variations.js
const BLOCK_VARIATIONS = [
    // ... existing variations
    {
        blockName: 'core/paragraph',
        variations: [
            {
                name: 'my-custom-variation',
                title: __( 'My Custom Variation', 'gt-podcast-bb' ),
                description: __( 'Description', 'gt-podcast-bb' ),
                icon: 'star-filled',
                bindingKey: 'my_custom_field',
                bindingAttribute: 'content'
            }
        ]
    }
];
```

### Adding a Social Icon

1. **Get SVG Path Data**
   - Find platform logo
   - Convert to 24x24 viewBox
   - Extract path data

2. **Add to PHP**

```php
// In gt_register_social_services()
$podcast_services = array(
    // ... existing services
    'newplatform' => array(
        'name' => __( 'New Platform', 'gt-podcast-bb' ),
        'icon' => '<svg viewBox="0 0 24 24"><path d="..."/></svg>',
    ),
);
```

3. **Add to JavaScript**

```javascript
// In resources/js/podcast-icons.js
const PODCAST_PLATFORMS = {
    // ... existing platforms
    newplatform: {
        name: 'New Platform',
        path: '...'
    }
};
```

---

## Release Process

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **Major (X.0.0):** Breaking changes
- **Minor (0.X.0):** New features, backwards compatible
- **Patch (0.0.X):** Bug fixes

### Creating a Release

1. **Update Version Numbers**
   ```php
   // gt-podcast-bb.php
   * Version: 0.4.0
   define( 'GT_PODCAST_VERSION', '0.4.0' );
   ```

   ```
   // readme.txt
   Stable tag: 0.4.0
   ```

2. **Update Changelog**
   ```
   // readme.txt
   == Changelog ==
   = 0.4.0 =
   * Added: New feature
   * Fixed: Bug fix
   * Changed: Improvement
   ```

3. **Build Production Assets**
   ```bash
   npm run build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Release version 0.4.0"
   git tag v0.4.0
   git push origin main --tags
   ```

5. **Deploy to WordPress.org**
   ```bash
   ./deploy-tag.sh
   ```

6. **Create GitHub Release**
   - Go to GitHub Releases
   - Click "Create a new release"
   - Select tag
   - Add release notes
   - Attach plugin ZIP

---

## Useful Commands

```bash
# Development
npm start                    # Watch and rebuild
npm run build               # Production build

# Code Quality
vendor/bin/phpcs            # Check PHP
vendor/bin/phpcbf           # Fix PHP
npm run lint:js             # Check JavaScript
npm run lint:js:fix         # Fix JavaScript

# Package
./package-and-test.sh       # Create plugin ZIP

# Deploy
./deploy-tag.sh             # Deploy to WordPress.org
```

---

## Resources

- **WordPress Block Editor Handbook:** [developer.wordpress.org/block-editor](https://developer.wordpress.org/block-editor/)
- **Block Bindings API:** [make.wordpress.org/core/2024/03/06/new-feature-the-block-bindings-api](https://make.wordpress.org/core/2024/03/06/new-feature-the-block-bindings-api/)
- **@wordpress/scripts:** [github.com/WordPress/gutenberg/tree/trunk/packages/scripts](https://github.com/WordPress/gutenberg/tree/trunk/packages/scripts)
- **WordPress Coding Standards:** [developer.wordpress.org/coding-standards](https://developer.wordpress.org/coding-standards/)

---

## Next Steps

- **[API Reference →](api-reference.md)** - Technical API documentation
- **[FAQ →](faq.md)** - Common questions
- **[Changelog →](changelog.md)** - Version history

---

[← Back to API Reference](api-reference.md) | [Next: FAQ →](faq.md)
