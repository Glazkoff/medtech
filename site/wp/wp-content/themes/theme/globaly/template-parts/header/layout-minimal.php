<?php
/**
 * Template part for minimal Header layout.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Advisto
 */
?>

<div class="header-container__flex">

	<div class="site-branding">
		<?php globaly_header_logo() ?>
		<?php globaly_site_description(); ?>
	</div>
	<?php globaly_main_menu(); ?>
	<?php globaly_top_message( '<div class="header__message">%s</div>' ); ?>
</div>
