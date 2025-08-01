/**
 * Podcast Block Variations
 * 
 * Registers block variations for common blocks with podcast data bindings
 * 
 * @package GT_Podcast_Block_Bindings
 * @since 1.0.0
 */

import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Constants
 */
const BINDING_SOURCE = 'gtimes/episode-data';
const VARIATION_CATEGORY = 'media';
const VARIATION_SCOPE = [ 'inserter' ];

/**
 * Block variation configurations
 */
const BLOCK_VARIATIONS = [
	// Paragraph variations
	{
		blockName: 'core/paragraph',
		variations: [
			{
				name: 'podcast-recording-date',
				title: __( 'Episode Recording Date', 'gtimes' ),
				description: __( 'Display the podcast episode recording date', 'gtimes' ),
				icon: 'calendar-alt',
				bindingKey: 'recording_date',
				bindingAttribute: 'content'
			},
			{
				name: 'podcast-description',
				title: __( 'Podcast Description', 'gtimes' ),
				description: __( 'Display the main podcast description', 'gtimes' ),
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
				title: __( 'Episode Download Button', 'gtimes' ),
				description: __( 'Button that links to the episode audio file', 'gtimes' ),
				icon: 'download',
				bindingKey: 'download_link',
				bindingAttribute: 'url',
				additionalAttributes: {
					text: __( 'Download Episode', 'gtimes' )
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
				title: __( 'Episode Cover Image', 'gtimes' ),
				description: __( 'Display the episode cover image', 'gtimes' ),
				icon: 'format-image',
				bindingKey: 'cover_image',
				bindingAttribute: 'url',
				additionalAttributes: {
					alt: __( 'Episode Cover', 'gtimes' )
				}
			},
			{
				name: 'podcast-logo-image',
				title: __( 'Podcast Logo', 'gtimes' ),
				description: __( 'Display the main podcast logo/image', 'gtimes' ),
				icon: 'admin-media',
				bindingKey: 'podcast_image',
				bindingAttribute: 'url',
				additionalAttributes: {
					alt: __( 'Podcast Logo', 'gtimes' )
				}
			}
		]
	}
];

/**
 * Creates block binding metadata
 * 
 * @param {string} bindingKey The key for the binding source
 * @param {string} bindingAttribute The attribute to bind to
 * @returns {Object} Binding metadata object
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
 * @param {Object} variation Variation configuration
 * @returns {Object} Attributes object
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
 * @param {string} blockName Block name to register variation for
 * @param {Object} variation Variation configuration
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

	registerBlockVariation( blockName, variationConfig );
};

/**
 * Registers all block variations for a specific block type
 * 
 * @param {Object} blockConfig Block configuration with variations
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