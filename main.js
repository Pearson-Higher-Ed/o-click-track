import ClickTrack from './src/js/ClickTrack';

export default ClickTrack;

const initClickTrack = () => {
	new ClickTrack();
	document.removeEventListener('o.DOMContentLoaded', initClickTrack);
};

document.addEventListener('o.DOMContentLoaded', initClickTrack);
