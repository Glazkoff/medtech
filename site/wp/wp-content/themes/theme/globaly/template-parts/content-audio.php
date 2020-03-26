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

		<?php globaly_sticky_label(); ?>

		<header class="entry-header">
			<?php if ( 'post' === get_post_type() ) : ?>
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
			<?php endif; ?>
			<?php
				$utility->attributes->get_title( array(
					'class' => 'entry-title',
					'html'  => '<h4 %1$s><a href="%2$s" rel="bookmark">%4$s</a></h4>',
					'echo'  => true,
				) );
			?>
		</header><!-- .entry-header -->



		<div class="entry-post-format-audio">
			<?php $utility->media->get_image( array(
					'size'        => 'globaly-thumb-560-390',
					'class'       => 'post-thumbnail__link',
					'html'        => '<a href="%1$s" %2$s><img class="post-thumbnail__img wp-post-image" src="%3$s" alt="%4$s" %5$s></a>',
					'placeholder' => false,
					'echo'        => true,
				) );
			?>

			<?php
				$media = get_attached_media( 'audio', get_the_ID() );
				$media = array_shift( $media );
			?>

			<div class="post-format-audio">
				<div class="post-format-audio-center">
					<div class="post-format-audio-header">
						<h6 class="post-format-audio-caption"><?php echo $media->post_excerpt; ?></h6>
						<div class="post-format-audio-description"><?php echo $media->post_content; ?></div>
					</div>
					<?php do_action( 'cherry_post_format_audio' ); ?>
				</div>
			</div>
		</div>

		<div class="entry-content">
			<?php $embed_args = array(
					'fields' => array( 'soundcloud' ),
					'height' => 310,
					'width'  => 310,
				);

				$embed_content = apply_filters( 'cherry_get_embed_post_formats', false, $embed_args );

				if ( false === $embed_content ) {

					$blog_content = get_theme_mod( 'blog_posts_content', globaly_theme()->customizer->get_default( 'blog_posts_content' ) );
					$length       = ( 'full' === $blog_content ) ? 0 : 55;

					$utility->attributes->get_content( array(
						'length'       => $length,
						'content_type' => 'post_excerpt',
						'echo'         => true,
					) );

				} else {
					printf( '<div class="embed-wrapper">%s</div>', $embed_content );
				}
			?>
		</div><!-- .entry-content -->
	</div>

	<footer class="entry-footer">
		<?php if ( 'post' === get_post_type() ) : ?>

			<div class="entry-meta">
				<span class="post__date">
					<?php $date_visible = globaly_is_meta_visible( 'blog_post_publish_date', 'loop' ) ? 'true' : 'false';

						$utility->meta_data->get_date( array(
							'visible' => $date_visible,
							'class'   => 'post__date-link',
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

		<?php endif; ?>
	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
