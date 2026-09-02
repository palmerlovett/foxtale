(function(){
	gallery = function(div, options = {}) {
	
		defaults = {
			"thumbs": div.querySelector('.thumbs'),
			"display": div.querySelector('.display'),
			"paginate": true,
			"numThumbs": 20,
			"pagerClass": 'inner-nav inline'
		}
		for (option in defaults)
			if (options[option] === undefined)
				options[option] = defaults[option]
	
		var pagerRange = []
	
		var thumbs = options.thumbs.querySelectorAll('li')
		
		var photos = []
		for (var i = 0; i < thumbs.length; i++) {
			var anchor = thumbs[i].firstChild
			photos[i] = new photo(anchor.href, i, thumbs[i])
			anchor.photoId = i
		}
	
		function photo(href, thumb) {
			var photo = {
				"href": 	href,
				"thumb":  thumb,
				"loaded": false,
				"file": new Image(),
				load: function() {
					this.file.src = this.href
				}
			}
			photo.file.onload = function() {
				photo.loaded = true
			}
			return photo
		}
	
		this.photos = photos
		this.photo = photo
	
		function preventDefault(event) {
			event.preventDefault();
		}
	
		var pager = this.pager = new pager(),
		 selector = this.selector = new selector(photos)
	
		function selector() {
			this.displayed = options.display
			this.id = function(photo) { return photos.indexOf(photo) }
			this.current = 0
	
			this.display = display
			this.replace = replace
			this.navigate = navigate
	
			var selector = this
	
			function display(photo) {
				if (typeof photo != 'object')
					photo = photos[photo]
				
				var photoId = photos.indexOf(photo)
	
				if (!photo.loaded) {
					photo.load()
					selector.displayed.parentElement.setAttribute('loading', null)
				} else loaded()
	
				function loaded() {
					replace(photo.file)
					loadAdjacents(photos.indexOf(photo))
				}
	
				photo.file.onload = function() {
					loaded()
					photo.loaded = true
					selector.displayed.parentElement.removeAttribute('loading')
				}
	
				selector.current = selector.id(photo)
	
				if ((photoId < pagerRange[0]) || (photoId > pagerRange[1]))
					pager.navigate.jump(Math.ceil((photoId == 0 ? 1 : photoId) / (options.numThumbs - 1)))
			}
	
			function loadAdjacents(adjacentTo) {
				var adjacents = [(adjacentTo-1), (adjacentTo+1)]
				for (var i = 0; i < adjacents.length; i++)
					if (adjacents[i] >= 0 && adjacents[i] < photos.length)
						if (!photos[adjacents[i]].loaded)
							photos[adjacents[i]].load()
			} loadAdjacents(0)
	
			var navigate = this.navigate = new navigate()
			function navigate() {
				this.select = function(dest) {
					selector.display(dest)
				}
				this.prev = function() {
					var dest = (selector.current-1)
					if (dest < 0) dest = (photos.length - 1)
					selector.display(dest)
				}
				this.next = function() {
					var dest = (selector.current+1)
					if (dest > (photos.length-1)) dest = 0
					selector.display(dest)
				}
			}
	
			function replace(img) {
				var img = img.cloneNode()
				img.className = 'fadein'
	
				selector.displayed.parentElement.appendChild(img)			
				selector.displayed.style.opacity = 0
	
				setTimeout(function() {
					selector.displayed.parentElement.removeChild(selector.displayed)
					selector.displayed.style.opacity = 1
					img.id = 'selected'
					img.className = ''
					selector.displayed = img
				}, 200)
			}
	
			var anchors = options.thumbs.querySelectorAll('a')
			for (var i = 0; i < anchors.length; i++)
				anchors[i].addEventListener('click', clickSelect)
	
			var stepper = document.createElement('a')
			stepper.className = 'stepper';
			stepBack = stepper.cloneNode()
			stepForw = stepper.cloneNode()
			stepBack.href = '#prev'
			stepBack.innerHTML = '◀'
			stepBack.className += ' prev'
			stepForw.href = '#next'
			stepForw.innerHTML = '▶'
			stepForw.className += ' next'
			stepBack.addEventListener('click', navigate.prev)
			stepBack.addEventListener('click', preventDefault)
			stepForw.addEventListener('click', navigate.next)
			stepForw.addEventListener('click', preventDefault)
	
			selector.displayed.parentElement.appendChild(stepBack)
			selector.displayed.parentElement.appendChild(stepForw)
	
			function clickSelect(event) {
				event.preventDefault()
				navigate.select(this.photoId)
			}
		}
	
	
	
		function pager(dest) {
		  var thumber = options.thumbs,
		 	totalThumbs = thumbs.length,
		 	   numPages = Math.ceil(totalThumbs / options.numThumbs);
	
		 	// create and insert pagination
		 	function assembleClicker(href, type) {
				var item = document.createElement('LI'),
					 	link = document.createElement('A')
	
				link.href = '#'+href
				link.className = type
				if (type == 'jumper') 	 link.innerHTML = href
				else if (href == 'prev') link.innerHTML = '◀'
				else if (href == 'next') link.innerHTML = '▶'
	
				link.addEventListener('click', anchorNavigation)
				item.appendChild(link)
				return item
			}
		 	var pager = document.createElement('UL'),
	
		 	clickers = {
				"prev": {},
				"jumpers": (function(numPages) {
					jumpers = [];
					for (var i = 1; i <= numPages; i++)
						jumpers[i] = {}
					return jumpers
				})(numPages),
				"next": {}
			}
			pager.className = options.pagerClass
	
			for (var c in clickers)
				if (c == 'prev' || c == 'next')
					pager.appendChild(assembleClicker(c, 'step'))
				else for (var j in clickers[c])
					pager.appendChild(assembleClicker(j, 'jumper'))
	
	
			thumber.parentElement.insertBefore(pager, thumber)
			thumber.remove
			pager.parentElement.insertBefore(thumber, pager)
	
			var navigate = this.navigate = new navigate(pager)
	
			function navigate(pager) {
				var displayed = 1
				
				function actives(displayed) {
					var jumpers = pager.querySelectorAll('.jumper'),
						 	 active = pager.querySelector('.jumper[active]')
					if (active) active.removeAttribute('active')
					jumpers[displayed-1].setAttribute('active', null)
				}
				actives(displayed)
	
				function update(next) {
					displayed = next
					actives(displayed)
	
					pagerRange[0] = (options.numThumbs * (displayed - 1))
					pagerRange[1] = (pagerRange[0] + options.numThumbs - 1)
		
					for (var i = 0; i < thumbs.length; i++)
						if (pagerRange[0] <= i && pagerRange[1] >= i)
							thumbs[i].style.display = 'block'
						else thumbs[i].style.display = 'none'
				}
				update(displayed)
	
				this.prev = function() {
					if (displayed != 1)
						update(displayed - 1) }
				this.jump = function(jumpto) {
					update(jumpto) }
				this.next = function() {
					if (displayed != numPages)
						update(displayed + 1) }
			}
			
			function anchorNavigation(event) {
				event.preventDefault()
				var dest = this.href.substr(this.href.indexOf('#')+1)
				if (dest == 'prev') navigate.prev()
				if (!isNaN(parseInt(dest)))
					navigate.jump(parseInt(dest))
				if (dest == 'next') navigate.next()
			}
		}
	}
})();