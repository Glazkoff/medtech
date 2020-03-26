<?php
/**
 * Main wrapping template for blog module
 */

$html = '';

if ( $this->_var( 'posts' )->have_posts() ) {
	$html .= $this->open_posts_list();
	while ( $this->_var( 'posts' )->have_posts() ) {
		$this->setup_loop();
		$html .= $this->open_grid_col();
		$html .= $this->get_template_part( 'blog/item.php' );
		$html .= $this->close_grid_col();
	}
	$html .= $this->close_posts_list();
	$html .= $this->get_pagination();
} else {
	$html .= $this->get_template_part( 'blog/no-results.php' );
}

echo $html;
