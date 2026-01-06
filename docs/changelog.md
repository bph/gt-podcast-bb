---
layout: default
title: Changelog
---

# Changelog

All notable changes to GT Podcast Block Bindings are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Spotify social icon integration
- Additional block variations
- Template part suggestions
- Multi-series support improvements

---

## [0.3.6] - 2024-11-11

### Added
- Complete PHPDoc and JSDoc documentation for all code
- GitHub Pages documentation site
- Comprehensive API reference

### Changed
- Improved code organization and comments
- Enhanced function documentation
- Updated version tags throughout

### Documentation
- Created full documentation site at GitHub Pages
- Added Getting Started guide
- Added Usage guide with examples
- Added API Reference
- Added Development guide
- Added FAQ page
- Added this Changelog

---

## [0.3.5] - 2024-11-11

### Fixed
- Deploy script directory handling
- Version consistency in plugin header and constants
- Formatting issues in readme.txt

### Changed
- Updated "Tested up to" WordPress version
- Improved deployment automation scripts

---

## [0.3.4] - 2024-08-22

### Added
- WordPress Playground integration for instant testing
- Blueprint configuration for demo environment
- Demo page content for Playground

### Changed
- Updated README with Playground badge and link
- Improved installation instructions

---

## [0.3.3] - 2024-08-20

### Added
- PHP CodeSniffer integration
- WordPress Coding Standards (WPCS)
- Composer configuration for development dependencies

### Changed
- Code formatting to match WordPress standards
- Improved code quality and consistency

---

## [0.3.2] - 2024-08-12

### Added
- Block variation for Episode Audio Player
- Audio block support in variations system

### Changed
- Enhanced block variations configuration structure
- Improved variation registration error handling

### Fixed
- Button variation showing in wrong inserter location

---

## [0.3.1] - 2024-08-06

### Fixed
- Cover image binding not working in query loops
- Podcast description HTML sanitization
- URL validation for download links

### Changed
- Improved error handling in binding callbacks
- Better fallback behavior for missing data

---

## [0.3.0] - 2024-08-01

### Added
- Block variations for podcast data
  - Episode Recording Date
  - Podcast Description
  - Episode Cover Image
  - Podcast Logo
  - Episode Download Button
- Podcast archive template (taxonomy-series)
- Social link icons for major podcast platforms:
  - Apple Podcasts
  - Pocket Casts
  - CastBox
  - Podbean
  - Podchaser

### Changed
- Refactored JavaScript into separate modules
- Improved build process with webpack
- Enhanced internationalization support

---

## [0.2.0] - 2024-07-15

### Added
- Second block binding source for cover images
- Third binding source for podcast logo
- Series-specific podcast data support
- Fallback mechanism for podcast options

### Changed
- Split binding sources for better organization
- Improved data retrieval performance
- Enhanced context handling

---

## [0.1.0] - 2024-07-01

### Added
- Initial release
- Block Bindings API integration
- Support for Seriously Simple Podcasting
- Episode data binding source
  - Recording date
  - Download link
  - Podcast description
- Basic editor JavaScript
- WordPress 6.8+ compatibility

---

## Version Support

| Version | WordPress | PHP | Status |
|---------|-----------|-----|--------|
| 0.3.6 | 6.8+ | 7.4+ | Current |
| 0.3.5 | 6.8+ | 7.4+ | Supported |
| 0.3.x | 6.8+ | 7.4+ | Supported |
| 0.2.x | 6.8+ | 7.4+ | Legacy |
| 0.1.x | 6.8+ | 7.4+ | Legacy |

---

## Upgrade Notes

### Upgrading to 0.3.x

**From 0.2.x:**
- No breaking changes
- Block variations are additive
- Existing bindings continue to work
- Recommended: Rebuild JavaScript (`npm run build`)

**From 0.1.x:**
- Binding source names changed (legacy names still work)
- Update custom implementations to use new source names
- Rebuild custom blocks using the bindings

### Upgrading to 0.2.x

**From 0.1.x:**
- Added new binding sources
- Existing `gt-podcast-bb/episode-data` source still works
- New sources provide more specific functionality
- No action required for existing implementations

---

## Deprecation Notices

### None Currently

All features introduced remain supported. We maintain backwards compatibility.

---

## Links

- **Repository:** [github.com/bph/gt-podcast-bb](https://github.com/bph/gt-podcast-bb)
- **WordPress.org:** [wordpress.org/plugins/gt-podcast-bb](https://wordpress.org/plugins/gt-podcast-bb/)
- **Documentation:** [bph.github.io/gt-podcast-bb](https://bph.github.io/gt-podcast-bb/)
- **Issues:** [github.com/bph/gt-podcast-bb/issues](https://github.com/bph/gt-podcast-bb/issues)

---

[← Back to FAQ](faq.md) | [Back to Home →](index.md)
