<?php
/**
 * The template part for displaying results in search pages.
 *
 * @package Advisto
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'posts-list__item card' ); ?>>

	<?php $utility = globaly_utility()->utility; ?>

	<div class="post-list__item-content">

		<header class="entry-header">
			<?php
				$title_html = ( is_single() ) ? '<h2 %1$s>%4$s</h2>' : '<h4 %1$s><a href="%2$s" rel="bookmark">%4$s</a></h4>' ;

				$utility->attributes->get_title( array(
					'class' => 'entry-title',
					'html'  => $title_html,
					'echo'  => true,
				) );
			?>
		</header><!-- .entry-header -->

		<div class="entry-content">
			<?php the_excerpt(); ?>
			<div class="entry-content--footer">
				<?php $utility->attributes->get_button( array(
					'class' => 'btn btn-primary',
					'text'  => get_theme_mod( 'blog_read_more_text', globaly_theme()->customizer->get_default( 'blog_read_more_text' ) ),
					'icon'  => '<i class="material-icons">arrow_forward</i>',
					'html'  => '<a href="%1$s" %3$s><span class="btn__text">%4$s</span>%5$s</a>',
					'echo'  => true,
				) );
				?>

				<?php globaly_share_buttons( 'loop' ); ?>
			</div>
		</div><!-- .entry-content -->
	</div><!-- .post-list__item-content -->

	<footer class="entry-footer">
			<div class="entry-meta">
				<span class="post__date">
					<?php $date_visible = globaly_is_meta_visible( 'blog_post_publish_date', 'loop' ) ? 'true' : 'false';

						$utility->meta_data->get_date( array(
							'visible' => $date_visible,
							'class'   => 'post__date-link',
							'icon'    => '',
							'echo'    => true,
						) );
					?>
				</span>
				<?php $author_visible = globaly_is_meta_visible( 'blog_post_author', 'loop' ) ? 'true' : 'false'; ?>
				<?php $utility->meta_data->get_author( array(
					'visible' => $author_visible,
					'class'   => 'posted-by__author',
					'prefix'  => esc_html__( 'by ', 'globaly' ),
					'html'    => '<span class="posted-by">%1$s<a href="%2$s" %3$s %4$s rel="author">%5$s%6$s</a></span>',
					'echo'    => true,
				) );
				?>
				<span class="post__comments">
					<?php $comment_visible = globaly_is_meta_visible( 'blog_post_comments', 'loop' ) ? 'true' : 'false';

						$utility->meta_data->get_comment_count( array(
							'visible' => $comment_visible,
							'class'   => 'post__comments-link',
							'sufix'  => esc_html__( ' %s comment(s)', 'globaly' ),
							'icon'    => '<i class="material-icons">chat_bubble_outline</i>',
							'echo'    => true,
						) );
					?>
				</span>
			</div><!-- .entry-meta -->
	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
