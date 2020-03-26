<?php
/**
 * Theme Customizer.
 *
 * @package Advisto
 */

/**
 * Retrieve a holder for Customizer options.
 *
 * @since  1.0.0
 * @return array
 */
function globaly_get_customizer_options() {
	/**
	 * Filter a holder for Customizer options (for theme/plugin developer customization).
	 *
	 * @since 1.0.0
	 */
	return apply_filters( 'globaly_get_customizer_options' , array(
		'prefix'     => 'globaly',
		'capability' => 'edit_theme_options',
		'type'       => 'theme_mod',
		'options'    => array(

			/** `Site Indentity` section */
			'show_tagline' => array(
				'title'    => esc_html__( 'Show tagline after logo', 'globaly' ),
				'section'  => 'title_tagline',
				'priority' => 60,
				'default'  => true,
				'field'    => 'checkbox',
				'type'     => 'control',
			),
			'totop_visibility' => array(
				'title'   => esc_html__( 'Show ToTop button', 'globaly' ),
				'section' => 'title_tagline',
				'priority' => 61,
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'page_preloader' => array(
				'title'    => esc_html__( 'Show page preloader', 'globaly' ),
				'section'  => 'title_tagline',
				'priority' => 62,
				'default'  => true,
				'field'    => 'checkbox',
				'type'     => 'control',
			),
			'general_settings' => array(
				'title'       => esc_html__( 'General Site settings', 'globaly' ),
				'priority'    => 40,
				'type'        => 'panel',
			),

			/** `Logo & Favicon` section */
			'logo_favicon' => array(
				'title'       => esc_html__( 'Logo &amp; Favicon', 'globaly' ),
				'priority'    => 25,
				'panel'       => 'general_settings',
				'type'        => 'section',
			),
			'header_logo_type' => array(
				'title'   => esc_html__( 'Logo Type', 'globaly' ),
				'section' => 'logo_favicon',
				'default' => 'image',
				'field'   => 'radio',
				'choices' => array(
					'image' => esc_html__( 'Image', 'globaly' ),
					'text'  => esc_html__( 'Text', 'globaly' ),
				),
				'type' => 'control',
			),
			'header_logo_url' => array(
				'title'           => esc_html__( 'Logo Upload', 'globaly' ),
				'description'     => esc_html__( 'Upload logo image', 'globaly' ),
				'section'         => 'logo_favicon',
				'default'         => '%s/assets/images/logo.png',
				'field'           => 'image',
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_image',
			),
			'retina_header_logo_url' => array(
				'title'           => esc_html__( 'Retina Logo Upload', 'globaly' ),
				'description'     => esc_html__( 'Upload logo for retina-ready devices', 'globaly' ),
				'section'         => 'logo_favicon',
				'field'           => 'image',
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_image',
			),
			'header_logo_font_family' => array(
				'title'           => esc_html__( 'Font Family', 'globaly' ),
				'section'         => 'logo_favicon',
				'default'         => 'Merriweather, serif',
				'field'           => 'fonts',
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_text',
			),
			'header_logo_font_style' => array(
				'title'           => esc_html__( 'Font Style', 'globaly' ),
				'section'         => 'logo_favicon',
				'default'         => 'normal',
				'field'           => 'select',
				'choices'         => globaly_get_font_styles(),
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_text',
			),
			'header_logo_font_weight' => array(
				'title'           => esc_html__( 'Font Weight', 'globaly' ),
				'section'         => 'logo_favicon',
				'default'         => '700',
				'field'           => 'select',
				'choices'         => globaly_get_font_weight(),
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_text',
			),
			'header_logo_font_size' => array(
				'title'           => esc_html__( 'Font Size, px', 'globaly' ),
				'section'         => 'logo_favicon',
				'default'         => '36',
				'field'           => 'number',
				'input_attrs'     => array(
					'min'  => 6,
					'max'  => 50,
					'step' => 1,
				),
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_text',
			),
			'header_logo_character_set' => array(
				'title'           => esc_html__( 'Character Set', 'globaly' ),
				'section'         => 'logo_favicon',
				'default'         => 'latin',
				'field'           => 'select',
				'choices'         => globaly_get_character_sets(),
				'type'            => 'control',
				'active_callback' => 'globaly_is_header_logo_text',
			),

			/** `Breadcrumbs` section */
			'breadcrumbs' => array(
				'title'    => esc_html__( 'Breadcrumbs', 'globaly' ),
				'priority' => 30,
				'type'     => 'section',
				'panel'    => 'general_settings',
			),
			'breadcrumbs_visibillity' => array(
				'title'   => esc_html__( 'Enable Breadcrumbs', 'globaly' ),
				'section' => 'breadcrumbs',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'breadcrumbs_front_visibillity' => array(
				'title'   => esc_html__( 'Enable Breadcrumbs on front page', 'globaly' ),
				'section' => 'breadcrumbs',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'breadcrumbs_page_title' => array(
				'title'   => esc_html__( 'Enable page title in breadcrumbs area', 'globaly' ),
				'section' => 'breadcrumbs',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'breadcrumbs_path_type' => array(
				'title'   => esc_html__( 'Show full/minified path', 'globaly' ),
				'section' => 'breadcrumbs',
				'default' => 'minified',
				'field'   => 'select',
				'choices' => array(
					'full'     => esc_html__( 'Full', 'globaly' ),
					'minified' => esc_html__( 'Minified', 'globaly' ),
				),
				'type'    => 'control',
			),

			/** `Social links` section */
			'social_links' => array(
				'title'    => esc_html__( 'Social links', 'globaly' ),
				'priority' => 50,
				'type'     => 'section',
				'panel'    => 'general_settings',
			),
			'header_social_links' => array(
				'title'   => esc_html__( 'Show social links in header', 'globaly' ),
				'section' => 'social_links',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'footer_social_links' => array(
				'title'   => esc_html__( 'Show social links in footer', 'globaly' ),
				'section' => 'social_links',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'blog_post_share_buttons' => array(
				'title'   => esc_html__( 'Show social sharing to blog posts', 'globaly' ),
				'section' => 'social_links',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'single_post_share_buttons' => array(
				'title'   => esc_html__( 'Show social sharing to single blog post', 'globaly' ),
				'section' => 'social_links',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),

			/** `Page Layout` section */
			'page_layout' => array(
				'title'    => esc_html__( 'Page Layout', 'globaly' ),
				'priority' => 55,
				'type'     => 'section',
				'panel'    => 'general_settings',
			),
			'header_container_type' => array(
			 	'title'   => esc_html__( 'Header type', 'globaly' ),
				'section' => 'page_layout',
				'default' => 'fullwidth',
				'field'   => 'select',
				'choices' => array(
					'boxed'     => esc_html__( 'Boxed', 'globaly' ),
					'fullwidth' => esc_html__( 'Fullwidth', 'globaly' ),
				),
				'type' => 'control',
			),
			'content_container_type' => array(
				'title'   => esc_html__( 'Content type', 'globaly' ),
				'section' => 'page_layout',
				'default' => 'boxed',
				'field'   => 'select',
				'choices' => array(
					'boxed'     => esc_html__( 'Boxed', 'globaly' ),
					'fullwidth' => esc_html__( 'Fullwidth', 'globaly' ),
				),
				'type' => 'control',
			),
			'footer_container_type' => array(
				'title'   => esc_html__( 'Footer type', 'globaly' ),
				'section' => 'page_layout',
				'default' => 'fullwidth',
				'field'   => 'select',
				'choices' => array(
					'boxed'     => esc_html__( 'Boxed', 'globaly' ),
					'fullwidth' => esc_html__( 'Fullwidth', 'globaly' ),
				),
				'type' => 'control',
			),
			'container_width' => array(
				'title'       => esc_html__( 'Container width (px)', 'globaly' ),
				'section'     => 'page_layout',
				'default'     => 1760,
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 960,
					'max'  => 1920,
					'step' => 1,
				),
				'type' => 'control',
			),
			'sidebar_width' => array(
				'title'   => esc_html__( 'Sidebar width', 'globaly' ),
				'section' => 'page_layout',
				'default' => '1/4',
				'field'   => 'select',
				'choices' => array(
					'1/3' => '1/3',
					'1/4' => '1/4',
				),
				'sanitize_callback' => 'sanitize_text_field',
				'type'              => 'control',
			),

			/** `Color Scheme` panel */
			'color_scheme' => array(
				'title'       => esc_html__( 'Color Scheme', 'globaly' ),
				'description' => esc_html__( 'Configure Color Scheme', 'globaly' ),
				'priority'    => 40,
				'type'        => 'panel',
			),

			/** `Regular scheme` section */
			'regular_scheme' => array(
				'title'       => esc_html__( 'Regular scheme', 'globaly' ),
				'priority'    => 1,
				'panel'       => 'color_scheme',
				'type'        => 'section',
			),
			'regular_accent_color_1' => array(
				'title'   => esc_html__( 'Accent color (1)', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#15c1c6',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_accent_color_2' => array(
				'title'   => esc_html__( 'Accent color (2)', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#333333',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_text_color' => array(
				'title'   => esc_html__( 'Text color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#777777',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_link_color' => array(
				'title'   => esc_html__( 'Link color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#15c1c6',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_link_hover_color' => array(
				'title'   => esc_html__( 'Link hover color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#333333',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_h1_color' => array(
				'title'   => esc_html__( 'H1 color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_h2_color' => array(
				'title'   => esc_html__( 'H2 color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_h3_color' => array(
				'title'   => esc_html__( 'H3 color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_h4_color' => array(
				'title'   => esc_html__( 'H4 color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_h5_color' => array(
				'title'   => esc_html__( 'H5 color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#15c1c6',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'regular_h6_color' => array(
				'title'   => esc_html__( 'H6 color', 'globaly' ),
				'section' => 'regular_scheme',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),

			/** `Invert scheme` section */
			'invert_scheme' => array(
				'title'       => esc_html__( 'Invert scheme', 'globaly' ),
				'priority'    => 1,
				'panel'       => 'color_scheme',
				'type'        => 'section',
			),
			'invert_accent_color_1' => array(
				'title'   => esc_html__( 'Accent color (1)', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_accent_color_2' => array(
				'title'   => esc_html__( 'Accent color (2)', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_text_color' => array(
				'title'   => esc_html__( 'Text color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_link_color' => array(
				'title'   => esc_html__( 'Link color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#15c1c6',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_link_hover_color' => array(
				'title'   => esc_html__( 'Link hover color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#ffffff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_h1_color' => array(
				'title'   => esc_html__( 'H1 color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_h2_color' => array(
				'title'   => esc_html__( 'H2 color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_h3_color' => array(
				'title'   => esc_html__( 'H3 color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_h4_color' => array(
				'title'   => esc_html__( 'H4 color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_h5_color' => array(
				'title'   => esc_html__( 'H5 color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'invert_h6_color' => array(
				'title'   => esc_html__( 'H6 color', 'globaly' ),
				'section' => 'invert_scheme',
				'default' => '#fff',
				'field'   => 'hex_color',
				'type'    => 'control',
			),

			/** `Typography Settings` panel */
			'typography' => array(
				'title'       => esc_html__( 'Typography', 'globaly' ),
				'description' => esc_html__( 'Configure typography settings', 'globaly' ),
				'priority'    => 45,
				'type'        => 'panel',
			),

			/** `Body text` section */
			'body_typography' => array(
				'title'       => esc_html__( 'Body text', 'globaly' ),
				'priority'    => 5,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'body_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'body_typography',
				'default' => 'Merriweather Sans, sans-serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'body_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'body_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'body_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'body_typography',
				'default' => '400',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'body_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'body_typography',
				'default'     => '16',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 6,
					'max'  => 50,
					'step' => 1,
				),
				'type' => 'control',
			),
			'body_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'body_typography',
				'default'     => '1.4375',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'body_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'body_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'body_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'body_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'body_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'body_typography',
				'default' => 'left',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `H1 Heading` section */
			'h1_typography' => array(
				'title'       => esc_html__( 'H1 Heading', 'globaly' ),
				'priority'    => 10,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'h1_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'h1_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'h1_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'h1_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'h1_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'h1_typography',
				'default' => '300',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'h1_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'h1_typography',
				'default'     => '66',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 10,
					'max'  => 200,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h1_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'h1_typography',
				'default'     => '1.31818',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'h1_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'h1_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h1_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'h1_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'h1_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'h1_typography',
				'default' => 'inherit',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `H2 Heading` section */
			'h2_typography' => array(
				'title'       => esc_html__( 'H2 Heading', 'globaly' ),
				'priority'    => 15,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'h2_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'h2_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'h2_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'h2_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'h2_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'h2_typography',
				'default' => '700',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'h2_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'h2_typography',
				'default'     => '48',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 10,
					'max'  => 200,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h2_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'h2_typography',
				'default'     => '1.36957',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'h2_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'h2_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h2_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'h2_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'h2_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'h2_typography',
				'default' => 'inherit',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `H3 Heading` section */
			'h3_typography' => array(
				'title'       => esc_html__( 'H3 Heading', 'globaly' ),
				'priority'    => 20,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'h3_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'h3_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'h3_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'h3_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'h3_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'h3_typography',
				'default' => '300',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'h3_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'h3_typography',
				'default'     => '36',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 10,
					'max'  => 200,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h3_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'h3_typography',
				'default'     => '1.33333',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'h3_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'h3_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h3_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'h3_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'h3_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'h3_typography',
				'default' => 'inherit',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `H4 Heading` section */
			'h4_typography' => array(
				'title'       => esc_html__( 'H4 Heading', 'globaly' ),
				'priority'    => 25,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'h4_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'h4_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'h4_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'h4_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'h4_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'h4_typography',
				'default' => '500',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'h4_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'h4_typography',
				'default'     => '29',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 10,
					'max'  => 200,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h4_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'h4_typography',
				'default'     => '1.38462',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'h4_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'h4_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h4_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'h4_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'h4_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'h4_typography',
				'default' => 'inherit',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `H5 Heading` section */
			'h5_typography' => array(
				'title'       => esc_html__( 'H5 Heading', 'globaly' ),
				'priority'    => 30,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'h5_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'h5_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'h5_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'h5_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'h5_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'h5_typography',
				'default' => '700',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'h5_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'h5_typography',
				'default'     => '24',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 10,
					'max'  => 200,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h5_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'h5_typography',
				'default'     => '1.5',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'h5_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'h5_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h5_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'h5_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'h5_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'h5_typography',
				'default' => 'inherit',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `H6 Heading` section */
			'h6_typography' => array(
				'title'       => esc_html__( 'H6 Heading', 'globaly' ),
				'priority'    => 35,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'h6_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'h6_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'h6_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'h6_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'h6_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'h6_typography',
				'default' => '700',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'h6_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'h6_typography',
				'default'     => '18',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 10,
					'max'  => 200,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h6_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'h6_typography',
				'default'     => '1.27778',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'h6_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'h6_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'h6_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'h6_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'h6_text_align' => array(
				'title'   => esc_html__( 'Text Align', 'globaly' ),
				'section' => 'h6_typography',
				'default' => 'inherit',
				'field'   => 'select',
				'choices' => globaly_get_text_aligns(),
				'type'    => 'control',
			),

			/** `Breadcrumbs` section */
			'breadcrumbs_typography' => array(
				'title'       => esc_html__( 'Breadcrumbs', 'globaly' ),
				'priority'    => 45,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'breadcrumbs_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'breadcrumbs_typography',
				'default' => 'Lato, sans-serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'breadcrumbs_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'breadcrumbs_typography',
				'default' => 'normal',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'breadcrumbs_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'breadcrumbs_typography',
				'default' => '900',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'breadcrumbs_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'breadcrumbs_typography',
				'default'     => '13',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 6,
					'max'  => 50,
					'step' => 1,
				),
				'type' => 'control',
			),
			'breadcrumbs_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'breadcrumbs_typography',
				'default'     => '2.15385',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'breadcrumbs_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'breadcrumbs_typography',
				'default'     => '0.52',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'breadcrumbs_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'breadcrumbs_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),

			/** `Header` panel */
			'header_options' => array(
				'title'       => esc_html__( 'Header', 'globaly' ),
				'priority'    => 60,
				'type'        => 'panel',
			),

			/** `Header styles` section */
			'header_styles' => array(
				'title'       => esc_html__( 'Styles', 'globaly' ),
				'priority'    => 5,
				'panel'       => 'header_options',
				'type'        => 'section',
			),
			'header_bg_color' => array(
				'title'   => esc_html__( 'Background Color', 'globaly' ),
				'section' => 'header_styles',
				'field'   => 'hex_color',
				'default' => '#ffffff',
				'type'    => 'control',
			),
			'header_bg_image' => array(
				'title'   => esc_html__( 'Background Image', 'globaly' ),
				'section' => 'header_styles',
				'field'   => 'image',
				'type'    => 'control',
			),
			'header_bg_repeat' => array(
				'title'   => esc_html__( 'Background Repeat', 'globaly' ),
				'section' => 'header_styles',
				'default' => 'repeat',
				'field'   => 'select',
				'choices' => array(
					'no-repeat'  => esc_html__( 'No Repeat', 'globaly' ),
					'repeat'     => esc_html__( 'Tile', 'globaly' ),
					'repeat-x'   => esc_html__( 'Tile Horizontally', 'globaly' ),
					'repeat-y'   => esc_html__( 'Tile Vertically', 'globaly' ),
				),
				'type' => 'control',
			),
			'header_bg_position_x' => array(
				'title'   => esc_html__( 'Background Position', 'globaly' ),
				'section' => 'header_styles',
				'default' => 'center',
				'field'   => 'select',
				'choices' => array(
					'left'   => esc_html__( 'Left', 'globaly' ),
					'center' => esc_html__( 'Center', 'globaly' ),
					'right'  => esc_html__( 'Right', 'globaly' ),
				),
				'type' => 'control',
			),
			'header_bg_attachment' => array(
				'title'   => esc_html__( 'Background Attachment', 'globaly' ),
				'section' => 'header_styles',
				'default' => 'scroll',
				'field'   => 'select',
				'choices' => array(
					'scroll' => esc_html__( 'Scroll', 'globaly' ),
					'fixed'  => esc_html__( 'Fixed', 'globaly' ),
				),
				'type' => 'control',
			),
			'header_layout_type' => array(
				'title'   => esc_html__( 'Layout', 'globaly' ),
				'section' => 'header_styles',
				'default' => 'minimal',
				'field'   => 'select',
				'choices' => array(
					'minimal'  => esc_html__( 'Style 1', 'globaly' ),
					'centered' => esc_html__( 'Style 2', 'globaly' ),
					'default'  => esc_html__( 'Style 3', 'globaly' ),
				),
				'type' => 'control',
			),
			'header_text_message' => array(
				'title'       => esc_html__( 'Disclaimer Text', 'globaly' ),
				'description' => esc_html__( 'HTML formatting support', 'globaly' ),
				'section'     => 'header_styles',
				'default'     => globaly_get_default_header_text(),
				'field'       => 'textarea',
				'type'        => 'control',
			),

			/** `Top Panel` section */
			'header_top_panel' => array(
				'title'       => esc_html__( 'Top Panel', 'globaly' ),
				'priority'    => 10,
				'panel'       => 'header_options',
				'type'        => 'section',
			),
			'top_panel_search' => array(
				'title'   => esc_html__( 'Enable search', 'globaly' ),
				'section' => 'header_top_panel',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'top_panel_bg' => array(
				'title'   => esc_html__( 'Background color', 'globaly' ),
				'section' => 'header_top_panel',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),

			/** `Main Menu` section */
			'header_main_menu' => array(
				'title'       => esc_html__( 'Main Menu', 'globaly' ),
				'priority'    => 15,
				'panel'       => 'header_options',
				'type'        => 'section',
			),
			'header_menu_sticky' => array(
				'title'   => esc_html__( 'Enable sticky menu', 'globaly' ),
				'section' => 'header_main_menu',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'header_menu_attributes' => array(
				'title'   => esc_html__( 'Enable title attributes', 'globaly' ),
				'section' => 'header_main_menu',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'hidden_menu_items_title' => array(
				'title'    => esc_html__( 'Hidden menu items title', 'globaly' ),
				'section'  => 'header_main_menu',
				'default'  => esc_html__( 'More', 'globaly' ),
				'field'    => 'input',
				'type'     => 'control'
			),

			/** `Sidebar` section */
			'sidebar_settings' => array(
				'title'    => esc_html__( 'Sidebar', 'globaly' ),
				'priority' => 105,
				'type'     => 'section',
			),
			'sidebar_position' => array(
				'title'   => esc_html__( 'Sidebar Position', 'globaly' ),
				'section' => 'sidebar_settings',
				'default' => 'one-right-sidebar',
				'field'   => 'select',
				'choices' => array(
					'one-left-sidebar'  => esc_html__( 'Sidebar on left side', 'globaly' ),
					'one-right-sidebar' => esc_html__( 'Sidebar on right side', 'globaly' ),
					'two-sidebars'      => esc_html__( '2 sidebars', 'globaly' ),
					'fullwidth'         => esc_html__( 'No sidebars', 'globaly' ),
				),
				'type' => 'control',
			),

			/** `MailChimp` section */
			'mailchimp' => array(
				'title'       => esc_html__( 'MailChimp', 'globaly' ),
				'description' => esc_html__( 'Setup MailChimp settings for subscribe widget', 'globaly' ),
				'priority'    => 109,
				'type'        => 'section',
			),
			'mailchimp_api_key' => array(
				'title'   => esc_html__( 'MailChimp API key', 'globaly' ),
				'section' => 'mailchimp',
				'field'   => 'text',
				'type'    => 'control',
			),
			'mailchimp_list_id' => array(
				'title'   => esc_html__( 'MailChimp list ID', 'globaly' ),
				'section' => 'mailchimp',
				'field'   => 'text',
				'type'    => 'control',
			),

			/** `Ads Management` panel */
			'ads_management' => array(
				'title'    => esc_html__( 'Ads Management', 'globaly' ),
				'priority' => 110,
				'type'     => 'section',
			),
			'ads_header' => array(
				'title'             => esc_html__( 'Header', 'globaly' ),
				'section'           => 'ads_management',
				'field'             => 'textarea',
				'default'           => '',
				'sanitize_callback' => 'esc_html',
				'type'              => 'control',
			),
			'ads_home_before_loop' => array(
				'title'             => esc_html__( 'Front Page Before Loop', 'globaly' ),
				'section'           => 'ads_management',
				'field'             => 'textarea',
				'default'           => '',
				'sanitize_callback' => 'esc_html',
				'type'              => 'control',
			),
			'ads_post_before_content' => array(
				'title'             => esc_html__( 'Post Before Content', 'globaly' ),
				'section'           => 'ads_management',
				'field'             => 'textarea',
				'default'           => '',
				'sanitize_callback' => 'esc_html',
				'type'              => 'control',
			),
			'ads_post_before_comments' => array(
				'title'             => esc_html__( 'Post Before Comments', 'globaly' ),
				'section'           => 'ads_management',
				'field'             => 'textarea',
				'default'           => '',
				'sanitize_callback' => 'esc_html',
				'type'              => 'control',
			),

			/** `Footer` panel */
			'footer_options' => array(
				'title'    => esc_html__( 'Footer', 'globaly' ),
				'priority' => 110,
				'type'     => 'section',
			),
			'footer_logo_url' => array(
				'title'   => esc_html__( 'Logo upload', 'globaly' ),
				'section' => 'footer_options',
				'field'   => 'image',
				'default' => '%s/assets/images/footer-logo.png',
				'type'    => 'control',
			),
			'footer_copyright' => array(
				'title'   => esc_html__( 'Copyright text', 'globaly' ),
				'section' => 'footer_options',
				'default' => globaly_get_default_footer_copyright(),
				'field'   => 'textarea',
				'type'    => 'control',
			),
			'footer_widget_columns' => array(
				'title'   => esc_html__( 'Widget Area Columns', 'globaly' ),
				'section' => 'footer_options',
				'default' => '4',
				'field'   => 'select',
				'choices' => array(
					'1' => '1',
					'2' => '2',
					'3' => '3',
					'4' => '4',
				),
				'type' => 'control'
			),
			'footer_layout_type' => array(
				'title'   => esc_html__( 'Layout', 'globaly' ),
				'section' => 'footer_options',
				'default' => 'centered',
				'field'   => 'select',
				'choices' => array(
					'default'  => esc_html__( 'Style 1', 'globaly' ),
					'centered' => esc_html__( 'Style 2', 'globaly' ),
					'minimal'  => esc_html__( 'Style 3', 'globaly' ),
				),
				'type' => 'control'
			),
			'footer_widgets_bg' => array(
				'title'   => esc_html__( 'Footer Widgets Area color', 'globaly' ),
				'section' => 'footer_options',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),
			'footer_bg' => array(
				'title'   => esc_html__( 'Footer Background color', 'globaly' ),
				'section' => 'footer_options',
				'default' => '#31353d',
				'field'   => 'hex_color',
				'type'    => 'control',
			),

			/** `Blog Settings` panel */
			'blog_settings' => array(
				'title'       => esc_html__( 'Blog Settings', 'globaly' ),
				'priority'    => 115,
				'type'        => 'panel',
			),

			/** `Blog` section */
			'blog' => array(
				'title'           => esc_html__( 'Blog', 'globaly' ),
				'panel'           => 'blog_settings',
				'priority'        => 10,
				'type'            => 'section',
				'active_callback' => 'is_home',
			),
			'blog_layout_type' => array(
				'title'   => esc_html__( 'Layout', 'globaly' ),
				'section' => 'blog',
				'default' => 'default',
				'field'   => 'select',
				'choices' => array(
					'default'          => esc_html__( 'Listing', 'globaly' ),
					'grid-2-cols'      => esc_html__( 'Grid (2 Columns)', 'globaly' ),
					'grid-3-cols'      => esc_html__( 'Grid (3 Columns)', 'globaly' ),
					'masonry-2-cols'   => esc_html__( 'Masonry (2 Columns)', 'globaly' ),
					'masonry-3-cols'   => esc_html__( 'Masonry (3 Columns)', 'globaly' ),
				),
				'type' => 'control',
			),
			'blog_sticky_label' => array(
				'title'       => esc_html__( 'Featured Post Label', 'globaly' ),
				'description' => esc_html__( 'Label for sticky post', 'globaly' ),
				'section'     => 'blog',
				'default'     => 'icon:material:star_border',
				'field'       => 'text',
				'type'        => 'control',
			),
			'blog_posts_content' => array(
				'title'   => esc_html__( 'Post content', 'globaly' ),
				'section' => 'blog',
				'default' => 'excerpt',
				'field'   => 'select',
				'choices' => array(
					'excerpt' => esc_html__( 'Only excerpt', 'globaly' ),
					'full'    => esc_html__( 'Full content', 'globaly' ),
				),
				'type' => 'control',
			),
			'blog_featured_image' => array(
				'title'   => esc_html__( 'Featured image', 'globaly' ),
				'section' => 'blog',
				'default' => 'small',
				'field'   => 'select',
				'choices' => array(
					'small'     => esc_html__( 'Small', 'globaly' ),
					'fullwidth' => esc_html__( 'Fullwidth', 'globaly' ),
				),
				'type' => 'control',
			),
			'blog_read_more_text' => array(
				'title'   => esc_html__( 'Read More button text', 'globaly' ),
				'section' => 'blog',
				'default' => esc_html__( 'Read More', 'globaly' ),
				'field'   => 'text',
				'type'    => 'control',
			),
			'blog_post_author' => array(
				'title'   => esc_html__( 'Show post author', 'globaly' ),
				'section' => 'blog',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'blog_post_publish_date' => array(
				'title'   => esc_html__( 'Show publish date', 'globaly' ),
				'section' => 'blog',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'blog_post_categories' => array(
				'title'   => esc_html__( 'Show categories', 'globaly' ),
				'section' => 'blog',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'blog_post_tags' => array(
				'title'   => esc_html__( 'Show tags', 'globaly' ),
				'section' => 'blog',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'blog_post_comments' => array(
				'title'   => esc_html__( 'Show comments', 'globaly' ),
				'section' => 'blog',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),

			/** `Post` section */
			'blog_post' => array(
				'title'           => esc_html__( 'Post', 'globaly' ),
				'panel'           => 'blog_settings',
				'priority'        => 20,
				'type'            => 'section',
				'active_callback' => 'callback_single',
			),
			'single_post_author' => array(
				'title'   => esc_html__( 'Show post author', 'globaly' ),
				'section' => 'blog_post',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'single_post_publish_date' => array(
				'title'   => esc_html__( 'Show publish date', 'globaly' ),
				'section' => 'blog_post',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'single_post_categories' => array(
				'title'   => esc_html__( 'Show categories', 'globaly' ),
				'section' => 'blog_post',
				'default' => false,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'single_post_tags' => array(
				'title'   => esc_html__( 'Show tags', 'globaly' ),
				'section' => 'blog_post',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'single_post_comments' => array(
				'title'   => esc_html__( 'Show comments', 'globaly' ),
				'section' => 'blog_post',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),
			'single_author_block' => array(
				'title'   => esc_html__( 'Enable the author block after each post', 'globaly' ),
				'section' => 'blog_post',
				'default' => true,
				'field'   => 'checkbox',
				'type'    => 'control',
			),

			/** Blockquote */
			'blockquote_typography' => array(
				'title'       => esc_html__( 'Blockquote', 'globaly' ),
				'priority'    => 45,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'blockquote_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'blockquote_typography',
				'default' => 'Merriweather Sans, sans-serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'blockquote_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'blockquote_typography',
				'default' => 'italic',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'blockquote_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'blockquote_typography',
				'default' => '700',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'blockquote_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'blockquote_typography',
				'default'     => '36',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 6,
					'max'  => 50,
					'step' => 1,
				),
				'type' => 'control',
			),
			'blockquote_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'blockquote_typography',
				'default'     => '1.33333',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'blockquote_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'blockquote_typography',
				'default'     => '0',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'blockquote_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'blockquote_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
			'blockquote_color' => array(
				'title'   => esc_html__( 'Blockquote color', 'globaly' ),
				'section' => 'blockquote_typography',
				'default' => '#333333',
				'field'   => 'hex_color',
				'type'    => 'control',
			),

			/** Metadata */
			'metadata_typography' => array(
				'title'       => esc_html__( 'Metadata typography', 'globaly' ),
				'priority'    => 45,
				'panel'       => 'typography',
				'type'        => 'section',
			),
			'metadata_font_family' => array(
				'title'   => esc_html__( 'Font Family', 'globaly' ),
				'section' => 'metadata_typography',
				'default' => 'Merriweather, serif',
				'field'   => 'fonts',
				'type'    => 'control',
			),
			'metadata_font_style' => array(
				'title'   => esc_html__( 'Font Style', 'globaly' ),
				'section' => 'metadata_typography',
				'default' => 'italic',
				'field'   => 'select',
				'choices' => globaly_get_font_styles(),
				'type'    => 'control',
			),
			'metadata_font_weight' => array(
				'title'   => esc_html__( 'Font Weight', 'globaly' ),
				'section' => 'metadata_typography',
				'default' => '400',
				'field'   => 'select',
				'choices' => globaly_get_font_weight(),
				'type'    => 'control',
			),
			'metadata_font_size' => array(
				'title'       => esc_html__( 'Font Size, px', 'globaly' ),
				'section'     => 'metadata_typography',
				'default'     => '13',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 6,
					'max'  => 50,
					'step' => 1,
				),
				'type' => 'control',
			),
			'metadata_line_height' => array(
				'title'       => esc_html__( 'Line Height', 'globaly' ),
				'description' => esc_html__( 'Relative to the font-size of the element', 'globaly' ),
				'section'     => 'metadata_typography',
				'default'     => '2.15385',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => 1.0,
					'max'  => 3.0,
					'step' => 0.1,
				),
				'type' => 'control',
			),
			'metadata_letter_spacing' => array(
				'title'       => esc_html__( 'Letter Spacing, px', 'globaly' ),
				'section'     => 'metadata_typography',
				'default'     => '0.52',
				'field'       => 'number',
				'input_attrs' => array(
					'min'  => -10,
					'max'  => 10,
					'step' => 1,
				),
				'type' => 'control',
			),
			'metadata_character_set' => array(
				'title'   => esc_html__( 'Character Set', 'globaly' ),
				'section' => 'breadcrumbs_typography',
				'default' => 'latin',
				'field'   => 'select',
				'choices' => globaly_get_character_sets(),
				'type'    => 'control',
			),
	) ) );
}

/**
 * Return true if logo in header has image type. Otherwise - return false.
 *
 * @param  object $control
 * @return bool
 */
function globaly_is_header_logo_image( $control ) {

	if ( $control->manager->get_setting( 'header_logo_type' )->value() == 'image' ) {
		return true;
	}

	return false;
}

/**
 * Return true if logo in header has text type. Otherwise - return false.
 *
 * @param  object $control
 * @return bool
 */
function globaly_is_header_logo_text( $control ) {

	if ( $control->manager->get_setting( 'header_logo_type' )->value() == 'text' ) {
		return true;
	}

	return false;
}

// Move native `site_icon` control (based on WordPress core) in custom section.
add_action( 'customize_register', 'globaly_customizer_change_core_controls', 20 );
function globaly_customizer_change_core_controls( $wp_customize ) {
	$wp_customize->get_control( 'site_icon' )->section      = 'globaly_logo_favicon';
	$wp_customize->get_control( 'background_color' )->label = esc_html__( 'Body Background Color', 'globaly' );
}

////////////////////////////////////
// Typography utility function    //
////////////////////////////////////
function globaly_get_font_styles() {
	return apply_filters( 'globaly_get_font_styles', array(
		'normal'  => esc_html__( 'Normal', 'globaly' ),
		'italic'  => esc_html__( 'Italic', 'globaly' ),
		'oblique' => esc_html__( 'Oblique', 'globaly' ),
		'inherit' => esc_html__( 'Inherit', 'globaly' ),
	) );
}

function globaly_get_character_sets() {
	return apply_filters( 'globaly_get_character_sets', array(
		'latin'        => esc_html__( 'Latin', 'globaly' ),
		'greek'        => esc_html__( 'Greek', 'globaly' ),
		'greek-ext'    => esc_html__( 'Greek Extended', 'globaly' ),
		'vietnamese'   => esc_html__( 'Vietnamese', 'globaly' ),
		'cyrillic-ext' => esc_html__( 'Cyrillic Extended', 'globaly' ),
		'latin-ext'    => esc_html__( 'Latin Extended', 'globaly' ),
		'cyrillic'     => esc_html__( 'Cyrillic', 'globaly' ),
	) );
}

function globaly_get_text_aligns() {
	return apply_filters( 'globaly_get_text_aligns', array(
		'inherit' => esc_html__( 'Inherit', 'globaly' ),
		'center'  => esc_html__( 'Center', 'globaly' ),
		'justify' => esc_html__( 'Justify', 'globaly' ),
		'left'    => esc_html__( 'Left', 'globaly' ),
		'right'   => esc_html__( 'Right', 'globaly' ),
	) );
}

function globaly_get_font_weight() {
	return apply_filters( 'globaly_get_font_weight', array(
		'100' => '100',
		'200' => '200',
		'300' => '300',
		'400' => '400',
		'500' => '500',
		'600' => '600',
		'700' => '700',
		'800' => '800',
		'900' => '900',
	) );
}

/**
 * Return array of arguments for dynamic CSS module
 *
 * @return array
 */
function globaly_get_dynamic_css_options() {
	return apply_filters( 'globaly_get_dynamic_css_options', array(
		'prefix'    => 'globaly',
		'type'      => 'theme_mod',
		'single'    => true,
		'css_files' => array(
			GLOBALY_THEME_DIR . '/assets/css/dynamic.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/elements.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/header.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/forms.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/social.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/menus.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/post.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/navigation.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/footer.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/misc.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/site/buttons.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/widget-default.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/taxonomy-tiles.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/image-grid.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/carousel.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/smart-slider.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/instagram.css',
			GLOBALY_THEME_DIR . '/assets/css/dynamic/widgets/subscribe.css',
			GLOBALY_THEME_DIR . '/assets/css/builder.css',
		),
		'options' => array(
			'header_logo_font_style',
			'header_logo_font_weight',
			'header_logo_font_size',
			'header_logo_font_family',

			'body_font_style',
			'body_font_weight',
			'body_font_size',
			'body_line_height',
			'body_font_family',
			'body_letter_spacing',
			'body_text_align',

			'h1_font_style',
			'h1_font_weight',
			'h1_font_size',
			'h1_line_height',
			'h1_font_family',
			'h1_letter_spacing',
			'h1_text_align',

			'h2_font_style',
			'h2_font_weight',
			'h2_font_size',
			'h2_line_height',
			'h2_font_family',
			'h2_letter_spacing',
			'h2_text_align',

			'h3_font_style',
			'h3_font_weight',
			'h3_font_size',
			'h3_line_height',
			'h3_font_family',
			'h3_letter_spacing',
			'h3_text_align',

			'h4_font_style',
			'h4_font_weight',
			'h4_font_size',
			'h4_line_height',
			'h4_font_family',
			'h4_letter_spacing',
			'h4_text_align',

			'h5_font_style',
			'h5_font_weight',
			'h5_font_size',
			'h5_line_height',
			'h5_font_family',
			'h5_letter_spacing',
			'h5_text_align',

			'h6_font_style',
			'h6_font_weight',
			'h6_font_size',
			'h6_line_height',
			'h6_font_family',
			'h6_letter_spacing',
			'h6_text_align',

			'breadcrumbs_font_style',
			'breadcrumbs_font_weight',
			'breadcrumbs_font_size',
			'breadcrumbs_line_height',
			'breadcrumbs_font_family',
			'breadcrumbs_letter_spacing',
			'breadcrumbs_text_align',

			'blockquote_font_style',
			'blockquote_font_weight',
			'blockquote_font_size',
			'blockquote_line_height',
			'blockquote_font_family',
			'blockquote_letter_spacing',
			'blockquote_text_align',
			'blockquote_color',

			'metadata_font_style',
			'metadata_font_weight',
			'metadata_font_size',
			'metadata_line_height',
			'metadata_font_family',
			'metadata_letter_spacing',
			'metadata_text_align',

			'regular_accent_color_1',
			'regular_accent_color_2',
			'regular_text_color',
			'regular_link_color',
			'regular_link_hover_color',
			'regular_h1_color',
			'regular_h2_color',
			'regular_h3_color',
			'regular_h4_color',
			'regular_h5_color',
			'regular_h6_color',

			'invert_accent_color_1',
			'invert_accent_color_2',
			'invert_text_color',
			'invert_link_color',
			'invert_link_hover_color',
			'invert_h1_color',
			'invert_h2_color',
			'invert_h3_color',
			'invert_h4_color',
			'invert_h5_color',
			'invert_h6_color',

			'header_bg_color',
			'header_bg_image',
			'header_bg_repeat',
			'header_bg_position_x',
			'header_bg_attachment',

			'top_panel_bg',

			'container_width',

			'footer_widgets_bg',
			'footer_bg',
		),
	) );
}

/**
 * Return array of arguments for Google Font loader module.
 *
 * @since  1.0.0
 * @return array
 */
function globaly_get_fonts_options() {
	return apply_filters( 'globaly_get_fonts_options', array(
		'prefix'  => 'globaly',
		'type'    => 'theme_mod',
		'single'  => true,
		'options' => array(
			'body' => array(
				'family'  => 'body_font_family',
				'style'   => 'body_font_style',
				'weight'  => 'body_font_weight',
				'charset' => 'body_character_set',
			),
			'h1' => array(
				'family'  => 'h1_font_family',
				'style'   => 'h1_font_style',
				'weight'  => 'h1_font_weight',
				'charset' => 'h1_character_set',
			),
			'h2' => array(
				'family'  => 'h2_font_family',
				'style'   => 'h2_font_style',
				'weight'  => 'h2_font_weight',
				'charset' => 'h2_character_set',
			),
			'h3' => array(
				'family'  => 'h3_font_family',
				'style'   => 'h3_font_style',
				'weight'  => 'h3_font_weight',
				'charset' => 'h3_character_set',
			),
			'h4' => array(
				'family'  => 'h4_font_family',
				'style'   => 'h4_font_style',
				'weight'  => 'h4_font_weight',
				'charset' => 'h4_character_set',
			),
			'h5' => array(
				'family'  => 'h5_font_family',
				'style'   => 'h5_font_style',
				'weight'  => 'h5_font_weight',
				'charset' => 'h5_character_set',
			),
			'h6' => array(
				'family'  => 'h6_font_family',
				'style'   => 'h6_font_style',
				'weight'  => 'h6_font_weight',
				'charset' => 'h6_character_set',
			),
			'header_logo' => array(
				'family'  => 'header_logo_font_family',
				'style'   => 'header_logo_font_style',
				'weight'  => 'header_logo_font_weight',
				'charset' => 'header_logo_character_set',
			),
			'breadcrumbs' => array(
				'family'  => 'breadcrumbs_font_family',
				'style'   => 'breadcrumbs_font_style',
				'weight'  => 'breadcrumbs_font_weight',
				'charset' => 'breadcrumbs_character_set',
			),
			'blockquote' => array(
				'family'  => 'blockquote_font_family',
				'style'   => 'blockquote_font_style',
				'weight'  => 'blockquote_font_weight',
				'charset' => 'blockquote_character_set',
			),
			'metadata' => array(
				'family'  => 'metadata_font_family',
				'style'   => 'metadata_font_style',
				'weight'  => 'metadata_font_weight',
				'charset' => 'metadata_character_set',
			),
		)
	) );
}

/**
 * Get default top panel text.
 *
 * @since  1.0.0
 * @return string
 */
function globaly_get_default_header_text() {
	return sprintf(
		esc_html__( '<div class="info-block">%s<a href="tel:#">800-2345-6789</a></div><div class="info-block"><a href="mailto:#">globaly@demolink.org</a></div>', 'globaly' ),
		'<i class="material-icons">call</i>'
	);
}

/**
 * Get default footer copyright.
 *
 * @since  1.0.0
 * @return string
 */
function globaly_get_default_footer_copyright() {
	return esc_html__( '%%year%% Advisto. All rights reserved. | <a href=\"%%privacy-policy%%\">Privacy Policy</a>', 'globaly' );
}
