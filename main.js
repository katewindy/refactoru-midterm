$(document).on('ready', function() {
	var easter_egg = new Konami(function() {
		$('#easteregg').modal('show');
	});
});

var GameObject = function (game, console, genre, loose, cib){
	this.productname = game;
	this.consolename = console;
	this.genre = genre;
	this.looseprice = loose;
	this.cibprice = cib;

};

function createBrowseTableRows (dataArray) {
	var tableData = dataArray;
	for (var i = 0; i < dataArray.length; i++){
		var currentRow = dataArray[i];
		var id = i;
		var gameName = currentRow.productname;
		var consoleName = currentRow.consolename;
		var genre = currentRow.genre;
		var loose = Number(currentRow.looseprice);
		var cib = Number(currentRow.cibprice);
		var newrow = '<tr><td><a href=# class="gametitle" id="' + i + '">'+gameName+'</a></td><td class="consolename">'+consoleName+'</td><td class=genre>'+genre+'</td><td class="loose">$'+loose+'</td><td class="cib">$'+cib+'</td></tr>';

		$('.tablebody').append(newrow);
	}
}

// function createCollectionArray(){
// 	var myCollection = JSON.parse(localStorage.getItem('myCollection'));
// 	console.log(myCollection);
// 	if (myCollection === null){
// 	 	myCollection = [];
// 	 	console.log('initialized new collection: ' + myCollection);
// 	};
// 	return myCollection;
// }

