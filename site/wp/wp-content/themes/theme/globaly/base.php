<?php get_header( globaly_template_base() ); ?>

	<?php do_action( 'globaly_render_widget_area', 'full-width-header-area' ); ?>

	<?php globaly_site_breadcrumbs(); ?>

	<div <?php echo globaly_get_container_classes( array( 'site-content_wrap' ), 'content' ); ?>>

		<?php do_action( 'globaly_render_widget_area', 'before-content-area' ); ?>

		<div class="row">

			<div id="primary" <?php globaly_primary_content_class(); ?>>

				<?php do_action( 'globaly_render_widget_area', 'before-loop-area' ); ?>

				<main id="main" class="site-main" role="main">

					<?php include globaly_template_path(); ?>

				</main><!-- #main -->

				<?php do_action( 'globaly_render_widget_area', 'after-loop-area' ); ?>

			</div><!-- #primary -->

			<?php get_sidebar( 'secondary' ); // Loads the sidebar-secondary.php template. ?>

			<?php get_sidebar( 'primary' ); // Loads the sidebar-primary.php template.  ?>

		</div><!-- .row -->

		<?php do_action( 'globaly_render_widget_area', 'after-content-area' ); ?>

	</div><!-- .container -->

	<?php do_action( 'globaly_render_widget_area', 'after-content-full-width-area' ); ?>

<?php get_footer( globaly_template_base() ); ?>
