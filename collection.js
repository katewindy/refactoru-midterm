$(document).on('ready', function() {
  var tableData = JSON.parse(localStorage.getItem('myCollection'));
  	if (tableData===null){
  		var newrow = '<tr><td>No Games To Display</td><td class="consolename">None</td><td class=genre>None</td><td class="loose">$0.00</td><td class="cib">$0.00</td></tr>';
  		$('.tablebody').append(newrow);
  	}
  	else {
	createBrowseTableRows(tableData);
	};	
	$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
	});
	// var myCollection = createCollectionArray();
	
	$(document).on('click', '.gametitle', function(){
		var myCollection = createCollectionArray();
		var collectionItem = $(this).text();
		swal({
			title: 'Delete' + collectionItem + '?',
			text: 'Delete this game from your collection?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Get rid of it!'
		});
		$(document).on('click', '.confirm', function (){
			console.log($(this));
			// for (var i = 0; i < myCollection.length; i++);
			// 	if (myCollection.productname === collectionItem){
					
			// 	}
		});
			
		
			
	});
});



function createCollectionArray(){
	var myCollection = JSON.parse(localStorage.getItem('myCollection'));
	console.log(myCollection);
	if (myCollection === null){
	 	myCollection = [];
	 	console.log('initialized new collection: ' + myCollection);
	};
	return myCollection;
}