<div class="grid-item">
    <article class="post-box animate-up">
        <div class="post-media">
            <div class="post-image">
                <a href="<?php the_permalink() ?>">
					<?php
					if ( has_post_thumbnail() ) {
						the_post_thumbnail();
					}
					?>
                </a>

            </div>
        </div>

        <div class="post-data">
            <time class="post-datetime" datetime="<?php echo get_the_date(); ?>>">
                <span class="day"><?php echo get_the_date( 'd' ) ?></span>
                <span class="month"><?php echo get_the_date( 'M' ) ?></span>
            </time>

            <div class="post-tag">
                <?php echo the_category(); ?>
            </div>

            <h3 class="post-title">
                <a href="<?php the_permalink() ?>"><?php the_title(); ?></a>
            </h3>

            <div class="post-info">
                <a href="category.php"><i class="rsicon rsicon-user"></i><?php the_author(); ?></a>
                <a href="category.php"><i class="rsicon rsicon-comments"></i><?php echo get_comments_number(); ?></a>
            </div>
        </div>
    </article>
</div>



