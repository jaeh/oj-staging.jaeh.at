(function() {
	'use strict';

	//first tell the body that we have javascript support
	document.body.className = document.body.className.replace('nojs', 'js');
/*
	document.location.hash = document.location.hash || '#image-1';

	var hashId = (location.hash || '1').replace('#image-', '');

	var imageGallery = document.getElementById('imageGallery');

	var imageTags = imageGallery.getElementsByTagName('img');

	var images = [];
	for(var i = 0;i < imageTags.length; i++) {
		var img = imageTags[i];
		var id = img.id.replace('image-', '');
		images.push({
			src: img.src,
			id: id,
			shown: id == hashId,
		});
		if ( id != hashId ) {
			imageTags[i].removeAttribute('src');
		}
	}

	console.log(images);
/*
	var content = document.getElementById('content');
	var imageGallery = document.getElementById('imageGallery');
	var imageGalleryNoscripts = imageGallery.getElementsByTagName('noscript');
	var imageGalleryImage = imageGallery.getElementsByTagName('img')[0];

	var imageMenuNoscript = document.getElementById('imageMenuNoscript');

	function noscriptReplace(noscriptString) {
		return noscriptString.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
	}
	function linkReplace(linkString) {
			var linkArray = linkString.split('<');
			linkArray.forEach( function(link) {
				var id = linkArray.split('id="')[1].split('"')[0];
				console.log(id);
			} );
	}

	function removeElement(ele) {
		if (ele && ele.parentNode) {
			return ele.parentNode.removeChild(ele);
		}
	}

	function forEach(objects, callback) {
			for ( var key in objects ) {
				if (objects.hasOwnProperty(key) ) {
					if (typeof callback === 'function') {
						callback(key, objects[key]);
					}
				}
			}
	}

	function get_images() {
		var imageSrc = imageGalleryImage.src;

	}

	function add_menu() {
		var imageTags = imageGallery.getElementsByTagName('img')[0];


		//var imageMenu = document.createElement('div');
		//imageMenu.id = 'imageMenu';
		//imageMenu.innerHTML = noscriptReplace(imageMenuNoscript.innerHTML);

		//imageMenuNoscript.parentNode.removeChild(imageMenuNoscript);

		//content.appendChild(imageMenu);
	}

	function add_images() {
		//expect two noscript tags
		var before = imageGalleryNoscripts[0];
		var after = imageGalleryNoscripts[1];

		if ( ! after || ! after.innerHTML ) {
			if ( ! before || ! before.innerHTML ) { return; }
			after = before;
			before = false;
		}

		var afterHTML = after.innerHTML;
		var beforeHTML = before && before.innerHTML ? before.innerHTML : '';

		removeElement(after);
		removeElement(before);

		var imageHTML = imageGallery.innerHTML;
		var newHTML = noscriptReplace(beforeHTML + imageHTML + afterHTML)

		imageGallery.innerHTML = newHTML;

		var imageMenu = document.createElement('div');
		imageMenu.id = 'imageMenu';
		imageMenu.innerHTML = linkReplace(newHTML);

		content.appendChild(imageMenu);
		console.log(imageGallery.innerHTML);
	}*/
})();
