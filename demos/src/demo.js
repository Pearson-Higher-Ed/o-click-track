/*global require*/
require('../../main');

document.addEventListener("DOMContentLoaded", function() {
	"use strict";
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	document.addEventListener('oClickTrack.click', function(evt){
		var clickData = evt.detail;
		window.console.log('click captured', clickData);
	});
});
