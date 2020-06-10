var blms_debug = (typeof blms_debug === 'undefined') ? false : blms_debug;

function blms_start() {
	var e = document.getElementsByTagName('html');
	if (e.length == 1) {
		if ((blms_location() && blms_date()) || blms_is_forced()) {
			var s = e[0].getAttribute("style");
			e[0].setAttribute("style", "-moz-filter: grayscale(100%); -webkit-filter: grayscale(100%); filter: gray; filter: grayscale(100%);" + s);
			blms_badge();
		}
	}
	else {
	  blms_debug ? console.log('No HTML tag') : '';
	}
}

function blms_location() {
	if (typeof blms_force !== 'undefined' && blms_force) {
		blms_debug ? console.log('Variable blms_force set to true.') : '';
		return true;
	}
	else {
		blms_debug ? console.log('Variable blms_force not set to true.') : '';
	}

	if (typeof blms_pages === 'object' && blms_pages !== null) {
		for (let [key, value] of Object.entries(blms_pages)) {
			if (key == window.location.pathname) {
				blms_debug ? console.log('You are on a specified page from blms_page.') : '';
				return true;
			}
		}
	}

	if ('/' == window.location.pathname) {
		blms_debug ? console.log('You are on the homepage.') : '';
		return true;
	}
	blms_debug ? console.log('Not the right location') : '';
	return false;
}

function blms_date() {
	var d = new Date();
	if (d.getMonth() == 5 && (d.getDate() == 10 || d.getDate() == 11 || d.getDate() == 12)) {
		blms_debug ? console.log('It is BLMS day.') : '';
		return true;
	}
	blms_debug ? console.log('Not BLMS day.') : '';
	return false;
}

function blms_is_forced() {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == 'blms_simulation') {
			blms_debug ? console.log('blms_simulation found in the URL') : '';
			return true;
		}
	}
	blms_debug ? console.log('blms_simulation not found in the URL') : '';
	return false;
}

function blms_badge() {
	var lang = '';
	
	var blms_language = (typeof blms_language === 'undefined') ? null : blms_language;

	if (blms_language != null) {
		blms_debug ? console.log('blms_language is set on this page to: ' + blms_language) : '';
	}
	else {
		blms_debug ? console.log('blms_language is not set on this page.') : '';
	}

	if (blms_language == null && typeof blms_pages === 'object' && blms_pages !== null) {
		for (let [key, value] of Object.entries(blms_pages)) {
			if (key == window.location.pathname) {
				blms_debug ? console.log('Language for link will be: ' + value) : '';
				blms_language = value;
				break;
			}
		}
		if (blms_language != null) {
			lang = '?lang=' + blms_language;
		}
	}
	else {
		blms_debug ? console.log('blms_pages not found for language setting.') : '';
	}
	
	var i = document.createElement('iframe');
	i.setAttribute('src', 'https://blacklivesmatter.support/iframe.html'+lang);
	i.setAttribute('width', '85');
	i.setAttribute('height', '85');
	i.setAttribute('role', 'presentation');
	i.setAttribute('width', '85');
	i.setAttribute('frameborder', '0');
	i.setAttribute('scrolling', 'no');
	i.setAttribute('sandbox', 'allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox');

	var s = document.createElement('div');
	s.appendChild(i);

	var p = document.createElement('div');
	p.setAttribute('data-style', 'bottomright');
	p.setAttribute('style', 'width: 85px; height: 85px; display: block; position: fixed; bottom: 200px; right: 0; box-shadow: gray 0px 0px 5px; border-radius: 5px 0 0 5px; overflow: hidden;z-index:99999; -moz-filter: none; -webkit-filter: none; filter: none;');
	p.appendChild(s);

	if (document.body != null) {
		document.body.appendChild(p);
	}
	else {
		console.log('BlackLivesMatter.support script must be included inside the <body> tag');
	}
	
}

blms_start();