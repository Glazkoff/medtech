<?php
/**
 * Template part for centered Header layout.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Advisto
 */
?>

<div class="site-branding">
	<?php globaly_header_logo() ?>
	<?php globaly_site_description(); ?>
</div>

<?php
	globaly_top_message( '<div class="header__message">%s</div>' );
	globaly_main_menu();
?>