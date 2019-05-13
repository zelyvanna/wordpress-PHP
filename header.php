<!DOCTYPE html>
<html lang="en" class="theme-color-07cb79 theme-skin-light">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>RScard</title>

    <!-- on indique a wordpress qu'il peut placer ses heads ici -->
	<?php wp_head(); ?>
</head>

<body class="home header-has-img loading">

    <div class="mobile-nav">
        <button class="btn-mobile mobile-nav-close"><i class="rsicon rsicon-close"></i></button>

        <div class="mobile-nav-inner">
            <nav id="mobile-nav" class="nav">
                <!-- Menus -->
				<?php
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'nav d-flex justify-content-between',
				) );

				?>
            </nav>
        </div>
    </div><!-- .mobile-nav -->

    <!-- Appel de la sidebar -->
	<?php get_sidebar(); ?>

    <div class="wrapper">
        <header class="header">
            <div class="head-bg"
                 style="background-image: url('<?php echo get_bloginfo( 'template_directory' ); ?>/img/uploads/rs-cover.jpg')"></div>

            <div class="head-bar">
                <div class="head-bar-inner">
                    <div class="row">
                        <div class="col-sm-3 col-xs-6">
                            <!-- Changement du Titre -->
                            <a class="logo" href="<?php echo home_url(); ?>
                            "><span><?php echo get_bloginfo( 'name' ); ?></span>RScard</a>
                        </div>

                        <div class="col-sm-9 col-xs-6">
                            <div class="nav-wrap">
                                <nav id="nav" class="nav">
                                    <!-- Menus -->
									<?php
									wp_nav_menu( array(
										'theme_location' => 'primary',
										'container'      => false,
										'menu_class'     => 'nav d-flex justify-content-between',
									) );

									?>
                                </nav>

                                <button class="btn-mobile btn-mobile-nav">Menu</button>
                                <button class="btn-sidebar btn-sidebar-open"><i class="rsicon rsicon-menu"></i></button>
                            </div><!-- .nav-wrap -->
                        </div>
                    </div>
                </div>
            </div>
        </header><!-- .header -->