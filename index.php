<!-- Affichage du header -->
<?php get_header(); ?>


<div class="content">
    <div class="container">
        <!-- START: PAGE CONTENT -->
        <div class="blog">
            <div class="blog-grid">
                <div class="grid-sizer"></div>
				<?php if ( have_posts() ): while ( have_posts() ): the_post(); ?>
					<?php get_template_part( 'content' ); ?>
				<?php endwhile; endif; ?>

            </div><!-- .blog-grid -->

            <div class="pagination">
<!--                <a class="next page-numbers" href="category.php"><i class="rsicon rsicon-chevron_left"></i></a>-->
<!--                <span class="page-numbers current">1</span>-->
<!--                <a class="page-numbers" href="category.php">2</a>-->
<!--                <a class="page-numbers" href="category.php">3</a>-->
<!--                <span>...</span>-->
<!--                <a class="page-numbers" href="category.php">22</a>-->
<!--                <a class="next page-numbers" href="category.php"><i class="rsicon rsicon-chevron_right"></i></a>-->
	            <?php next_posts_link('Older') ?>
	            <?php previous_posts_link('Newer') ?>
            </div><!-- .pagination -->
        </div><!-- .blog -->
        <!-- END: PAGE CONTENT -->

    </div><!-- .container -->
</div><!-- .content -->

<!-- Affichage du footer -->
<?php get_footer(); ?>