$(document).on('ready', function() {
  var tableData = dataPrettier();
	createTableRows(tableData);
	$('#datatable').DataTable({
		"pageLength":20,
		"lengthChange": false
	});
});

function createTableRows (dataArray) {
	var tableData = dataArray;
	for (var i = 0; i < dataArray.length; i++){
		var currentRow = dataArray[i];
		var gameName = currentRow.productname;
		var consoleName = currentRow.consolename;
		var genre = currentRow.genre;
		var loose = currentRow.looseprice;
		var cib = currentRow.cibprice;
		var newrow = '<tr><td>'+gameName+'</td><td>'+consoleName+'</td><td>'+genre+'</td><td>$'+loose+'</td><td>$'+cib+'</td></tr>';

		$('.tablebody').append(newrow);
	};
};