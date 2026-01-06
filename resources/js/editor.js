/**
 * Defines the block binding sources for GT Podcast.
 *
 * Registers client-side binding sources that provide placeholder values in the editor.
 * The actual data is populated on the frontend by PHP callbacks.
 *
 * @package GT_Podcast_Block_Bindings
 * @since 0.3.6
 */

import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Episode Data binding source
 *
 * Provides placeholder values for episode-specific data in the block editor.
 * Supports: recording_date, download_link, podcast_description
 */
registerBlockBindingsSource({
	name: 'gt-podcast-bb/episode-data',
	label: __('Episode data', 'gt-podcast-bb'),
	/**
	 * Get placeholder values for the editor
	 *
	 * @param {Object} params - Parameters object
	 * @param {Object} params.bindings - Object containing binding configurations keyed by attribute name
	 * @return {Object} Object mapping attribute names to placeholder values
	 */
	getValues({ bindings }) {
		const placeholders = {
			recording_date: __('Recording date', 'gt-podcast-bb'),
			download_link: __('Download link', 'gt-podcast-bb'),
			podcast_description: __('Podcast description', 'gt-podcast-bb'),
		};

		const values = {};

		for (const [ attributeName, source ] of Object.entries(bindings)) {
			const bindingKey = source.args?.key || attributeName;
			values[attributeName] = placeholders?.[bindingKey] || bindingKey;
		}

		return values;
	},
	/**
	 * Determine if user can edit the bound value
	 *
	 * @return {boolean} Always false - values are read-only from post meta
	 */
	canUserEditValue: () => false
});

/**
 * Cover Image binding source
 *
 * Provides placeholder for episode cover images in the block editor.
 * Actual image URL is populated from the cover_image_id post meta on the frontend.
 */
registerBlockBindingsSource({
	name: 'gt-podcast-bb/cover-image',
	label: __('Cover Image', 'gt-podcast-bb'),
	/**
	 * Get placeholder value for the editor
	 *
	 * @param {Object} params - Parameters object
	 * @param {Object} params.bindings - Object containing binding configurations keyed by attribute name
	 * @return {Object} Object mapping attribute names to placeholder string
	 */
	getValues({ bindings }) {
		const values = {};
		for (const [ attributeName, source ] of Object.entries(bindings)) {
			values[attributeName] = __('Cover Image', 'gt-podcast-bb');
		}
		return values;
	},
	/**
	 * Determine if user can edit the bound value
	 *
	 * @return {boolean} Always false - values are read-only from post meta
	 */
	canUserEditValue: () => false
});

/**
 * Podcast Image binding source
 *
 * Provides placeholder for the main podcast logo/image in the block editor.
 * Actual image URL is populated from plugin options on the frontend.
 */
registerBlockBindingsSource({
	name: 'gt-podcast-bb/podcast-image',
	label: __('Podcast Image', 'gt-podcast-bb'),
	/**
	 * Get placeholder value for the editor
	 *
	 * @param {Object} params - Parameters object
	 * @param {Object} params.bindings - Object containing binding configurations keyed by attribute name
	 * @return {Object} Object mapping attribute names to placeholder string
	 */
	getValues({ bindings }) {
		const values = {};
		for (const [ attributeName, source ] of Object.entries(bindings)) {
			values[attributeName] = __('Podcast Image', 'gt-podcast-bb');
		}
		return values;
	},
	/**
	 * Determine if user can edit the bound value
	 *
	 * @return {boolean} Always false - values are read-only from plugin options
	 */
	canUserEditValue: () => false
});