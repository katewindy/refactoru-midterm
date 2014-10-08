$(document).on('ready', function() {
	// load collection array from local storage
  	var tableData = JSON.parse(localStorage.getItem('myCollection'));
  	// check to see if collection array is empty; if so, then append one row stating there are no games in the collection
  	if (tableData===null){
  		var newrow = '<tr><td>No Games To Display</td><td class="consolename">None</td><td class=genre>None</td><td class="loose">$0.00</td><td class="cib">$0.00</td></tr>';
  		$('.tablebody').append(newrow);
  	}
  	else {
  	// inject html into the dom to create the table rows
	createBrowseTableRows(tableData);
	};	
	// set up the table in the DOM using the DataTables plugin
	$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
	});
	
	$(document).on('click', '.gametitle', function(){
		// create the collection array within this function
		var myCollection = createCollectionArray();
		//assign the clicked on game title to a variable
		var collectionItem = $(this).text();
		console.log(collectionItem);
		// assign the console that the clicked on game is associated with to a variable
		var itemConsole = $(this)
			.closest('td')
			.nextAll('.consolename')
			.text();
		console.log(itemConsole);
		// assign the HTML elements of the row to be deleted to a variable
		var row = $(this)
			.closest('tr');
		console.log(row);
		// create popup to confirm deletion of game
		swal({
			title: 'Delete' + collectionItem + '?',
			text: 'Delete this game from your collection?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Get rid of it!'
		});
		
		// delete the clicked on game from both the DOM and the user's collection array
		$(document).on('click', '.confirm', function (){
			console.log(myCollection);
			// search array loop
			for (var i = 0; i < myCollection.length; i++){
				console.log(myCollection[i]);
				// check whether both name of game and console of game match (since the same game can be on more than one console)
				if (myCollection[i].productname === collectionItem && myCollection[i].consolename === itemConsole){
					// if yes, then remove the row from the DOM and also the corresponding game object from the collection array
					row.remove();
					myCollection.splice(i, 1);
					// save the resulting array in local storage
					localStorage.setItem('myCollection', JSON.stringify(myCollection));
				}
			};
		});
			
		
			
	});
});



