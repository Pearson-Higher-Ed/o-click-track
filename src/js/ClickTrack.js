let instance;

export default SingletonFactory;

function SingletonFactory() {
	if (!instance) {
		instance = new ClickTrack(arguments);
	}

	return instance;
}

function ClickTrack() {
	const root = document.documentElement || document;
	if(root.addEventListener){
		root.addEventListener("click", recordEvent, false);
	}else{
		root.attachEvent("onclick", recordEvent);
	}
	return true;
}

function dispatchEvent(element, name, data) {
	if (document.createEvent && element.dispatchEvent) {
		const event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		element.dispatchEvent(event);
	}
}

function fetchAttributes(list) {
	return list && Array.prototype.reduce.call(list, function(list, attribute) {
		list[attribute.name] = attribute.value;
		return list;
	}, {}) || {};
}

function getIdentifier (elem){
	let res = (elem.tagName||elem.nodeName).toLowerCase();
	if(elem.id){
		res = res + '#' + elem.id;
	}
	if(elem.className){
		const className = elem.className.toString().replace(/\s+/g, '.');
		res = res + '.' + className;
	}
	return res;
}

function getParentage(elem){
	let res = '';
	// leave out the document element
	if(elem.parentNode && elem.parentNode.parentNode){
		res = getParentage(elem.parentNode)+' ';
	}
	return res+getIdentifier(elem);
}

function recordEvent(evt){
	const e = evt || event;

	try {
		const el = e.srcElement || e.element || e.target;
		const data = {
				event: 'click',
				element: {
					parentage: getParentage(el),
					tag: el.tagName || el.nodeName,
					class: el.className,
					id: el.id,
					innerHTML: el.innerHTML,
					attributes: fetchAttributes(el.attributes),
					dataset: fetchAttributes(el.dataset)
				},
				x: e.x || e.offsetX || e.clientX || e.pageX,
				y: e.y || e.offsetY || e.clientY || e.pageY
			};
		// emit captured data on document as event
		dispatchEvent(document, 'oClickTrack.click', data);
	}
	catch (err) {
		window.console.error('ERROR:', err);
		window.console.log('Click:', e || evt);
	}
}
