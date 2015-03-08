var dataInjector = function(configObj) {

	/* HEADER FUNCTIONS */

	var changeTitle = function() {
		document.title = configObj.title;
	};


	/* TITLE PAGE FUNCTIONS */

	var buildPlatformButtonHtml = function(elementId, url, icon, title, cssClass) {
		var html = '';

		if(!cssClass) {
			cssClass = "";
		}

		// give it its id and href
		html += '<a id="' + elementId + '" href="' + url + '" class="button title-button ' +  cssClass +'">';

		// url
		html += '<img src="assets/icons/' + icon + '">';

		// title
		html += '<span>' + title + '</span>';

		html += '</a>';

		return html;
	};

	var ua = navigator.userAgent;
	var isAndroid = /Android/i.test(ua);
	
	var isIOS = /iPhone|iPad|iPod/i.test(ua);
	var isMac = /Macintosh/i.test(ua);
	var isWindows = /Windows/i.test(ua);

	var injectPlatformLinks = function() {
		var buttonsUrl = '';

		if(configObj.androidLink) {
			if(!isAndroid) {
				//configObj.androidLink = "#"
			} else {
				var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8));				
				if(androidversion && androidversion < 4.2) {
					setTimeout('alert("Sorry your version of Android is not supported. This apps works best on Jelly Bean (4.2+) and above.")', 1500);
				}
			}
			buttonsUrl += buildPlatformButtonHtml('android-link', configObj.androidLink, 'android.png', 'Android', isAndroid? "":"fade");
		}
		if(configObj.iOSLink) {
			if(!isIOS) {
				//configObj.iOSLink = "#"
			}
			buttonsUrl += buildPlatformButtonHtml('iOS-link', configObj.iOSLink, 'apple.png', 'iOS', isIOS? "": "fade");
		}
		if(configObj.webAppLink) {
			buttonsUrl += buildPlatformButtonHtml('web-app-link', configObj.webAppLink, 'web.png', 'Web',"");
		}
		if(configObj.windows8Link && !isIOS && !isAndroid) {
			if(!isWindows) {
				configObj.windows8Link = "#"
			}
			buttonsUrl += buildPlatformButtonHtml('windows-8-link', configObj.windows8Link, 'windows.png', 'Windows', isWindows? "": "fade");
		}
		if(configObj.osXLink && !isAndroid) {
			if(!isMac) {
				configObj.osXLink = "#"
			}
			buttonsUrl += buildPlatformButtonHtml('osX-link', configObj.osXLink, 'apple.png', 'Mac', isMac?"":"fade");
		}

		//buttonsUrl += "<span class='button title-button fade'><img src='assets/icons/apple.png'> coming soon</span>"

		document.getElementById('platform-buttons').innerHTML = buttonsUrl;
	};

	var getPhoneShim = function() {
		if(configObj.shimOrientation === 'landscape') {
			document.getElementById('app-image-container').classList.add('iphone-landscape');
			document.getElementById('shim-container').src = 'assets/shim/iphonelandscape.png';
			document.getElementById('shim').classList.add('iphone-landscape');
		}

		else {
			document.getElementById('app-image-container').classList.add('iphone-portrait');
			document.getElementById('shim-container').src= 'assets/shim/iphoneportrait.png';
			document.getElementById('shim').classList.add('iphone-portrait');
		}
	};

	var getTabletShim = function() {
		if(configObj.shimOrientation === 'landscape') {
			document.getElementById('app-image-container').classList.add('ipad-landscape');
			document.getElementById('shim-container').src = 'assets/shim/ipadlandscape.png';			
			document.getElementById('shim').classList.add('ipad-landscape');
		}

		else {
			document.getElementById('app-image-container').classList.add('ipad-portrait');
			document.getElementById('shim-container').src= 'assets/shim/ipadportrait.png';
			document.getElementById('shim').classList.add('ipad-portrait');
		}
	};

	var getShim = function() {

		switch(configObj.shimDevice) {
			case 'phone':
				getPhoneShim();
				break;

			case 'tablet':
				getTabletShim();
				break;

			default:
				break;
		}
	};

	var injectTitlePage = function() {
		document.getElementById('title').innerHTML = configObj.title;
		document.getElementById('subtitle').innerHTML = configObj.subtitle;
		document.getElementById('author').innerHTML = 'By ' +  configObj.author;
		document.getElementById('app-icon').src = configObj.appIcon;
		document.getElementById('home-section').style.backgroundImage = "url('" + configObj.mainBackground + "')";
		document.getElementById('shim').src = configObj.featuredScreenshot;

		getShim();
		injectPlatformLinks();					
	};



	/* FEATURED PAGE FUNCTIONS */



	var injectFeaturedPoints = function() {
		var featuresHtml = '';

		configObj.features.forEach(function(feature) {
			var featureTag = '<li class="column-list-item">' + 
								'<img class="list-img" src="assets/icons/dot.png">' + 
								'<span class="description">' + feature + '</span>' + 
						  	 '</li>';
			featuresHtml += featureTag;
		});

		document.getElementById('featured-points').innerHTML = featuresHtml;
	};

	var injectCarouselScreenshots = function() {
		var screenshotHtml = '';

		configObj.screenshots.forEach(function(screenshot) {
			var carouselItem = '<li>' + 
									'<img src="' + screenshot + '">' +
								'</li>';
			screenshotHtml += carouselItem;
		});

		document.getElementById('screenshots-carousel').innerHTML = screenshotHtml;
	};

	var injectFeatures = function() {
		document.getElementById('features-blurb').innerHTML = configObj.featuresBlurb;

		injectFeaturedPoints();
		injectCarouselScreenshots();
	};



	/* ABOUT PAGE FUNCTIONS */



	var injectAbout = function() {
		document.getElementById('about-paragraph').innerHTML = configObj.aboutParagraph;
		document.getElementById('contact-information').innerHTML = configObj.organizationName + ' &bull; ' + configObj.organizationCityAndState + 
																   ' &bull; ' + configObj.organizationWebsite;
	};




	/* CONNECT PAGE FUNCTIONS */



	var buildSocialLinksHtml = function(url, imgLink, title) {

		var socialLinkHtml = '<li class="column-list-item share-item">' +
					            '<a href="' + url + '" class="column-list-item-link">' +
					                '<img class="list-img share-img" src="' + imgLink + '">' +
					                '<span class="subtitle">' + title + '</span>' +
					            '</a>' +                                
					         '</li>';

		return socialLinkHtml;
	};

	var injectSocials = function() {

		if(configObj.showCommunity && configObj.showCommunity == "no") return;
		var socialLinksHtml = '';

		if(configObj.twitterLink) {
			socialLinksHtml += buildSocialLinksHtml(configObj.twitterLink, 'assets/icons/twitterdark.png', 'Follow our tweets');
		}
		if(configObj.facebookLink) {
			socialLinksHtml += buildSocialLinksHtml(configObj.facebookLink, 'assets/icons/facebookdark.png', 'See our posts');
		}
		if(configObj.blogLink) {
			socialLinksHtml += buildSocialLinksHtml(configObj.blogLink, 'assets/icons/blogdark.png', 'Read our blog');
		}
		if(configObj.webAppLink) {
			socialLinksHtml += buildSocialLinksHtml(configObj.webAppLink, 'assets/icons/webdark.png', 'Visit our site');
		}

		document.getElementById('social-links').innerHTML = socialLinksHtml;
	};




	/* MEDIA LOADING FUNCTIONS */



	var loadVideo = function() {
		document.getElementById('video-container').src = configObj.videoUrl;
	};

	var loadTwitter = function() {

		if(!configObj.twitterWidgetId) {
			document.getElementById('twitter-column').style.display = 'none';
		}
		else {
			document.getElementById('twitter-widget').href = 'https://twitter.com/search?q=' + encodeURIComponent(configObj.twitterSearchTerm);
			document.getElementById('twitter-widget').dataset.widgetId = configObj.twitterWidgetId;

			!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
		}		
	};

	var loadMedia = function() {
		if(configObj.videoUrl) setTimeout(loadVideo, 500);
		if(configObj.showCommunity && configObj.showCommunity == "yes") setTimeout(loadTwitter, 500);
	};


	var initalizeFullPage = function() {
		var sections = ['intro', 'features', 'about', 'explore', 'issues', 'community'];
		var sectionsWithoutVideo = ['intro', 'features', 'about', 'issues', 'community'];


		if(!configObj.videoUrl) {
			sections = sectionsWithoutVideo;

			// remove explore page
			var parent = document.getElementById('fullpage');
			var child = document.getElementById('explore-section');
			parent.removeChild(child);

			// remove explore menu item
			var menuParent = document.getElementById('menu');
			var menuChild = document.getElementById('explore-menu-item');
			menuParent.removeChild(menuChild);
		}	

		if(configObj.showCommunity && configObj.showCommunity == "no") {

			// remove explore page
			var parent = document.getElementById('fullpage');
			var child = document.getElementById('community-section');
			parent.removeChild(child);

			// remove explore menu item
			var menuParent = document.getElementById('menu');
			var menuChild = document.getElementById('community-menu-item');
			menuParent.removeChild(menuChild);

		}	

		$('#fullpage').fullpage({
			sectionsColor: ['#FFF', '#EEE', '#FFF', '#EEE', '#FFF', '#EEE'],
			anchors: sections,
			menu: '#menu',
			scrollOverflow: true,
			paddingTop: '35px',
			css3: true,
			navigation: true		
		});
	};


	/* MAIN METHOD */

	var injectData = function() {

		changeTitle();

		injectTitlePage();
		injectFeatures();
		injectAbout();
		injectSocials();

		loadMedia();

		initalizeFullPage();
	};	



	// bundle up the public functions and objects

	var that = {};

	that.injectData = injectData;

	return that;
};