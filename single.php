<?php get_header() ?>

    <div class="content">
        <div class="container">

			<?php if ( have_posts() ): while ( have_posts() ): the_post(); ?>
				<?php get_template_part( 'content-single' ) ?>
			<?php endwhile; endif; ?>

        </div><!-- .container -->
    </div><!-- .content -->

<?php get_footer() ?>