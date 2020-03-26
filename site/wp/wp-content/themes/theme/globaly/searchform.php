<?php
/**
 * The template for displaying search form.
 *
 * @package Advisto
 */
?>
<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
	<label>
		<span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'globaly' ) ?></span>
		<input type="search" class="search-form__field"
			placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'globaly' ) ?>"
			value="<?php echo get_search_query() ?>" name="s"
			title="<?php echo esc_attr_x( 'Search for:', 'label', 'globaly' ) ?>" />
	</label>
	<button type="submit" class="search-form__submit btn btn-primary"><i class="material-icons">search</i></button>
</form>