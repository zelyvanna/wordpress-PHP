<div class="sidebar sidebar-fixed">
	<button class="btn-sidebar btn-sidebar-close"><i class="rsicon rsicon-close"></i></button>

	<div class="widget-area">
		<aside class="widget widget-profile">
			<div class="profile-photo">
				<img src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/uploads/rs-photo-v2.jpg" alt="Robert Smith"/>
			</div>
			<div class="profile-info">
				<h2 class="profile-title">Robert Smith</h2>
				<h3 class="profile-position">Developer and Startup entrepreneur</h3>
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
			<form class="contactForm" action="https://rscard.px-lab.com/html/php/contact_form.php" method="post">
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
						<input class="contact-submit btn btn-lg btn-primary" type="submit" value="Send"/>
					</span>

				<div class="contact-response"></div>
			</form>
		</aside><!-- .widget_contact -->

		<aside class="widget widget-popuplar-posts">
			<h2 class="widget-title">Popular posts</h2>
			<ul>
				<li>
					<div class="post-media"><a href="index.html"><img src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/uploads/thumb-78x56-1.jpg"
					                                                  alt=""/></a></div>
					<h3 class="post-title"><a href="index.html">Standard Post Format With Featured Image</a></h3>
					<div class="post-info"><a href="index.html"><i class="rsicon rsicon-comments"></i>56
							comments</a></div>
				</li>
				<li>
					<div class="post-media"><a href="index.html"><img src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/uploads/thumb-78x56-2.jpg"
					                                                  alt=""/></a></div>
					<h3 class="post-title"><a href="index.html">Standard Post Format With Featured Image</a></h3>
					<div class="post-info"><a href="index.html"><i class="rsicon rsicon-comments"></i>56
							comments</a></div>
				</li>
				<li>
					<div class="post-media"><a href="index.html"><img src="<?php echo get_bloginfo( 'template_directory' ); ?>/img/uploads/thumb-78x56-3.jpg"
					                                                  alt=""/></a></div>
					<h3 class="post-title"><a href="index.html">Standard Post Format With Featured Image</a></h3>
					<div class="post-info"><a href="index.html"><i class="rsicon rsicon-comments"></i>56
							comments</a></div>
				</li>
			</ul>
		</aside><!-- .widget-popuplar-posts -->

		<aside class="widget widget_tag_cloud">
			<h2 class="widget-title">Tag Cloud</h2>
			<div class="tagcloud">
				<a href="index.html" title="1 topic">Business</a>
				<a href="index.html" title="9 topics">City</a>
				<a href="index.html" title="10 topics">Creative</a>
				<a href="index.html" title="6 topics">Fashion</a>
				<a href="index.html" title="2 topics">Music</a>
				<a href="index.html" title="5 topics">News</a>
				<a href="index.html" title="9 topics">Peoples</a>
			</div>
		</aside><!-- .widget_tag_cloud -->

		<aside class="widget widget-recent-posts">
			<h2 class="widget-title">Recent posts</h2>
			<ul>
				<li>
					<div class="post-tag">
						<a href="index.html">#Photo</a>
						<a href="index.html">#Architect</a>
					</div>
					<h3 class="post-title"><a href="index.html">Standard Post Format With Featured Image</a></h3>
					<div class="post-info"><a href="index.html"><i class="rsicon rsicon-comments"></i>56
							comments</a></div>
				</li>
				<li>
					<div class="post-tag">
						<a href="index.html">#Photo</a>
						<a href="index.html">#Architect</a>
					</div>
					<h3 class="post-title"><a href="index.html">Standard Post Format With Featured Image</a></h3>
					<div class="post-info"><a href="index.html"><i class="rsicon rsicon-comments"></i>56
							comments</a></div>
				</li>
				<li>
					<div class="post-tag">
						<a href="index.html">#Photo</a>
						<a href="index.html">#Architect</a>
					</div>
					<h3 class="post-title"><a href="index.html">Standard Post Format With Featured Image</a></h3>
					<div class="post-info"><a href="index.html"><i class="rsicon rsicon-comments"></i>56
							comments</a></div>
				</li>
			</ul>
		</aside><!-- .widget-recent-posts -->

		<aside class="widget widget_categories">
			<h2 class="widget-title">Categories</h2>
			<ul>
				<li><a href="index.html" title="Architecture Category Posts">Architecture</a> (9)</li>
				<li><a href="index.html" title="Business Category Posts">Business</a> (16)</li>
				<li><a href="index.html" title="Creative Category Posts">Creative</a> (18)</li>
				<li><a href="index.html" title="Design Category Posts">Design</a> (10)</li>
				<li><a href="index.html" title="Development Category Posts">Development</a> (14)</li>
				<li><a href="index.html" title="Education Category Posts">Education</a> (9)</li>
			</ul>
		</aside><!-- .widget_categories -->
	</div><!-- .widget-area -->
</div><!-- .sidebar -->