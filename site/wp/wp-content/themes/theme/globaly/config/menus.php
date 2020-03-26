<?php
/**
 * Menus configuration.
 *
 * @package Advisto
 */

add_action( 'after_setup_theme', 'globaly_register_menus', 5 );
function globaly_register_menus() {

	// This theme uses wp_nav_menu() in four locations.
	register_nav_menus( array(
		'top'    => esc_html__( 'Top', 'globaly' ),
		'main'   => esc_html__( 'Main', 'globaly' ),
		'footer' => esc_html__( 'Footer', 'globaly' ),
		'social' => esc_html__( 'Social', 'globaly' ),
	) );
}
