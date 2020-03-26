<?php
/**
 * The template for displaying the default footer layout.
 *
 * @package Advisto
 */
?>

<div class="footer-container">
	<div <?php echo globaly_get_container_classes( array( 'site-info' ), 'footer' ); ?>>
		<?php globaly_social_list( 'footer' ); ?>
		<div class="footer-container__inner">
			<?php globaly_footer_menu(); ?>
			<?php globaly_footer_copyright();?>
		</div>
	</div><!-- .site-info -->
</div><!-- .container -->
