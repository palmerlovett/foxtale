{(function() {
	if (!('flex' in document.body.style)) {
		var flexMime = document.createElement('link');
		flexMime.setAttribute('rel', 'stylesheet');
		flexMime.setAttribute('type', 'text/css');
		flexMime.setAttribute('href', '/assets/css/flex-mimick.css');

		document.getElementsByTagName('head')[0].appendChild(flexMime);
	}
})();

(function() {
  var clickable = document.querySelectorAll('.clickable');
  for (var i = 0; i < clickable.length; i++) {
    clickable[i].addEventListener('click', function(event) {
      event.preventDefault();
      var anchor = this.querySelector('a.target'),
          target = anchor.getAttribute('href'),
           blank = anchor.getAttribute('target') == '_blank' ? true : false;
      if (blank) window.open(target, '_blank').focus();
      else window.location = target;
    });
  }
})();



(function() {
	var breaker = 600,
			initial = (window.innerWidth <= breaker ? true : false),
				under = initial;

	function linkPreventer(event) { event.preventDefault(); };
	function activator(event) {
		var otherActives = this.parentElement.parentElement.querySelectorAll('li.dropdown[data-active="true"]');

		for (var i = 0; i < otherActives.length; i++) 
			if (this.parentElement != otherActives[i])
				otherActives[i].setAttribute('data-active', 'false');
		
		var isActive = (this.parentElement.getAttribute('data-active') == 'true' ? true : false);

		if (!isActive) this.parentElement.setAttribute('data-active', 'true');
		else this.parentElement.setAttribute('data-active', 'false');
	}
	function makeMobile() {

		var width = window.innerWidth,
			subMenu = document.querySelectorAll('.dropdown:not(.mobile-menu-ignore)');

		if (width <= breaker && under == false || initial == true) {
			console.log('under '+breaker+'px');
			under = true;
			initial = null;
			for (var i = 0; i < subMenu.length; i++) {
				subMenu[i].querySelector('a').addEventListener('click', linkPreventer, false);
				subMenu[i].querySelector('a').addEventListener('click', activator, false);
			}
		} if (width > breaker && under == true) {
			console.log('over '+breaker+'px');
			under = false;
			for (var i = 0; i < subMenu.length; i++) {
				subMenu[i].querySelector('a').removeEventListener('click', linkPreventer, false);
				subMenu[i].querySelector('a').removeEventListener('click', activator, false);
			}
		}
	}

	window.addEventListener('resize', makeMobile, false);
	window.addEventListener('load', makeMobile);
})()}