$(document).ready(function () {
	// Open the sidebar on load on bigger screens
	if ($(window).width() > 1540) {
		$('#sidebar-checkbox').prop('checked', true)
	}
	// Hook up search
	$('#tipue_search_input').tipuesearch({ 'show': 99 });

	$('.wrap').click(function(e) {
		var x = $('#sidebar-checkbox')[0];
		if (x.checked) {
			x.checked = false;
		}
	});
});

//Header anchor links from http://blog.parkermoore.de/2014/08/01/header-anchor-links-in-vanilla-javascript-for-github-pages-and-jekyll/
var anchorForId = function (id) {
	var anchor = document.createElement("a");
	anchor.className = "header-link";
	anchor.href      = "#" + id;
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