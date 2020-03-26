<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Advisto
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'posts-list__item card' ); ?>>

	<?php $utility = globaly_utility()->utility; ?>

	<div class="post-list__item-content">

	<?php globaly_sticky_label(); ?>

	<?php $cats_visible = globaly_is_meta_visible( 'blog_post_categories', 'loop' ) ? 'true' : 'false'; ?>

	<?php $utility->meta_data->get_terms( array(
					'visible' => $cats_visible,
					'type'    => 'category',
					'icon'    => '',
					'before'  => '<div class="post__cats">',
					'after'   => '</div>',
					'echo'    => true,
				) );
			?>

		<header class="entry-header">
			<?php $author_visible = globaly_is_meta_visible( 'blog_post_author', 'loop' ) ? 'true' : 'false'; ?>

			<div class="entry-meta">
				<?php $tags_visible = globaly_is_meta_visible( 'blog_post_tags', 'loop' ) ? 'true' : 'false';

					$utility->meta_data->get_terms( array(
						'visible'   => $tags_visible,
						'type'      => 'post_tag',
						'delimiter' => ' ',
						'icon'      => '',
						'before'    => '<div class="post__tags">',
						'after'     => '</div>',
						'echo'      => true,
					) );
				?>
			</div><!-- .entry-meta -->

			<?php
				$title_html = ( is_single() ) ? '<h1 %1$s>%4$s</h1>' : '<h4 %1$s><a href="%2$s" rel="bookmark">%4$s</a></h4>';

				$utility->attributes->get_title( array(
					'class' => 'entry-title',
					'html'  => $title_html,
					'echo'  => true,
				) );
			?>
		</header><!-- .entry-header -->

		<div class="entry-content">
			<div class="post-list__item-content--inner">
				<?php do_action( 'cherry_post_format_quote' ); ?>
			</div>
			<footer class="entry-footer">
				<?php globaly_share_buttons( 'loop' ); ?>
			</footer><!-- .entry-footer -->
		</div><!-- .entry-content -->

	</div><!-- .post-list__item-content -->



</article><!-- #post-## -->
