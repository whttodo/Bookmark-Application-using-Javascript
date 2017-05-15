// Listeners for for Form Submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e){
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value; 

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);

		//Set to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		//Add bookmark to array
		bookmarks.push(bookmark);

		//Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
		fetchBookmarks();

	e.preventDefault(); // Prevent Form from Submitting
}

// DElete bookmark
function deleteBookmark(url){
	// Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
	 	if (bookmarks[i].url == url) {
	 		// Remove from array
	 		bookmarks.splice(i,1);
	 	};

	};
	//Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		// Re-fetch bookmarks
		fetchBookmarks();
}



// Fetch bookmarks
function fetchBookmarks(){

		// Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		// GEt output id
		var BookMarkedSites = document.getElementById('BookMarkedSites');

		// Build output
		BookMarkedSites.innerHTML = '';
		for(var i = 0; i < bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			BookMarkedSites.innerHTML += '<div class="well">'+
										  '<h3>'+name+
										  ' <a class= "btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
										  ' <a onclick="deleteBookmark(\''+url+'\')" class= "btn btn-danger" href="#">Delete</a>' +
										  '</h3>'+
										  '</div>';
		}
}

function validateForm(siteName, siteUrl){
	if (!siteName || !siteUrl) {
		alert('Please fill in the form');
		return false;
	};


	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('please valid url');
		return false;
	}

	return true;
}