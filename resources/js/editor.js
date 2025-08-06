/**
 * Defines the `gtimes/episode-data` block binding source.
 *
 */

import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

registerBlockBindingsSource({
	name: 'gtimes/episode-data',
	label: __('Episode data', 'gtimes'),
	getValues({ bindings }) {

		const placeholders = {
			recording_date:  __('Recording date', 'gtimes'),
			download_link: __('Download link', 'gtimes'),
			cover_image: __('Cover image', 'gtimes'),
			podcast_description: __('Podcast description', 'gtimes'),
			podcast_image: __('Podcast image', 'gtimes'),
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