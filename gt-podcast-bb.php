<?php
/**
 * Plugin Name:       GT Podbast Block Bindings
 * Plugin URI:        https://icodeforapurpose.com/gt-podcast
 * Description:       Exploring the Block Bindings API in the editor.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Birgit Pauli-Haack 
 * Author URI:        https://icodeforapurpose.com/about
 * Text Domain:       gtimes
 */

add_action( 'init', 'gt_register_binding_sources' );

function gt_register_binding_sources() {
	// Check if function exists (WordPress 6.5+)
	if ( ! function_exists( 'register_block_bindings_source' ) ) {
		add_action( 'admin_notices', function() {
			echo '<div class="notice notice-error"><p>Block Bindings API requires WordPress 6.5 or higher.</p></div>';
		});
		return;
	}

	register_block_bindings_source( 'gtimes/episode-data', [
		'label'              => __( 'Episode Data', 'gtimes' ),
		'get_value_callback' => 'gt_episode_data_callback',
		'uses_context'       => [ 'postId' ],
	]);
}

function gt_episode_data_callback( $source_args, $block_instance, $attribute_name ) {
	if ( empty( $source_args['key'] ) ) {
		return null;
	}

	$post_id = $block_instance->context['postId'] ?? get_the_ID();
	
	if ( ! $post_id ) {
		return null;
	}

	$key = $source_args['key'];
	
	switch( $key ) {
		case 'recording_date':
			$recording_date = get_post_meta( $post_id, 'date_recorded', true );
			if ( $recording_date ) {
				return date_i18n( get_option( 'date_format' ), strtotime( $recording_date ) );
			}
			break;
			
		case 'download_link':
			return get_post_meta( $post_id, 'audio_file', true );
			
		case 'cover_image':
			$cover_image_id = get_post_meta( $post_id, 'cover_image_id', true );
			if ( $cover_image_id ) {
				return wp_get_attachment_url( $cover_image_id );
			}
			break;
			
		case 'podcast_description':
			return get_option( 'ss_podcasting_data_description_20' );
			
		case 'podcast_image':
			return get_option( 'ss_podcasting_data_image_20' );
	}
	
	return null;
}



/* A method responsible for adding the data for rendering the block on frontend.
* see podcast-icons.js
*/ 

add_action( 'enqueue_block_editor_assets','gtimes_custom_icons_editor_assets');

function gtimes_custom_icons_editor_assets(){

	$dir = untrailingslashit( plugin_dir_path( __FILE__ ) );
	$url = untrailingslashit( plugin_dir_url(  __FILE__ ) );

	if ( file_exists( "{$dir}/public/js/editor.asset.php" )) {
		$asset = include "{$dir}/public/js/editor.asset.php";
	};

	if ( file_exists( "{$dir}/public/js/podcast-icons.asset.php" )) {
		$asset = include "{$dir}/public/js/podcast-icons.asset.php";
	};

	wp_enqueue_script(
		'podcast-icons',
		"{$url}/public/js/podcast-icons.js",
		$asset['dependencies'],
		$asset['version'],
		true
	);
	
	// Enqueue block variations
	if ( file_exists( "{$dir}/public/js/block-variations.asset.php" )) {
		$variations_asset = include "{$dir}/public/js/block-variations.asset.php";
		wp_enqueue_script(
			'podcast-block-variations',
			"{$url}/public/js/block-variations.js",
			$variations_asset['dependencies'],
			$variations_asset['version'],
			true
		);
	}
}


add_filter( 'block_core_social_link_get_services', 'podcast_core_social_link' );

function podcast_core_social_link( $services_data ) {
	$services_data['applepod'] = [
		'name' => 'Apple Podcasts',
		'icon' => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.12 0c-3.937-0.011-7.131 3.183-7.12 7.12v17.76c-0.011 3.937 3.183 7.131 7.12 7.12h17.76c3.937 0.011 7.131-3.183 7.12-7.12v-17.76c0.011-3.937-3.183-7.131-7.12-7.12zM15.817 3.421c3.115 0 5.932 1.204 8.079 3.453 1.631 1.693 2.547 3.489 3.016 5.855 0.161 0.787 0.161 2.932 0.009 3.817-0.5 2.817-2.041 5.339-4.317 7.063-0.812 0.615-2.797 1.683-3.115 1.683-0.12 0-0.129-0.12-0.077-0.615 0.099-0.792 0.192-0.953 0.64-1.141 0.713-0.296 1.932-1.167 2.677-1.911 1.301-1.303 2.229-2.932 2.677-4.719 0.281-1.1 0.244-3.543-0.063-4.672-0.969-3.595-3.907-6.385-7.5-7.136-1.041-0.213-2.943-0.213-4 0-3.636 0.751-6.647 3.683-7.563 7.371-0.245 1.004-0.245 3.448 0 4.448 0.609 2.443 2.188 4.681 4.255 6.015 0.407 0.271 0.896 0.547 1.1 0.631 0.447 0.192 0.547 0.355 0.629 1.14 0.052 0.485 0.041 0.62-0.072 0.62-0.073 0-0.62-0.235-1.199-0.511l-0.052-0.041c-3.297-1.62-5.407-4.364-6.177-8.016-0.187-0.943-0.224-3.187-0.036-4.052 0.479-2.323 1.396-4.135 2.921-5.739 2.199-2.319 5.027-3.543 8.172-3.543zM16 7.172c0.541 0.005 1.068 0.052 1.473 0.14 3.715 0.828 6.344 4.543 5.833 8.229-0.203 1.489-0.713 2.709-1.619 3.844-0.448 0.573-1.537 1.532-1.729 1.532-0.032 0-0.063-0.365-0.063-0.803v-0.808l0.552-0.661c2.093-2.505 1.943-6.005-0.339-8.296-0.885-0.896-1.912-1.423-3.235-1.661-0.853-0.161-1.031-0.161-1.927-0.011-1.364 0.219-2.417 0.744-3.355 1.672-2.291 2.271-2.443 5.791-0.348 8.296l0.552 0.661v0.813c0 0.448-0.037 0.807-0.084 0.807-0.036 0-0.349-0.213-0.683-0.479l-0.047-0.016c-1.109-0.885-2.088-2.453-2.495-3.995-0.244-0.932-0.244-2.697 0.011-3.625 0.672-2.505 2.521-4.448 5.079-5.359 0.547-0.193 1.509-0.297 2.416-0.281zM15.823 11.156c0.417 0 0.828 0.084 1.131 0.24 0.645 0.339 1.183 0.989 1.385 1.677 0.62 2.104-1.609 3.948-3.631 3.005h-0.015c-0.953-0.443-1.464-1.276-1.475-2.36 0-0.979 0.541-1.828 1.484-2.328 0.297-0.156 0.709-0.235 1.125-0.235zM15.812 17.464c1.319-0.005 2.271 0.463 2.625 1.291 0.265 0.62 0.167 2.573-0.292 5.735-0.307 2.208-0.479 2.765-0.905 3.141-0.589 0.52-1.417 0.667-2.209 0.385h-0.004c-0.953-0.344-1.157-0.808-1.553-3.527-0.452-3.161-0.552-5.115-0.285-5.735 0.348-0.823 1.296-1.285 2.624-1.291z"/></svg>'
	];
	
	$services_data['pocketcasts'] = [
		'name' => 'Pocket Casts',
		'icon' => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM10.51,16.89a1.5,1.5,0,1,1,3,0,1.5,1.5,0,0,1-3,0Zm2.8-3.52A3.75,3.75,0,0,0,8.7,16.89H6.54a6,6,0,0,1,10.92,0H15.3A3.75,3.75,0,0,0,13.31,13.37Zm2.38-2.69A7.25,7.25,0,0,0,4.31,16.89H2.18a9.5,9.5,0,0,1,19.64,0H19.69A7.25,7.25,0,0,0,15.69,10.68Z"/></svg>'
	];
	
	$services_data['castbox'] = [
		'name' => 'CastBox',
		'icon' => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.568L12 21.136l-5.568-4.568A7.378 7.378 0 0 1 4.8 12c0-1.657.547-3.19 1.472-4.432L12 2.864l5.728 4.704A7.378 7.378 0 0 1 19.2 12c0 1.657-.547 3.19-1.632 4.568zM12 6a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 9a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3z"/></svg>'
	];
	
	$services_data['podbean'] = [
		'name' => 'Podbean',
		'icon' => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 12c0 .34-.04.67-.1 1h-2.4c-.3-1.15-.8-2.3-1.5-3.35L15.5 8.2c1.2 1.15 1.95 2.75 1.95 4.55-.17 0-.33-.05-.45-.15zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>'
	];
	
	$services_data['podchaser'] = [
		'name' => 'Podchaser',
		'icon' => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.5h-11v-11h11v11zm-9-2h7v-7h-7v7zm2-5h3v3h-3v-3z"/></svg>'
	];

	return $services_data;
}

