$(document).ready(function() {

	var injector = dataInjector(configObj);
	injector.injectData();	



	 $('#slide-container').bjqs({
        'height' : 500,
        'width' : $('#slide-container').width(),
        responsive : false,
        showcontrols : true, // show next and prev controls
		centercontrols : true, // center controls verically
		nexttext : '<img src="assets/icons/chevron-right.png" width="16px" height="30px">', // Text for 'next' button (can use HTML)
		prevtext : '<img src="assets/icons/chevron-left.png" width="16px" height="30px">', // Text for 'previous' button (can use HTML)
		showmarkers : true, // Show individual slide markers
		centermarkers : true // Center markers horizontally
    });
});