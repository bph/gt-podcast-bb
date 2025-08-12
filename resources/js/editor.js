/**
 * Defines the block binding sources for GT Podcast.
 *
 */

import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

// Episode Data source (for recording date, podcast description, download link)
registerBlockBindingsSource({
	name: 'gt-podcast-bb/episode-data',
	label: __('Episode data', 'gt-podcast-bb'),
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
	canUserEditValue: () => false
});

// Cover Image source
registerBlockBindingsSource({
	name: 'gt-podcast-bb/cover-image',
	label: __('Cover Image', 'gt-podcast-bb'),
	getValues({ bindings }) {
		const values = {};
		for (const [ attributeName, source ] of Object.entries(bindings)) {
			values[attributeName] = __('Cover Image', 'gt-podcast-bb');
		}
		return values;
	},
	canUserEditValue: () => false
});

// Podcast Image source
registerBlockBindingsSource({
	name: 'gt-podcast-bb/podcast-image',
	label: __('Podcast Image', 'gt-podcast-bb'),
	getValues({ bindings }) {
		const values = {};
		for (const [ attributeName, source ] of Object.entries(bindings)) {
			values[attributeName] = __('Podcast Image', 'gt-podcast-bb');
		}
		return values;
	},
	canUserEditValue: () => false
});