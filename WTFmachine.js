$(document).on('ready', function(){
	var tableData = JSON.parse(localStorage.getItem('myCollection'));
	
	if (tableData === null) {
		$('.buttonholder').append('<p>Looks like you don\'t have any games in your collection yet.  Why don\'t you go <a href="browse.html">add a few</a>, then try this again?')
	}
	else{
		var availableGenres = getGenres(tableData);
		makeButtons(availableGenres);
	}
	$(document).on('click', '.btn-info', function(){
		var genreSelection = $(this).text();
		var randomGame = getRandomGame(genreSelection, tableData);
		$('.answer').text(randomGame);

	});


});

function getGenres (tableData){
	var collectionData = tableData;
	var genrearray = [];

	for (var i = 0; i < collectionData.length; i++){
		genrearray.push(collectionData[i].genre);
	}
	
	genrearray = _.uniq(genrearray);
	return genrearray;
}

function makeButtons (availableGenres){
	var genres = availableGenres;
	for (var i = 0; i < genres.length; i++){
		thisGenre = genres[i];
		if (thisGenre != 'Accessories'){
			var newButton = '<button type="button" style="margin: 10px" class="btn btn-info">' +thisGenre+'</button>';
			$('.buttonholder').append(newButton);
		}
	}
}

function getRandomGame (genreSelection, tableData) {
	var selection = genreSelection;
	var collectionData = tableData;
	console.log(selection);
	console.log(collectionData);
	var gameArray = [];

	for (var i = 0; i < collectionData.length; i++){
		if (collectionData[i].genre === selection){
			gameArray.push(collectionData[i].productname);
		}	
	}
	console.log(gameArray);
	var randomGame = _.sample(gameArray);
	return randomGame;
}