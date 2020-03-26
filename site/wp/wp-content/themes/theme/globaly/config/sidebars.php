<?php
/**
 * Sidebars configuration.
 *
 * @package Advisto
 */

add_action( 'after_setup_theme', 'globaly_register_sidebars', 5 );
function globaly_register_sidebars() {

	globaly_widget_area()->widgets_settings = apply_filters( 'tm_widget_area_default_settings', array(
		'sidebar-primary' => array(
			'name'           => esc_html__( 'Sidebar Primary', 'globaly' ),
			'description'    => '',
			'before_widget'  => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'   => '</aside>',
			'before_title'   => '<h5 class="widget-title">',
			'after_title'    => '</h5>',
			'before_wrapper' => '<div id="%1$s" %2$s role="complementary">',
			'after_wrapper'  => '</div>',
			'is_global'      => true,
		),
		'sidebar-secondary' => array(
			'name'           => esc_html__( 'Sidebar Secondary', 'globaly' ),
			'description'    => '',
			'before_widget'  => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'   => '</aside>',
			'before_title'   => '<h5 class="widget-title">',
			'after_title'    => '</h5>',
			'before_wrapper' => '<div id="%1$s" %2$s role="complementary">',
			'after_wrapper'  => '</div>',
			'is_global'      => true,
		),
		'footer-area' => array(
			'name'           => esc_html__( 'Footer Area', 'globaly' ),
			'description'    => '',
			'before_widget'  => '<aside id="%1$s" class="widget %2$s">',
			'after_widget'   => '</aside>',
			'before_title'   => '<h5 class="widget-title">',
			'after_title'    => '</h5>',
			'before_wrapper' => '<section id="%1$s" %2$s>',
			'after_wrapper'  => '</section>',
			'is_global'      => true,
		),
	) );
}
