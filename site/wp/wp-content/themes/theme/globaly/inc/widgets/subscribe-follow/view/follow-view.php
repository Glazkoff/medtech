<?php
/**
 * Template part to display follow list in Subscribe and Follow widget.
 *
 * @package Advisto
 * @subpackage widgets
 */
?>
<div class="follow-block invert"><?php

	echo $this->get_block_title( 'follow' );
	echo $this->get_block_message( 'follow' );
	echo $this->get_social_nav();

?></div>