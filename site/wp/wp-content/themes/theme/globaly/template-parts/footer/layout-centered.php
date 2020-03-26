<?php
/**
 * The template for displaying the default footer layout.
 *
 * @package Advisto
 */

?>
<div class="footer-container">
	<div <?php echo globaly_get_container_classes( array( 'site-info' ), 'footer' ); ?>>
		<?php
			globaly_footer_logo();
			globaly_social_list( 'footer' );
			globaly_footer_copyright();
			globaly_footer_menu();
		?>
	</div><!-- .site-info -->
</div><!-- .container -->
