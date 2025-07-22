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
	register_block_bindings_source( 'gtimes/episode-data', [
		'label'              => __( 'Episode Data', 'gtimes' ),
		'get_value_callback' => 'gt_episode_data_callback',
		'uses_context'       => [ 'postId' ],
	]);
}