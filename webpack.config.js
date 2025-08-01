// WordPress webpack config.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Utilities.
const path = require( 'path' );

// Add any a new entry point by extending the webpack config.
module.exports = {
	...defaultConfig,
	...{
		entry: {
			'js/editor': path.resolve( process.cwd(), 'resources/js', 'editor.js' ),
            'js/podcast-icons': path.resolve( process.cwd(), 'resources/js', 'podcast-icons.js' ),
            'js/block-variations': path.resolve( process.cwd(), 'resources/js', 'block-variations.js' )
		}
	}
};
