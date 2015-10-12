export function simulateClick(target) {
	const evt = document.createEvent('MouseEvents');

	evt.initMouseEvent('click',
		true,    // canBubble
		true,    // cancelable
		window,  // view
		0,       // detail
		15,      // screenX
		25,      // screenY
		0,       // clientX
		0,       // clientY
		false,   // ctrlKey
		false,   // altKey
		false,   // shiftKey
		false,   // metaKey
		0,       // button
		null     // relatedTarget
	);

	target.dispatchEvent(evt);
}
