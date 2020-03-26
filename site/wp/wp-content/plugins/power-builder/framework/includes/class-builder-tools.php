<?php
/**
 * Class with builder service tools
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! class_exists( 'TM_Builder_Tools' ) ) {

	/**
	 * Define  class
	 */
	class TM_Builder_Tools {

		/**
		 * Holder for cached values
		 *
		 * @var array
		 */
		private $cache = array();

		/**
		 * A reference to an instance of this class.
		 *
		 * @since 1.0.0
		 * @var   object
		 */
		private static $instance = null;

		/**
		 * Try set up query arguments by standard query-related options
		 *
		 * @param  object $module     current module instance.
		 * @param  array  $extra_args Additional arguments.
		 * @return object
		 */
		public function build_module_query( $module, $extra_args = array() ) {

			$vars = array(
				'post_type'      => 'post_type',
				'posts_per_page' => 'num',
				'offset'         => 'offset',
				'cat'            => 'categories',
				'tag'            => 'tags',
				'post__in'       => 'ids',
			);

			$query_args = array();

			foreach ( $vars as $query_var => $module_var ) {

				if ( ! $module->_var( $module_var ) ) {
					continue;
				}

				$query_args[ $query_var ] = $module->_var( $module_var );
			}

			if ( ! empty( $extra_args ) ) {
				$query_args = array_merge( $query_args, $extra_args );
			}

			if ( empty( $query_args ) ) {
				return $query_args;
			}

			return new WP_Query( $query_args );

		}

		/**
		 * Returns the instance.
		 *
		 * @since  1.0.0
		 * @return object
		 */
		public static function get_instance() {

			// If the single instance hasn't been set, set it now.
			if ( null == self::$instance ) {
				self::$instance = new self;
			}

			return self::$instance;
		}
	}

}

/**
 * Returns instance of TM_Builder_Tools
 *
 * @return object
 */
function tm_builder_tools() {
	return TM_Builder_Tools::get_instance();
}
