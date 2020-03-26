<?php

$entry_meta = $author . $count . $tag;

$content = 	$category . $excerpt .
	( ! empty( $entry_meta ) ? sprintf( '<div class="entry-meta">%s</div>', $entry_meta ) : '' ) .
	( ! empty( $button ) ? sprintf( '<div class="entry-footer">%s</div>', $button ) : '' );

?>
<div class="custom-posts__item post <?php echo $grid_class; ?>">
	<div class="post-inner">
		<div class="entry-header">
			<div class="post-thumbnail"><?php echo $image; ?></div>
			<?php echo $title; ?>
			<?php echo $date; ?>
		</div>
		<?php if ( ! empty( $content ) ) : ?>
			<div class="entry-content"><?php echo $content; ?></div>
		<?php endif; ?>
	</div>
</div>
