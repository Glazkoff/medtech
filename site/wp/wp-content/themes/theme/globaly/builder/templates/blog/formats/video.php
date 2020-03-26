<?php
/**
 * Template for displaying standard post format item content
 */

$first_video = tm_get_first_video();
$html = $this->get_template_part( 'blog/meta.php' ) . $this->get_post_content() . $this->get_more_button();
?>
<?php if ( $first_video ) : ?>
<div class="tm_main_video_container">
	<?php echo $first_video; ?>
</div>
<?php endif; ?>
<h2 class="entry-title"><a href="<?php esc_url( the_permalink() ); ?>"><?php the_title(); ?></a></h2>
<?php echo $html; ?>
