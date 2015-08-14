/*global require, module*/
'use strict';

var ClickTrack = require('./src/js/ClickTrack');

var initClickTrack = function () {
	new ClickTrack();
	document.removeEventListener('o.DOMContentLoaded', initClickTrack);
};

document.addEventListener('o.DOMContentLoaded', initClickTrack);

module.exports = ClickTrack;
