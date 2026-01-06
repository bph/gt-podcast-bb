/**
 * Podcast Block Variations
 *
 * Registers block variations for common blocks (paragraph, button, image, audio)
 * with automatic podcast data bindings. These variations appear in the block inserter
 * allowing users to quickly insert podcast-enabled blocks without manual configuration.
 *
 * @package GT_Podcast_Block_Bindings
 * @since 0.3.6
 */

import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Constants
 */
/** @constant {string} BINDING_SOURCE - The primary binding source namespace for episode data */
const BINDING_SOURCE = 'gt-podcast-bb/episode-data';

/** @constant {string} VARIATION_CATEGORY - Category where variations appear in the inserter */
const VARIATION_CATEGORY = 'media';

/** @constant {Array<string>} VARIATION_SCOPE - Where variations are visible (inserter, block, transform) */
const VARIATION_SCOPE = [ 'inserter' ];

/**
 * Block variation configurations
 *
 * @typedef {Object} VariationConfig
 * @property {string} name - Unique identifier for the variation
 * @property {string} title - Display title in block inserter
 * @property {string} description - Description shown in block inserter
 * @property {string} icon - Dashicon name for the variation
 * @property {string} bindingKey - Key for the binding source (e.g., 'recording_date')
 * @property {string} bindingAttribute - Block attribute to bind to (e.g., 'content', 'url', 'src')
 * @property {Object} [additionalAttributes] - Optional additional block attributes
 *
 * @typedef {Object} BlockVariationSet
 * @property {string} blockName - Core block name (e.g., 'core/paragraph')
 * @property {Array<VariationConfig>} variations - Array of variation configurations for this block
 */

/**
 * Configuration for all podcast block variations
 *
 * @type {Array<BlockVariationSet>}
 */
const BLOCK_VARIATIONS = [
	// Paragraph variations
	{
		blockName: 'core/paragraph',
		variations: [
			{
				name: 'podcast-recording-date',
				title: __( 'Episode Recording Date', 'gt-podcast-bb' ),
				description: __( 'Display the podcast episode recording date', 'gt-podcast-bb' ),
				icon: 'calendar-alt',
				bindingKey: 'recording_date',
				bindingAttribute: 'content'
			},
			{
				name: 'podcast-description',
				title: __( 'Podcast Description', 'gt-podcast-bb' ),
				description: __( 'Display the main podcast description', 'gt-podcast-bb' ),
				icon: 'text',
				bindingKey: 'podcast_description',
				bindingAttribute: 'content'
			}
		]
	},
	// Button variations
	{
		blockName: 'core/button',
		variations: [
			{
				name: 'episode-download-button',
				title: __( 'Episode Download Button', 'gt-podcast-bb' ),
				description: __( 'Button that links to the episode audio file', 'gt-podcast-bb' ),
				icon: 'download',
				bindingKey: 'download_link',
				bindingAttribute: 'url',
				additionalAttributes: {
					text: __( 'Download Episode', 'gt-podcast-bb' )
				}
			}
		]
	},
	// Image variations
	{
		blockName: 'core/image',
		variations: [
			{
				name: 'podcast-episode-cover',
				title: __( 'Episode Cover Image', 'gt-podcast-bb' ),
				description: __( 'Display the episode cover image', 'gt-podcast-bb' ),
				icon: 'format-image',
				bindingKey: 'cover_image',
				bindingAttribute: 'url',
				additionalAttributes: {
					alt: __( 'Episode Cover', 'gt-podcast-bb' )
				}
			},
			{
				name: 'podcast-logo-image',
				title: __( 'Podcast Logo', 'gt-podcast-bb' ),
				description: __( 'Display the main podcast logo/image', 'gt-podcast-bb' ),
				icon: 'admin-media',
				bindingKey: 'podcast_image',
				bindingAttribute: 'url',
				additionalAttributes: {
					alt: __( 'Podcast Logo', 'gt-podcast-bb' )
				}
			}
		]
	},
	// Audio variations
	{
		blockName: 'core/audio',
		variations: [
			{
				name: 'episode-audio-player',
				title: __( 'Episode Audio Player', 'gt-podcast-bb' ),
				description: __( 'Audio player for the podcast episode', 'gt-podcast-bb' ),
				icon: 'controls-volumeon',
				bindingKey: 'download_link',
				bindingAttribute: 'src'
			}
		]
	}
];

/**
 * Creates block binding metadata
 *
 * Generates the metadata.bindings object required for WordPress block bindings.
 * This tells WordPress to connect a specific block attribute to a binding source.
 *
 * @param {string} bindingKey - The key for the binding source (e.g., 'recording_date')
 * @param {string} bindingAttribute - The block attribute to bind to (e.g., 'content', 'url')
 * @return {Object} Metadata object with bindings configuration
 * @return {Object} return.metadata - The metadata object
 * @return {Object} return.metadata.bindings - Bindings configuration keyed by attribute name
 */
const createBindingMetadata = ( bindingKey, bindingAttribute ) => ( {
	metadata: {
		bindings: {
			[ bindingAttribute ]: {
				source: BINDING_SOURCE,
				args: { key: bindingKey }
			}
		}
	}
} );

/**
 * Creates attributes object for block variation
 *
 * Combines binding metadata with any additional attributes (like default text)
 * to create the complete attributes object for the variation.
 *
 * @param {VariationConfig} variation - Variation configuration object
 * @return {Object} Complete attributes object including bindings and additional attributes
 */
const createVariationAttributes = ( variation ) => {
	const bindingMetadata = createBindingMetadata( variation.bindingKey, variation.bindingAttribute );
	const additionalAttributes = variation.additionalAttributes || {};
	
	return {
		...additionalAttributes,
		...bindingMetadata
	};
};

/**
 * Registers a single block variation
 *
 * Takes a variation configuration and registers it with WordPress using
 * the registerBlockVariation API. Handles special cases like the audio block.
 *
 * @param {string} blockName - WordPress core block name (e.g., 'core/paragraph')
 * @param {VariationConfig} variation - Variation configuration object
 * @return {void}
 */
const registerSingleVariation = ( blockName, variation ) => {
	const variationConfig = {
		name: variation.name,
		title: variation.title,
		description: variation.description,
		icon: variation.icon,
		category: VARIATION_CATEGORY,
		attributes: createVariationAttributes( variation ),
		scope: VARIATION_SCOPE
	};

	// Add innerBlocks for audio block to ensure proper structure
	if ( blockName === 'core/audio' ) {
		variationConfig.innerBlocks = [];
	}

	registerBlockVariation( blockName, variationConfig );
};

/**
 * Registers all block variations for a specific block type
 *
 * Iterates through all variations for a given block type and registers each one.
 * Includes error handling for individual variation registration failures.
 *
 * @param {BlockVariationSet} blockConfig - Block configuration containing name and variations
 * @return {void}
 */
const registerBlockVariations = ( blockConfig ) => {
	const { blockName, variations } = blockConfig;
	
	if ( ! Array.isArray( variations ) ) {
		console.warn( `No variations found for block: ${ blockName }` );
		return;
	}

	variations.forEach( ( variation ) => {
		try {
			registerSingleVariation( blockName, variation );
		} catch ( error ) {
			console.error( `Error registering variation ${ variation.name }:`, error );
		}
	} );
};

/**
 * Initialize all podcast block variations
 *
 * Main initialization function that validates the WordPress blocks API is available
 * and registers all configured block variations. Called automatically when script loads.
 *
 * @return {void}
 */
const initializePodcastBlockVariations = () => {
	// Ensure WordPress blocks API is available
	if ( typeof registerBlockVariation !== 'function' ) {
		console.error( 'WordPress blocks API not available' );
		return;
	}

	BLOCK_VARIATIONS.forEach( registerBlockVariations );
};

// Initialize when script loads
initializePodcastBlockVariations();