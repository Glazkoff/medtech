<?php
/**
 * Template part for Blurb module displaying
 */
?>
<div class="tm_pb_blurb_content">
	<?php echo $this->_var( 'image' ); ?>
	<div class="tm_pb_blurb_container">
		<?php echo $this->_var( 'title' ); ?>
		<div class="tm_pb_blurb_content"><?php
			echo $this->shortcode_content;
		?></div>
	</div>
</div> <!-- .tm_pb_blurb_content -->
