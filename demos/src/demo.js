import '../../main';

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	document.addEventListener('oClickTrack.click', evt => {
		const clickData = evt.detail;
		window.console.log('click captured', clickData);
	});
});
