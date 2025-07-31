//I create block variations for podcast data
import { registerBlockVariation } from '@wordpress/blocks';

// Podcast Block Variations for common blocks

// Paragraph variations for podcast data
registerBlockVariation('core/paragraph', {
    name: 'podcast-recording-date',
    title: 'Episode Recording Date',
    description: 'Display the podcast episode recording date',
    icon: 'calendar-alt',
    category: 'media',
    attributes: {
        metadata: {
            bindings: {
                content: {
                    source: 'gtimes/episode-data',
                    args: { key: 'recording_date' }
                }
            }
        }
    },
    scope: ['inserter']
});

registerBlockVariation('core/paragraph', {
    name: 'podcast-description',
    title: 'Podcast Description', 
    description: 'Display the main podcast description',
    icon: 'text',
    category: 'media',
    attributes: {
        metadata: {
            bindings: {
                content: {
                    source: 'gtimes/episode-data',
                    args: { key: 'podcast_description' }
                }
            }
        }
    },
    scope: ['inserter']
});

// Button variation for download link
registerBlockVariation('core/button', {
    name: 'episode-download-button',  
    title: 'Episode Download Button',
    description: 'Button that links to the episode audio file',
    icon: 'download',
    category: 'media',
    attributes: {
        text: 'Download Episode',

        metadata: {
            bindings: {
                url: {
                    source: 'gtimes/episode-data',
                    args: { key: 'download_link' }
                }
            }
        }
    },
    scope: ['inserter']
});

// Image variations for podcast images
registerBlockVariation('core/image', {
    name: 'podcast-episode-cover',
    title: 'Episode Cover Image',
    description: 'Display the episode cover image',
    icon: 'format-image',
    category: 'media', 
    attributes: {
        alt: 'Episode Cover',
        metadata: {
            bindings: {
                url: {
                    source: 'gtimes/episode-data',
                    args: { key: 'cover_image' }
                }
            }
        }
    },
    scope: ['inserter']
});

registerBlockVariation('core/image', {
    name: 'podcast-logo-image',
    title: 'Podcast Logo',
    description: 'Display the main podcast logo/image',
    icon: 'admin-media',
    category: 'media',
    attributes: {
        alt: 'Podcast Logo',
        metadata: {
            bindings: {
                url: {
                    source: 'gtimes/episode-data', 
                    args: { key: 'podcast_image' }
                }
            }
        }
    },
    scope: ['inserter']
});