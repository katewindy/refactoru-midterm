$(document).on('ready', function() {
	// create lots of konami code easter eggs into pretty much all the pages
	var easter_egg = new Konami(function() {
		//shows easter egg on input on  up up down down a b
		$('#easteregg').modal('show');
	});
});

// global game object constructor
var GameObject = function (game, console, genre, loose, cib){
	this.productname = game;
	this.consolename = console;
	this.genre = genre;
	this.looseprice = loose;
	this.cibprice = cib;

};

// creates rows for all the tables
function createBrowseTableRows (dataArray) {
	var tableData = dataArray;
	for (var i = 0; i < dataArray.length; i++){
		var currentRow = dataArray[i];
		var id = i;
		var gameName = currentRow.productname;
		var consoleName = currentRow.consolename;
		var genre = currentRow.genre;
		var numloose = Number(currentRow.looseprice);
		var loose = numloose.toFixed(2);
		var numcib = Number(currentRow.cibprice);
		var cib = numcib.toFixed(2);

		var newrow = '<tr><td><a href=# class="gametitle" id="' + i + '">'+gameName+'</a></td><td class="consolename">'+consoleName+'</td><td class=genre>'+genre+'</td><td class="loose">$'+loose+'</td><td class="cib">$'+cib+'</td></tr>';

		$('.tablebody').append(newrow);
	}
}
// checks the collection array: if it doesn't exist yet it creates a blank one, and if it does it load it from local storage
function createCollectionArray(){
	var myCollection = JSON.parse(localStorage.getItem('myCollection'));
	console.log(myCollection);
	if (myCollection === null){
	 	myCollection = [];
	 	console.log('initialized new collection: ' + myCollection);
	};
	return myCollection;
}

