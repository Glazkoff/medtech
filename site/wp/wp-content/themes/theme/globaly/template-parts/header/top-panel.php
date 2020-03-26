<?php
/**
 * Template part for top panel in header.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Advisto
 */

// Don't show top panel if all elements are disabled.
if ( ! globaly_is_top_panel_visible() ) {
	return;
} ?>

<div class="top-panel">
	<div <?php echo globaly_get_container_classes( array( 'top-panel__wrap' ), 'header' ); ?>>
		<?php globaly_top_menu(); ?>
		<div class="top-panel__inner">
			<?php
				globaly_top_search( '<div class="top-panel__search">%s</div>' );
				globaly_social_list( 'header' );
			?>
		</div>
	</div>
</div><!-- .top-panel -->
