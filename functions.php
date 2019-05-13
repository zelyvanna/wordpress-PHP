<?php

add_action( 'after_setup_theme', 'custom_theme_setup' );
function custom_theme_setup() {
	add_theme_support( 'title-tag' );
	register_nav_menus( array(
		'primary' => 'Menu principal',
	) );
//	Ajout gestion des thumbnails
	add_theme_support( 'post-thumbnails' );
}


add_action( 'wp_enqueue_scripts', 'custom_scripts' );
function custom_scripts() {
	// Google Fonts
	wp_enqueue_style( 'googlefont-fredokaone', 'https://fonts.googleapis.com/css?family=Fredoka+One', array(), '1.0.0' );
	wp_enqueue_style( 'googlefont-opensans', 'https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic', array(), '1.0.0' );

	// Icon Fonts
	wp_enqueue_style( 'map-icons', get_template_directory_uri() . '/fonts/map-icons/css/map-icons.min.css' );
	wp_enqueue_style( 'icomoon', get_template_directory_uri() . '/fonts/icomoon/style.css' );

	// Styles
	wp_enqueue_style( 'bxslider', get_template_directory_uri() . '/js/plugins/jquery.bxslider/jquery.bxslider.css' );
	wp_enqueue_style( 'customscrollbar', get_template_directory_uri() . '/js/plugins/jquery.customscroll/jquery.mCustomScrollbar.min.css' );
	wp_enqueue_style( 'mediaelementplayer', get_template_directory_uri() . '/js/plugins/jquery.mediaelement/mediaelementplayer.min.css' );
	wp_enqueue_style( 'fancybox', get_template_directory_uri() . '/js/plugins/jquery.fancybox/jquery.fancybox.css' );
	wp_enqueue_style( 'carousel', get_template_directory_uri() . '/js/plugins/jquery.owlcarousel/owl.carousel.css' );
	wp_enqueue_style( 'theme', get_template_directory_uri() . '/js/plugins/jquery.owlcarousel/owl.theme.css' );
	wp_enqueue_style( 'option-panel', get_template_directory_uri() . '/js/plugins/jquery.optionpanel/option-panel.css' );

	// Chargement de nos styles
	wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'color', get_template_directory_uri() . '/colors/theme-color.css' );


	// Scripts
	wp_enqueue_script( 'oss1', 'https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js', array( 'jquery' ), '1', true );
	wp_enqueue_script( 'oss2', 'https://oss.maxcdn.com/respond/1.4.2/respond.min.js', array( 'jquery' ), '1', true );

	// Modernizer for detect what features the user’s browser has to offer
	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/js/libs/modernizr.js', array( 'jquery' ), '1', true );

}

if ( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page();
}