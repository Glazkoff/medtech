<?php
/**
 * Template part for displaying post meta in Blog module
 */
if ( ! $this->is_meta_visible() ) {
	return;
}

$html = '';

if ( 'on' === $this->_var( 'show_date' ) ) {
	$html .= tm_get_safe_localization( '<span class="published">' . esc_html( get_the_date( $this->_var( 'meta_date' ) ) ) . '</span>' );
}

if ( 'on' === $this->_var( 'show_author' ) ) {
	$html .= tm_get_safe_localization(
		sprintf(
			esc_html( 'by %s', 'globaly' ),
			'<span class="author vcard">' .  tm_pb_get_the_author_posts_link() . '</span>'
		)
	);
}

if ( 'on' === $this->_var( 'show_categories' ) ) {
	$html .= get_the_category_list(', ');
}

if ( 'on' === $this->_var( 'show_comments' ) ) {
	$html .= sprintf(
		'<span class="comments">' . esc_html( _nx( '1 Comment', '%s Comments', get_comments_number(), 'number of comments', 'globaly' ) ) . '</span>' ,
		number_format_i18n( get_comments_number() )
	);
}

?>
<div class="tm_pb_post_meta"><?php echo $html; ?></div>
