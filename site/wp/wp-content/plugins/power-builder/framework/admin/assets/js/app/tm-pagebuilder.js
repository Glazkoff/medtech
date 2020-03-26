( function ( $ ) {
	'use strict';

	window.TM_PageBuilder = {};

	// run tm_pb_append_templates as many times as needed
	for (var i = 0; i < Math.ceil( tm_pb_options.tm_builder_modules_count / tm_pb_options.tm_builder_templates_amount ); i++) {
		tm_pb_append_templates( i * tm_pb_options.tm_builder_templates_amount );
	};

	function tm_pb_append_templates( start_from ) {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: tm_pb_options.ajaxurl,
			data: {
				action : 'tm_pb_get_backbone_templates',
				tm_post_type : tm_pb_options.post_type,
				tm_admin_load_nonce : tm_pb_options.tm_admin_load_nonce,
				tm_templates_start_from : start_from
			},
			success: function( data ) {
				//append retrieved templates to body
				$( 'body' ).append( data.templates );
			}
		});
	}

	// Explicitly define ERB-style template delimiters to prevent
	// template delimiters being overwritten by 3rd party plugin
	_.templateSettings = {
		evaluate   : /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape     : /<%-([\s\S]+?)%>/g
	};

} ( jQuery ) );
