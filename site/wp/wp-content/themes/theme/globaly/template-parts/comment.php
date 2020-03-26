
	<div class="comment-author vcard">
		<?php echo globaly_comment_author_avatar(); ?>
	</div>

<div class="comment-content">
	<footer class="comment-meta">
		<div class="comment-metadata">
			<?php echo globaly_get_comment_date( array( 'format' => 'M d, Y' ) ); ?>
			<?php printf( 
				'<span class="posted-by">%s</span> %s', 
				esc_html__('Posted by', 'globaly' ),
				globaly_get_comment_author_link() ); 
			?>
		</div>

	</footer>
	<?php echo globaly_get_comment_text(); ?>
</div>
<div class="reply">
	<?php echo globaly_get_comment_reply_link( array( 'reply_text' => '<i class="material-icons">reply</i>' ) ); ?>
</div>
