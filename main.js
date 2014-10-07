$(document).on('ready', function() {
  var tableData = dataPrettier();
	createBrowseTableRows(tableData);
	$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
	});
	// var myCollection = createCollectionArray();
	
	$(document).on('click', '.gametitle', function(){
		var myCollection = createCollectionArray();
		console.log('myCollection, right after click: '); 
		console.log(myCollection);
		var newCollectionItem = new GameObject();
		newCollectionItem.productname = $(this).text();
		newCollectionItem.consolename = $(this)
			.closest('td')
			.nextAll('.consolename')
			.text();
		newCollectionItem.genre = $(this)
			.closest('td')
			.nextAll('.genre')
			.text();
		newCollectionItem.looseprice = $(this)
			.closest('td')
			.nextAll('.loose')
			.text();
		newCollectionItem.cibprice = $(this)
			.closest('td')
			.nextAll('.cib')
			.text();
			console.log('newCollectionItem: ');
			console.log(newCollectionItem);
		swal({
			title: 'Add ' + newCollectionItem.productname + '?',
			text: 'Add this game to your collection?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'You know it!'
		});
		$(document).on('click', '.confirm', function (){
			myCollection.push(newCollectionItem);
			console.log('myCollection arrray after push of new object: ');
			console.log(myCollection);	
			localStorage.setItem('myCollection', JSON.stringify(myCollection));
			console.log('myCollection array after storing the array: ');
			console.log(myCollection);
		});
			
		
		
		
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

function createCollectionArray(){
	var myCollection = JSON.parse(localStorage.getItem('myCollection'));
	console.log(myCollection);
	if (myCollection === null){
	 	myCollection = [];
	 	console.log('initialized new collection: ' + myCollection);
	};
	return myCollection;
}

