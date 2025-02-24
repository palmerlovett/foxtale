var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function() {
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
})()

}
/*
     FILE ARCHIVED ON 10:33:04 Dec 01, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:11:53 Feb 24, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.553
  exclusion.robots: 0.02
  exclusion.robots.policy: 0.009
  esindex: 0.012
  cdx.remote: 47.44
  LoadShardBlock: 342.816 (3)
  PetaboxLoader3.datanode: 363.434 (5)
  PetaboxLoader3.resolve: 263.149 (3)
  load_resource: 325.326 (2)
*/