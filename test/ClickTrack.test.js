/*global describe, it*/

import expect from 'expect.js';
import ClickTrack from '../src/js/ClickTrack';
import { simulateClick } from './helpers';

describe('ClickTrack', () => {

	it('should initialize', () => {
		expect(new ClickTrack()).to.not.be(undefined);
	});

	it('should be a singleton', () => {
		expect(new ClickTrack()).to.be(new ClickTrack());
	});

	it('should bind on initialization', (done) => {
		new ClickTrack();
		document.addEventListener('oClickTrack.click', () => {
			done();
		});
		simulateClick(document.body);
	});

	it('should emit all clicks', (done) => {
		let clicks = 0;
		const maxClicks = 150;
		document.addEventListener('oClickTrack.click', () => {
			clicks++;
			if (clicks >= maxClicks) {
				done();
			}
		});
		for (let i = 0; i < maxClicks; i++) {
			simulateClick(document.body);
		}
	});

	it('should emit for the element clicked', (done) => {
		let clicks = 0;
		document.addEventListener('oClickTrack.click', (evt) => {
			if (!clicks) {
				clicks = 1;
				expect(evt.detail.element.id).to.be('');
				// expect first el clicked
			} else {
				expect(evt.detail.element.id).to.be('check-me');
				done();
			}
		});
		simulateClick(document.body);
		const el2 = document.createElement('div');
		el2.id = 'check-me';
		document.body.appendChild(el2);
		simulateClick(el2);
	});

});
