#!/bin/bash

# Package and Test Script for GT Podcast Plugin
# This script copies distribution files to SVN trunk and WordPress Studio for testing

set -e  # Exit on error

echo "📦 Starting package and test process..."

# Configuration
PROJECT_DIR="/Users/pauli/gt-podcast-bb"
SVN_TRUNK="$PROJECT_DIR/svn-local/gt-podcast-bb/trunk"
WP_STUDIO_SITE="$HOME/WordPress Studio/sites/podcasting site/wp-content/plugins/gt-podcast-bb"

# Files and directories to copy
FILES_TO_COPY=(
    "gt-podcast-bb.php"
    "readme.txt"
    "public"
    "resources"
    "templates"
    "languages"
)

echo "🗑️  Cleaning trunk directory..."
rm -rf "$SVN_TRUNK"
mkdir -p "$SVN_TRUNK"

echo "📋 Copying files to trunk..."
cd "$PROJECT_DIR"

for item in "${FILES_TO_COPY[@]}"; do
    if [ -e "$item" ]; then
        echo "  ✓ Copying $item"
        cp -r "$item" "$SVN_TRUNK/"
    else
        echo "  ⊘ Skipping $item (not found)"
    fi
done

echo ""
echo "✅ Trunk updated successfully!"
echo ""

# Copy to WordPress Studio for testing
echo "🧪 Copying to WordPress Studio for testing..."

if [ -d "$WP_STUDIO_SITE" ]; then
    echo "  Removing old version..."
    rm -rf "$WP_STUDIO_SITE"
fi

mkdir -p "$(dirname "$WP_STUDIO_SITE")"
cp -r "$SVN_TRUNK" "$WP_STUDIO_SITE"

echo ""
echo "✅ Plugin copied to WordPress Studio!"
echo ""
echo "📍 Location: $WP_STUDIO_SITE"
echo ""
echo "Next steps:"
echo "  1. Open WordPress Studio"
echo "  2. Go to Plugins page"
echo "  3. Activate and test the plugin"
echo "  4. When ready to release, run: ./deploy-tag.sh [version]"
echo ""
