/**
 * Defines the block binding sources for GT Podcast.
 *
 */

import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

// Episode Data source (for recording date, podcast description, download link)
registerBlockBindingsSource({
	name: 'gtimes/episode-data',
	label: __('Episode data', 'gtimes'),
	getValues({ bindings }) {
		const placeholders = {
			recording_date: __('Recording date', 'gtimes'),
			download_link: __('Download link', 'gtimes'),
			podcast_description: __('Podcast description', 'gtimes'),
		};

		const values = {};

		for (const [ attributeName, source ] of Object.entries(bindings)) {
			const bindingKey = source.args?.key || attributeName;
			values[attributeName] = placeholders?.[bindingKey] || bindingKey;
		}

		return values;
	},
	canUserEditValue: () => false
});

// Cover Image source
registerBlockBindingsSource({
	name: 'gtimes/cover-image',
	label: __('Cover Image', 'gtimes'),
	getValues({ bindings }) {
		const values = {};
		for (const [ attributeName, source ] of Object.entries(bindings)) {
			values[attributeName] = __('Cover Image', 'gtimes');
		}
		return values;
	},
	canUserEditValue: () => false
});

// Podcast Image source
registerBlockBindingsSource({
	name: 'gtimes/podcast-image',
	label: __('Podcast Image', 'gtimes'),
	getValues({ bindings }) {
		const values = {};
		for (const [ attributeName, source ] of Object.entries(bindings)) {
			values[attributeName] = __('Podcast Image', 'gtimes');
		}
		return values;
	},
	canUserEditValue: () => false
});