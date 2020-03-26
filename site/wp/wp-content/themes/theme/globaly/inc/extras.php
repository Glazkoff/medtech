<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Advisto
 */

/**
 * Set post specific meta value
 *
 * @param  string $value Default meta-value.
 * @return string
 */
function globaly_set_post_meta_value( $value ) {
	$queried_obj = apply_filters( 'globaly_queried_object_id', false );

	if ( ! $queried_obj ) {

		if ( ! is_singular() ) {
			return $value;
		}

		if ( is_front_page() && 'page' !== get_option( 'show_on_front' ) ) {
			return $value;
		}

	}

	$queried_obj = ( ! $queried_obj ) ? get_the_id() : $queried_obj;

	if ( ! $queried_obj ) {
		return $value;
	}

	$curr_opions = 'globaly_' . str_replace( 'theme_mod_', '', current_filter() );
 	$post_position = get_post_meta( $queried_obj, $curr_opions, true );

	if ( ! $post_position || 'inherit' === $post_position ) {
		return $value;
	}

	return $post_position;

}

function globaly_set_sidebar_position( $value ) {
 $sp = globaly_set_post_meta_value( $value );
 $sp = ! is_404() ? $sp : 'fullwidth';

 return $sp;
}

/** * Sidebar position */
add_filter( 'theme_mod_sidebar_position', 'globaly_set_sidebar_position' );

/** * Header container type */
add_filter( 'theme_mod_header_container_type', 'globaly_set_post_meta_value' );

/** * Content container type */
add_filter( 'theme_mod_content_container_type', 'globaly_set_post_meta_value' );

/** * Footer container type */
add_filter( 'theme_mod_fotter_container_type', 'globaly_set_post_meta_value' );

/**
 * Render existing macros in passed string.
 *
 * @since  1.0.0
 * @param  string $string String to parse.
 * @return string
 */
function globaly_render_macros( $string ) {

	$macros = apply_filters( 'globaly_data_macros', array(
		'/%%year%%/' => date( 'Y' ),
		'/%%date%%/' => date( get_option( 'date_format' ) ),
		'/%%privacy-policy%%/' => globaly_get_privacy_link(),
	) );

	return preg_replace( array_keys( $macros ), array_values( $macros ), $string );

}

/**
 * Get privacy policy link
 *
 * @return string
 */
function globaly_get_privacy_link() {
	$page = get_page_by_path( 'privacy-policy' );
	if (!$page) {
		return;
	}
	return get_permalink( $page->ID );
}

/**
 * Render font icons in content
 *
 * @param  string $content content to render
 * @return string
 */
function globaly_render_icons( $content ) {
	$icons     = globaly_get_render_icons_set();
	$icons_set = implode( '|', array_keys( $icons ) );

	$regex = '/icon:(' . $icons_set . ')?:?([a-zA-Z0-9-_]+)/';

	return preg_replace_callback( $regex, 'globaly_render_icons_callback', $content );
}

/**
 * Callback for icons render.
 *
 * @param  array $matches Search matches array.
 * @return string
 */
function globaly_render_icons_callback( $matches ) {

	if ( empty( $matches[1] ) && empty( $matches[2] ) ) {
		return $matches[0];
	}

	if ( empty( $matches[1] ) ) {
		return sprintf( '<i class="fa fa-%s"></i>', $matches[2] );
	}

	$icons = globaly_get_render_icons_set();

	if ( ! isset( $icons[ $matches[1] ] ) ) {
		return $matches[0];
	}

	return sprintf( $icons[ $matches[1] ], $matches[2] );
}

/**
 * Get list of icons to render.
 *
 * @return array
 */
function globaly_get_render_icons_set() {
	return apply_filters( 'globaly_render_icons_set', array(
		'fa'       => '<i class="fa fa-%s"></i>',
		'material' => '<i class="material-icons">%s</i>',
	) );
}

/**
 * Replace %s with theme URL.
 *
 * @param  string $url Formatted URL to parse.
 * @return string
 */
function globaly_render_theme_url( $url ) {
	return sprintf( $url, get_stylesheet_directory_uri() );
}

/**
 * Get image ID by URL.
 *
 * @param  string $image_src Image URL to search it in database.
 * @return int|bool false
 */
function globaly_get_image_id_by_url( $image_src ) {
	global $wpdb;

	$query = "SELECT ID FROM {$wpdb->posts} WHERE guid='$image_src'";
	$id    = $wpdb->get_var( $query );

	return $id;
}

function globaly_post_formats_gallery() {
	$size = globaly_post_thumbnail_size();

	if ( ! in_array( get_theme_mod( 'blog_layout_type' ), array( 'masonry-2-cols', 'masonry-3-cols' ) ) ) {
		return do_action( 'cherry_post_format_gallery', array(
			'size' => $size[ 'size' ],
		) );
	}

	$images = globaly_theme()->get_core()->modules['cherry-post-formats-api']->get_gallery_images(false);

	if ( is_string( $images ) && ! empty( $images ) ) {
		return $images;
	}

	$items             = array();
	$first_item        = null;
	$size              = $size[ 'size' ];
	$format            = '<div class="mini-gallery post-thumbnail--fullwidth">%1$s<div class="post-gallery__slides" style="display: none;">%2$s</div></div>';
	$first_item_format = '<a href="%1$s" class="post-thumbnail__link">%2$s</a>';
	$item_format       = '<a href="%1$s">%2$s</a>';

	foreach( $images as $img ) {
		$image = wp_get_attachment_image( $img, $size );
		$url   = wp_get_attachment_url( $img );

		if ( sizeof( $items ) === 0 ) {
			$first_item = sprintf( $first_item_format, $url, $image );
		}

		$items[] = sprintf( $item_format, $url, $image );
	}

	printf( $format, $first_item, join( "\r\n", $items ) );
}

/**
 * Check if passed meta data is visible in current context.
 *
 * @since  1.0.0
 * @param  string $meta    Meta setting to check.
 * @param  string $context Current post context - 'single' or 'loop'.
 * @return bool
 */
function globaly_is_meta_visible( $meta, $context = 'loop' ) {

	if ( ! $meta ) {
		return false;
	}

	$meta_enabled = get_theme_mod( $meta, globaly_theme()->customizer->get_default( $meta ) );

	switch ( $context ) {

		case 'loop':

			if ( ! is_single() && $meta_enabled ) {
				return true;
			} else {
				return false;
			}

		case 'single':

			if ( is_single() && $meta_enabled ) {
				return true;
			} else {
				return false;
			}

	}

	return false;
}

/**
 * Get post thumbnail size.
 *
 * @return array
 */
function globaly_post_thumbnail_size( $args = array() ) {
	$args = wp_parse_args( $args, array(
		'small'             => 'post-thumbnail',
		'fullwidth'         => 'globaly-thumb-l',
		'grid-masonry-cols' => 'globaly-thumb-blog-grid',
		'class_prefix'      => '',
	) );

	$layout      = get_theme_mod( 'blog_layout_type', globaly_theme()->customizer->get_default( 'blog_layout_type' ) );
	$format      = get_post_format();
	$size_option = get_theme_mod( 'blog_featured_image', globaly_theme()->customizer->get_default( 'blog_featured_image' ) );
	$size        = $args[ $size_option ];
	$link_class  = sanitize_html_class( $args['class_prefix'] . $size_option );

	if ( 'default' !== $layout
		|| is_single()
		|| in_array( $format , array( ) )
	) {
		$size       = $args['fullwidth'];
		$link_class = $args['class_prefix'] . 'fullwidth';
	}

	if ( in_array(  $layout, array(  'grid-2-cols', 'masonry-2-cols',   'grid-3-cols', 'masonry-3-cols' ) ) ) {
		$size       = $args['grid-masonry-cols'];
	}

	return array(
		'size'  => $size,
		'class' => $link_class,
	);
}
