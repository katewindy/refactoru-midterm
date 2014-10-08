$(document).on('ready', function() {
	//  run the data stored in data.js and make it into one huge array
  	var tableData = dataPrettier();
 	// inject table rows into the DOM
	createBrowseTableRows(tableData);
	// create nice table using DataTables plugin
	$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
	});
	
	// add all data from the selected row to a Game object and save it to the user's collection in localStorage when the title of the game is clicked in the table
	$(document).on('click', '.gametitle', function(){
		// create the collection array within this function
		var myCollection = createCollectionArray();
		// create a blank new GameObject
		var newCollectionItem = new GameObject();
		// grab the game/item name from the DOM element
		newCollectionItem.productname = $(this).text();
		// grab the console the game/item is for from the DOM element
		newCollectionItem.consolename = $(this)
			.closest('td')
			.nextAll('.consolename')
			.text();
		// grab the genre the game/item is for from the DOM element
		newCollectionItem.genre = $(this)
			.closest('td')
			.nextAll('.genre')
			.text();
		// ditto with the loose price (ie: no box, no manual, lacking one or the other)
		newCollectionItem.looseprice = $(this)
			.closest('td')
			.nextAll('.loose')
			.text()
			.substr(1);
		// ditto again with the CIB price (CIB = complete in box, has manual, box and game)
		newCollectionItem.cibprice = $(this)
			.closest('td')
			.nextAll('.cib')
			.text()
			.substr(1);
		// create Add a Game popup using Sweet Alert plugin 
		swal({
			title: 'Add ' + newCollectionItem.productname + '?',
			text: 'Add this game to your collection?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'You know it!'
		});
		// Add item to collection when "You Know it!" is clicked
		$(document).on('click', '.confirm', function (){
			//add game object to the collection array
			myCollection.push(newCollectionItem);
			// save collection array to local storage
			localStorage.setItem('myCollection', JSON.stringify(myCollection));
		});
	});
});