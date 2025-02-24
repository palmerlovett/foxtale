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

(validation = function() {
	console.log('validation instance created;')
	var request = document.getElementById('request-project'),
			 fields = request.querySelectorAll('input');
	
	this.initiate = function(field) {
		var validityAtt = document.createAttribute('data-show-validity');
		field.setAttributeNode(validityAtt);
		field.addEventListener('input', toggleValidityReport);
		return true;
	}
	function exit(field) {
		field.removeAttribute('data-show-validity');
		field.removeEventListener('input', toggleValidityReport);
	}

	function toggleValidityReport() {
		if (!this.validity.valid && event.type == 'blur' && this.hasInputted)
			initiate(this);

		if (this.validity.valid && this.hasAttribute('data-show-validity') && event.type == 'blur')
			exit(this);

		if (this.hasAttribute('data-dependent')) {
			var dependent = document.getElementById(this.getAttribute('data-dependent'));
			if (this.validity.valid)
				this.required = dependent.required = false;
		}
	}

	function tripHasInputted() {
		this.hasInputted = true;
		this.removeEventListener('input', tripHasInputted);
	}

	this.checkDependents = function() {
		var deps = document.getElementById('request-project').querySelectorAll('input[data-dependent]');
		console.log(deps);
		for (var i = 0; i < deps.length; i++) {
			var dependent = document.getElementById(deps[i].getAttribute('data-dependent'));
			console.log(deps[i], dependent);

			if (deps[i].value == '' && dependent.value == '') {
				deps[i].required = dependent.required = true;
				initiate(deps[i]);
				initiate(dependent);
			}
		}
	}

	for (var i = 0; i < fields.length; i++) {

		fields[i].hasInputted = false;

		fields[i].addEventListener('blur', toggleValidityReport);
		fields[i].addEventListener('input', tripHasInputted);

		if (fields[i].hasAttribute('data-allowed-entry')) {
			fields[i].addEventListener('input', function(event) {
				var pos = this.selectionStart;
						len = this.value.length;
					 char = this.value[pos - 1],
				pattern = new RegExp(this.getAttribute('data-allowed-entry')),
				  match = char.match(pattern) == null ? false : true;

				//console.log(char, this.selectionStart, match, this.value.substr(0, pos-1));
				if (!match) {
					this.value = this.value.substr(0, pos-1)+this.value.substr(pos);
					this.setSelectionRange(pos-1, pos-1);
				}
			}, false);
		}
	}
})();

(function submitForm() {
	document.getElementById('request-project').addEventListener('submit', function(event) {
		event.preventDefault();

		var fields = this.querySelectorAll('input'),
				  vali = new validation(),
				 valid = true;

		vali.checkDependents();

		for (i = 0; i < fields.length; i++)
			if (!fields[i].validity.valid) var valid = !vali.initiate(fields[i]);

		var xhr = new XMLHttpRequest(),
			 data = new FormData(event.target);
		
		xhr.open('POST', this.getAttribute('data-action'), true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		
		(function(form) {
			xhr.onload = function() {
				form.innerHTML = '';
				var confirm = document.createElement('h3');
				confirm.className = 'exit';
				confirm.innerHTML = this.response;
				form.appendChild(confirm);
			}
		})(this);

		if (valid) {
			this.querySelector('button[type="submit"]').disabled;
			xhr.send(data);
		}
	});
})();

}
/*
     FILE ARCHIVED ON 06:44:58 Oct 08, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:13:12 Feb 24, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.833
  exclusion.robots: 0.035
  exclusion.robots.policy: 0.021
  esindex: 0.015
  cdx.remote: 7.638
  LoadShardBlock: 357.633 (3)
  PetaboxLoader3.datanode: 290.315 (4)
  PetaboxLoader3.resolve: 131.492 (2)
  load_resource: 99.871
*/