/*global describe, it*/
'use strict';

var expect = require('expect.js');

var ClickTrack = require('./../src/js/ClickTrack');

function simulateClick(target) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
	0, 15, 25, 0, 0, false, false, false, false, 0, null);
	target.dispatchEvent(evt);
}

describe('ClickTrack', function() {

	it('should initialize', function() {
		expect(new ClickTrack()).to.not.be(undefined);
	});

	it('should be a singleton', function () {
		expect(new ClickTrack()).to.be(new ClickTrack());
	});

	it('should bind on initialization', function(done){
		new ClickTrack();
		document.addEventListener('oClickTrack.click', function(evt){
			done();
		});
		simulateClick(document.body);
	});

	it('should emit all clicks', function(done){
		var clicks = 0,
			maxClicks = 150;
		document.addEventListener('oClickTrack.click', function(evt){
			clicks++;
			if(clicks >= maxClicks){
				done();
			}
		});
		for(var i=0; i<maxClicks; i++){
			simulateClick(document.body);
		}
	});

	it('should emit for the element clicked', function(done){
		var clicks = 0;
		document.addEventListener('oClickTrack.click', function(evt){
			if(!clicks){
				clicks = 1;
				expect(evt.detail.element.id).to.be('');
				// expect first el clicked
			}else{
				expect(evt.detail.element.id).to.be('check-me');
				done();
			}
		});
		simulateClick(document.body);
		var el2 = document.createElement('div');
		el2.id = 'check-me';
		document.body.appendChild(el2);
		simulateClick(el2);
	});
});
