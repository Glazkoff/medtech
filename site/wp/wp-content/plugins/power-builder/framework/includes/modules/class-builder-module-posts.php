<?php
class Tm_Builder_Module_Posts extends Tm_Builder_Module {
	function init() {
		$this->name = esc_html__( 'Posts', 'tm_builder' );
		$this->slug = 'tm_pb_posts';
		$this->icon = 'f009';
		$this->whitelisted_fields = array(
			'supertitle',
			'title',
			'title_divider',
			'subtitle',
			'show_button',
			'button_text',
			'button_url',
			'post_type',
			'post_from',
			'categories',
			'tags',
			'ids',
			'columns',
			'num',
			'offset',
			'meta',
			'layout',
			'admin_label',
			'module_id',
			'module_class',
		);

		$this->fields_defaults = array(
			'title_divider' => array( 'off' ),
			'show_button'   => array( 'off' ),
			'post_type'     => array( 'post' ),
			'columns'       => array( 3 ),
			'num'           => array( 3 ),
			'meta'          => array( 'on' ),
			'layout'        => array( 'type-1' ),
		);

		$this->main_css_element = '%%order_class%%.tm_pb_posts';
		$this->advanced_options = array(
			'fonts' => array(
				'supertitle' => array(
					'label'    => esc_html__( 'Supertitle', 'tm_builder' ),
					'css'      => array(
						'main' => "{$this->main_css_element} h2",
						'important' => 'all',
					),
				),
				'body'   => array(
					'label'    => esc_html__( 'Body', 'tm_builder' ),
					'css'      => array(
						'line_height' => "{$this->main_css_element} p",
					),
				),
			),
			'background' => array(
				'use_background_color' => false,
			),
			'border' => array(),
			'custom_margin_padding' => array(
				'css' => array(
					'important' => 'all',
				),
			),
			'button' => array(
				'button' => array(
					'label' => esc_html__( 'Button', 'tm_builder' ),
				),
			),
		);
	}

	function get_fields() {
		$fields = array(
			'title' => array(
				'label'           => esc_html__( 'Title', 'tm_builder' ),
				'type'            => 'text',
				'option_category' => 'basic_option',
				'description'     => esc_html__( 'Input your value to action title here.', 'tm_builder' ),
			),
			'disabled_on' => array(
				'label'           => esc_html__( 'Disable on', 'tm_builder' ),
				'type'            => 'multiple_checkboxes',
				'options'         => array(
					'phone'   => esc_html__( 'Phone', 'tm_builder' ),
					'tablet'  => esc_html__( 'Tablet', 'tm_builder' ),
					'desktop' => esc_html__( 'Desktop', 'tm_builder' ),
				),
				'additional_att'  => 'disable_on',
				'option_category' => 'configuration',
				'description'     => esc_html__( 'This will disable the module on selected devices', 'tm_builder' ),
			),
			'admin_label' => array(
				'label'       => esc_html__( 'Admin Label', 'tm_builder' ),
				'type'        => 'text',
				'description' => esc_html__( 'This will change the label of the module in the builder for easy identification.', 'tm_builder' ),
			),
			'module_id' => array(
				'label'           => esc_html__( 'CSS ID', 'tm_builder' ),
				'type'            => 'text',
				'option_category' => 'configuration',
				'tab_slug'        => 'custom_css',
				'option_class'    => 'tm_pb_custom_css_regular',
			),
			'module_class' => array(
				'label'           => esc_html__( 'CSS Class', 'tm_builder' ),
				'type'            => 'text',
				'option_category' => 'configuration',
				'tab_slug'        => 'custom_css',
				'option_class'    => 'tm_pb_custom_css_regular',
			),
		);
		return $fields;
	}

	function shortcode_callback( $atts, $content = null, $function_name ) {

		$this->set_vars(
			array(
			)
		);

		$output  = $this->wrap_module( $content, $classes, $function_name, $atts );

		return $output;
	}
}

//new Tm_Builder_Module_Posts;
