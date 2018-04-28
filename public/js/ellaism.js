$(document).ready(function () {

	function findAncestor(el, cls) {
		while ((el = el.parentElement) && !el.classList.contains(cls)) ;
		return el;
	}

	function is_touch_device() {
		return 'ontouchstart' in window        // works on most browsers
			|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
	};

	// Open the sidebar on load on bigger screens
	if ($(window).width() > 1540) {
		$('#sidebar-checkbox').prop('checked', true)
	}
	// Hook up search
	$('#tipue_search_input').tipuesearch({'show': 99});

	function handleClick(e) {
		var x = $('#sidebar-checkbox')[0];
		if (e.target.id != 'sidebar-checkbox') {
			if (!findAncestor(e.target, 'sidebar-container')) {
				if (e.target.className != 'sidebar-container') {
					if (x.checked) {
						x.checked = false;
					}
				}
			}
		}
	}

	if (is_touch_device())
	{
		$('body').on('touchstart', function (e) {
			handleClick(e);
		});
	} else {
		$('body').on('click', function (e) {
			handleClick(e);
		});
	}
});

//Header anchor links from http://blog.parkermoore.de/2014/08/01/header-anchor-links-in-vanilla-javascript-for-github-pages-and-jekyll/
var anchorForId = function (id) {
	var anchor = document.createElement("a");
	anchor.className = "header-link";
	anchor.href = "#" + id;
	anchor.innerHTML = "<i class=\"fa fa-link\"></i>";
	return anchor;
};

var linkifyAnchors = function (level, containingElement) {
	var headers = containingElement.getElementsByTagName("h" + level);
	for (var h = 0; h < headers.length; h++) {
		var header = headers[h];

		if (typeof header.id !== "undefined" && header.id !== "") {
			header.appendChild(anchorForId(header.id));
		}
	}
};

document.onreadystatechange = function () {
	if (this.readyState === "complete") {
		var contentBlock = document.getElementsByClassName("content")[0] || document.getElementsByClassName("news")[0];
		if (!contentBlock) {
			return;
		}
		for (var level = 2; level <= 6; level++) {
			linkifyAnchors(level, contentBlock);
		}
	}
};