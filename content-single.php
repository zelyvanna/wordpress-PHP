<div class="content">
    <div class="container">
        <!-- START: PAGE CONTENT -->
        <div class="row animate-up">
            <div class="col-sm-8">
                <main class="post-single">
                    <article class="post-content section-box">
                        <div class="post-media">
							<?php
							if ( has_post_thumbnail() ) {
								the_post_thumbnail();
							}
							?>
                        </div><!-- .post-media -->

                        <div class="post-inner">
                            <header class="post-header">
                                <div class="post-data">
                                    <div class="post-tag">
	                                    <?php echo the_category(); ?>
                                    </div>

                                    <div class="post-title-wrap">
                                        <h1 class="post-title"><?php the_title() ?></h1>
                                        <time class="post-datetime" datetime="<?php echo get_the_date(); ?>>">
                                            <span class="day"><?php echo get_the_date( 'd' ) ?></span>
                                            <span class="month"><?php echo get_the_date( 'M' ) ?></span>
                                        </time>
                                    </div>

                                    <div class="post-info">
                                        <a href="single-image.html"><i
                                                    class="rsicon rsicon-user"></i><?php the_author(); ?></a>
                                        <a href="single-image.html"><i class="rsicon rsicon-comments"></i><?php echo get_comments_number(); ?></a>
                                    </div>
                                </div>
                            </header>

                            <div class="post-editor clearfix">
                                <p><?php the_content(); ?></p>

                                <footer class="post-footer">
                                    <div class="post-share">
                                        <script type="text/javascript"
                                                src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-503b5cbf65c3f4d8"
                                                async="async"></script>
                                        <div class="addthis_sharing_toolbox"></div>
                                    </div>
                                </footer>
                            </div><!-- .post-inner -->
                    </article><!-- .post-content -->


                    <nav class="post-pagination section-box">
                        <div class="post-next">
	                        <?php

	                        $previous_year = $year = 0;
	                        $previous_month = $month = 0;
	                        $ul_open = false;

	                        $myposts = get_posts('numberposts=-1&orderby=post_date&order=DESC');

	                        ?>

	                        <?php foreach($myposts as $post) : ?>

	                        <?php

	                        setup_postdata($post);

	                        $year = mysql2date('Y', $post->post_date);
	                        $month = mysql2date('n', $post->post_date);
	                        $day = mysql2date('j', $post->post_date);

	                        ?>

	                        <?php if($year != $previous_year || $month != $previous_month) : ?>

	                        <?php if($ul_open == true) : ?>
                                </ul>
	                        <?php endif; ?>

                            <h3><?php the_time('F Y'); ?></h3>

                            <ul>

		                        <?php $ul_open = true; ?>

		                        <?php endif; ?>

		                        <?php $previous_year = $year; $previous_month = $month; ?>

                                <li><span><?php the_time('j F'); ?> - </span> <span><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></span></li>

		                        <?php endforeach; ?>
                            </ul>
                        </div>
                    </nav><!-- .post-pagination -->

                    <div class="post-comments">
                        <h2 class="section-title">Comments (59)</h2>

                        <div class="section-box">
                            <ol class="comment-list">
                                <li class="comment">
                                    <article class="comment-body">
                                        <div class="comment-avatar">
                                            <img src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/rs-avatar-64x64.jpg" alt="avatar"/>
                                        </div>
                                        <div class="comment-content">
                                            <div class="comment-meta">
                                                <span class="name">Jane Doe</span>
                                                <time class="date" datetime="2015-03-20T13:00:14+00:00">
                                                    March 20, 2015 at 1:00 pm
                                                </time>
                                                <a class="reply-link"
                                                   href="single-image.html#comment-reply">Reply</a>
                                            </div>
                                            <div class="comment-message">
                                                <p>Lorem ipsum dolor sit aum nulla quis nesciunt ipsa
                                                    aliquam aliquid eum, voluptatibus
                                                    assumenda minima vel. Eaque, velit architecto error
                                                    ducimus aliquid.</p>
                                            </div>
                                        </div>
                                    </article>

                                    <ol>
                                        <li class="comment">
                                            <article class="comment-body">
                                                <img class="comment-avatar" src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/rs-avatar-64x64.jpg"
                                                     alt="avatar"/>
                                                <div class="comment-content">
                                                    <div class="comment-meta">
                                                        <span class="name">Jane Doe</span>
                                                        <time class="date"
                                                              datetime="2015-03-20T13:00:14+00:00">March 20,
                                                            2015 at 1:00 pm
                                                        </time>
                                                        <a class="reply-link"
                                                           href="single-image.html#comment-reply">Reply</a>
                                                    </div>
                                                    <div class="comment-message">
                                                        <p>Lorem ipsum dolor sit aum nulla quis nesciunt
                                                            ipsa aliquam aliquid eum, voluptatibus
                                                            assumenda minima vel. Eaque, velit architecto
                                                            error ducimus aliquid.</p>
                                                    </div>
                                                </div>
                                            </article>

                                            <ol>
                                                <li class="comment">
                                                    <article class="comment-body">
                                                        <img class="comment-avatar"
                                                             src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/rs-avatar-64x64.jpg" alt="avatar"/>
                                                        <div class="comment-content">
                                                            <div class="comment-meta">
                                                                <span class="name">Jane Doe</span>
                                                                <time class="date"
                                                                      datetime="2015-03-20T13:00:14+00:00">
                                                                    March 20, 2015 at 1:00 pm
                                                                </time>
                                                                <a class="reply-link"
                                                                   href="single-image.html#comment-reply">Reply</a>
                                                            </div>
                                                            <div class="comment-message">
                                                                <p>Lorem ipsum dolor sit aum nulla quis
                                                                    nesciunt ipsa aliquam aliquid eum,
                                                                    voluptatibus
                                                                    assumenda minima vel. Eaque, velit
                                                                    architecto error ducimus aliquid.</p>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </li><!-- .comment (level 3) -->
                                            </ol><!-- .comment-list (level 3) -->
                                        </li><!-- .comment (level 2) -->
                                    </ol><!-- .comment-list (level 2) -->
                                </li><!-- .comment -->

                                <li class="comment">
                                    <article class="comment-body">
                                        <img class="comment-avatar" src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/rs-avatar-64x64.jpg"
                                             alt="avatar"/>
                                        <div class="comment-content">
                                            <div class="comment-meta">
                                                <span class="name">Jane Doe</span>
                                                <time class="date" datetime="2015-03-20T13:00:14+00:00">
                                                    March 20, 2015 at 1:00 pm
                                                </time>
                                                <a class="reply-link"
                                                   href="single-image.html#comment-reply">Reply</a>
                                            </div>
                                            <div class="comment-message">
                                                <p>Lorem ipsum dolor sit aum nulla quis nesciunt ipsa
                                                    aliquam aliquid eum, voluptatibus
                                                    assumenda minima vel. Eaque, velit architecto error
                                                    ducimus aliquid.</p>
                                            </div>
                                        </div>
                                    </article>
                                </li><!-- .comment -->
                            </ol><!-- .comment-list -->

                            <div id="comment-reply" class="comment-reply">
                                <form>
                                    <div class="input-field">
                                        <input type="text" name="rs-comment-name"/>
                                        <span class="line"></span>
                                        <label>Name *</label>
                                    </div>

                                    <div class="input-field">
                                        <input type="email" name="rs-comment-email"/>
                                        <span class="line"></span>
                                        <label>Email *</label>
                                    </div>

                                    <div class="input-field">
                                        <input type="text" name="rs-comment-website"/>
                                        <span class="line"></span>
                                        <label>Website</label>
                                    </div>

                                    <div class="input-field">
                                        <textarea rows="4" name="rs-comment-message"></textarea>
                                        <span class="line"></span>
                                        <label>Type Comment Here *</label>
                                    </div>

                                    <div class="text-right">
											<span class="btn-outer btn-primary-outer ripple">
												<input class="btn btn-lg btn-primary" type="button"
                                                       value="Leave Comment">
											</span>
                                    </div>
                                </form>
                            </div><!-- .comment-reply -->
                        </div><!-- .section-box -->
                    </div><!-- .post-comments -->
                </main>
                <!-- .post-single -->
            </div>

            <div class="col-sm-4">
                <div class="sidebar sidebar-default">
                    <div class="widget-area">
                        <aside class="widget widget-profile">
                            <div class="profile-photo">
                                <img src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/uploads/rs-photo-v2.jpg" alt="Robert Smith"/>
                            </div>
                            <div class="profile-info">
                                <h2 class="profile-title">Robert Smith</h2>
                                <h3 class="profile-position">Developer and businessman</h3>
                            </div>
                        </aside><!-- .widget-profile -->

                        <aside class="widget widget_search">
                            <h2 class="widget-title">Search</h2>
                            <form class="search-form">
                                <label class="ripple">
                                    <span class="screen-reader-text">Search for:</span>
                                    <input class="search-field" type="search" placeholder="Search">
                                </label>
                                <input type="submit" class="search-submit" value="Search">
                            </form>
                        </aside><!-- .widget_search -->

                        <aside class="widget widget_contact">
                            <h2 class="widget-title">Contact Me</h2>
                            <form class="contactForm"
                                  action="https://rscard.px-lab.com/html/php/contact_form.php"
                                  method="post">
                                <div class="input-field">
                                    <input class="contact-name" type="text" name="name"/>
                                    <span class="line"></span>
                                    <label>Name</label>
                                </div>

                                <div class="input-field">
                                    <input class="contact-email" type="email" name="email"/>
                                    <span class="line"></span>
                                    <label>Email</label>
                                </div>

                                <div class="input-field">
                                    <input class="contact-subject" type="text" name="subject"/>
                                    <span class="line"></span>
                                    <label>Subject</label>
                                </div>

                                <div class="input-field">
                                    <textarea class="contact-message" rows="4" name="message"></textarea>
                                    <span class="line"></span>
                                    <label>Message</label>
                                </div>

                                <span class="btn-outer btn-primary-outer ripple">
										<input class="contact-submit btn btn-lg btn-primary" type="submit"
                                               value="Send"/>
									</span>

                                <div class="contact-response"></div>
                            </form>
                        </aside><!-- .widget_contact -->

                        <aside class="widget widget-popuplar-posts">
                            <h2 class="widget-title">Popular posts</h2>
                            <ul>
                                <li>
                                    <div class="post-media"><a href="single-image.html"><img
                                                    src="img/uploads/thumb-78x56-1.jpg" alt=""/></a></div>
                                    <h3 class="post-title"><a href="single-image.html">Standard Post Format
                                            With Featured Image</a></h3>
                                    <div class="post-info"><a href="single-image.html"><i
                                                    class="rsicon rsicon-comments"></i>56 comments</a></div>
                                </li>
                                <li>
                                    <div class="post-media"><a href="single-image.html"><img
                                                    src="img/uploads/thumb-78x56-2.jpg" alt=""/></a></div>
                                    <h3 class="post-title"><a href="single-image.html">Standard Post Format
                                            With Featured Image</a></h3>
                                    <div class="post-info"><a href="single-image.html"><i
                                                    class="rsicon rsicon-comments"></i>56 comments</a></div>
                                </li>
                                <li>
                                    <div class="post-media"><a href="single-image.html"><img
                                                    src="img/uploads/thumb-78x56-3.jpg" alt=""/></a></div>
                                    <h3 class="post-title"><a href="single-image.html">Standard Post Format
                                            With Featured Image</a></h3>
                                    <div class="post-info"><a href="single-image.html"><i
                                                    class="rsicon rsicon-comments"></i>56 comments</a></div>
                                </li>
                            </ul>
                        </aside><!-- .widget-popuplar-posts -->

                        <aside class="widget widget_tag_cloud">
                            <h2 class="widget-title">Tag Cloud</h2>
                            <div class="tagcloud">
                                <?php
                                wp_list_categories();
                                ?>
                            </div>
                        </aside><!-- .widget_tag_cloud -->

                        <aside class="widget widget-recent-posts">
                            <h2 class="widget-title">Recent posts</h2>
                            <ul>
		                        <?php
		                        $recent_posts = wp_get_recent_posts();
		                        foreach( $recent_posts as $recent ){
			                        echo '<li><a href="' . get_permalink($recent["ID"]) . '">' .   $recent["post_title"].'</a> </li> ';
		                        }
		                        wp_reset_query();
		                        ?>
                            </ul>
<!--                            <ul>-->
<!--                                <li>-->
<!--                                    <div class="post-tag">-->
<!--                                        <a href="single-image.html">#Photo</a>-->
<!--                                        <a href="single-image.html">#Architect</a>-->
<!--                                    </div>-->
<!--                                    <h3 class="post-title"><a href="single-image.html">Standard Post Format-->
<!--                                            With Featured Image</a></h3>-->
<!--                                    <div class="post-info"><a href="single-image.html"><i-->
<!--                                                    class="rsicon rsicon-comments"></i>56 comments</a></div>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <div class="post-tag">-->
<!--                                        <a href="single-image.html">#Photo</a>-->
<!--                                        <a href="single-image.html">#Architect</a>-->
<!--                                    </div>-->
<!--                                    <h3 class="post-title"><a href="single-image.html">Standard Post Format-->
<!--                                            With Featured Image</a></h3>-->
<!--                                    <div class="post-info"><a href="single-image.html"><i-->
<!--                                                    class="rsicon rsicon-comments"></i>56 comments</a></div>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <div class="post-tag">-->
<!--                                        <a href="single-image.html">#Photo</a>-->
<!--                                        <a href="single-image.html">#Architect</a>-->
<!--                                    </div>-->
<!--                                    <h3 class="post-title"><a href="single-image.html">Standard Post Format-->
<!--                                            With Featured Image</a></h3>-->
<!--                                    <div class="post-info"><a href="single-image.html"><i-->
<!--                                                    class="rsicon rsicon-comments"></i>56 comments</a></div>-->
<!--                                </li>-->
<!--                            </ul>-->
                        </aside><!-- .widget-recent-posts -->

                        <aside class="widget widget_categories">
                            <h2 class="widget-title">Categories</h2>
                            <ul>
                                <li><a href="single-image.html" title="Architecture Category Posts">Architecture</a>
                                    (9)
                                </li>
                                <li><a href="single-image.html" title="Business Category Posts">Business</a>
                                    (16)
                                </li>
                                <li><a href="single-image.html" title="Creative Category Posts">Creative</a>
                                    (18)
                                </li>
                                <li><a href="single-image.html" title="Design Category Posts">Design</a>
                                    (10)
                                </li>
                                <li><a href="single-image.html" title="Development Category Posts">Development</a>
                                    (14)
                                </li>
                                <li><a href="single-image.html"
                                       title="Education Category Posts">Education</a> (9)
                                </li>
                            </ul>
                        </aside><!-- .widget_categories -->
                    </div><!-- .widget-area -->
                </div><!-- .sidebar -->
            </div><!-- .col-sm-4 -->
        </div><!-- .row -->
        <!-- END: PAGE CONTENT -->
