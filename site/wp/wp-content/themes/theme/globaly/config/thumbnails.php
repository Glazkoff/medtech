<?php
/**
 * Thumbnails configuration.
 *
 * @package Advisto
 */

add_action( 'after_setup_theme', 'globaly_register_image_sizes', 5 );
function globaly_register_image_sizes() {
	set_post_thumbnail_size( 640, 506, true );

	// Registers a new image sizes.
	add_image_size( 'globaly-thumb-s', 130, 136, true );
	add_image_size( 'globaly-thumb-sm', 388, 276, true );
	add_image_size( 'globaly-thumb-m', 400, 400, true );
	add_image_size( 'globaly-thumb-blog-module', 536, 282, true );
	add_image_size( 'globaly-thumb-blog-grid', 536, 505, true );
	add_image_size( 'globaly-thumb-l', 1280, 506, true );
	add_image_size( 'globaly-thumb-xl', 1920, 1080, true );
	add_image_size( 'globaly-author-avatar', 512, 512, true );

	add_image_size( 'globaly-thumb-240-100', 240, 100, true );
	add_image_size( 'globaly-thumb-560-350', 560, 350, true );
}
