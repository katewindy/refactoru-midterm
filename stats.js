$(document).on('ready', function() {
	// load collection array from local storage
  	var tableData = JSON.parse(localStorage.getItem('myCollection'));
  	// check to see if collection array is empty; if so, then append text indicating there are no games in the collection to have stats for.
  	if (tableData===null){
  		var totalgames = '0';
  		var looseval = '$0.00';
  		var cibval = '$0.00';
  		var looseavgval = '$0.00';
  		var	commongenre = 'None';
  		var commonconsole = 'None';
  		$('.totalgames').text(totalgames);
  		$('.looseval').text(looseval);
  		$('.cibval').text(cibval);
  		$('.looseavgval').text(looseavgval);
  		$('.commongenre').text(commongenre);
		$('.commonconsole').text(commonconsole);
  	}
  	// if there's stuff in the array, put the proper values in their proper places
  	else {
  		$('.totalgames').text(tableData.length);
		var looseval = '$' + ttlValLoose(tableData);
		$('.looseval').text(looseval);
		var cibval = '$' + ttlValCIB(tableData);
		$('.cibval').text(cibval);
		var looseavgval = '$' + avgLooseVal(tableData);
		$('.looseavgval').text(looseavgval);
		var commongenre = commonGenre(tableData);
		$('.commongenre').text(commongenre);
		var commonconsole = commonConsole(tableData);
		$('.commonconsole').text(commonconsole);
	};	
	
	
});

function ttlValLoose (tableData) {
	var collectionData = tableData;
	var total = 0;
	for (var i = 0; i < collectionData.length; i++){
		total = total + Number(collectionData[i].looseprice);
	}
	total = total.toFixed(2);
	return total;
}

function ttlValCIB (tableData) {
	var collectionData = tableData;
	var total = 0;
	for (var i = 0; i < collectionData.length; i++){
		total = total + Number(collectionData[i].cibprice);
	}
	total = total.toFixed(2);
	return total;
}

function avgLooseVal (tableData) {
	var collectionData = tableData;
	var total = 0;
	for (var i = 0; i < collectionData.length; i++){
		total = total + Number(collectionData[i].looseprice);
	}
	total = total / collectionData.length;
	total = total.toFixed(2);
	return total;
}

function commonGenre (tableData) {
	var collectionData = tableData;
	var consoleNameArray = []
	for (var i = 0; i < collectionData.length; i++){
		consoleNameArray.push(collectionData[i].genre);
	};
	
	collectionData = consoleNameArray;
	var commongenre = mode(collectionData);
	return commongenre;
}

function commonConsole (tableData) {
	var collectionData = tableData;
	var consoleNameArray = []
	for (var i = 0; i < collectionData.length; i++){
		consoleNameArray.push(collectionData[i].consolename);
	};
	
	collectionData = consoleNameArray;
	var commonconsole = mode(collectionData);
	return commonconsole;
	
}

function mode(array)
{
    if(array.length == 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}

var ChartDataConstructor = function (value, color, highlight, label){
	this.value = value;
	this.color = color;
	this.highlight = highlight;
	this.label = label;
}

function chartDataFormatter (tableData) {
	var collectionData = tableData;
	var genrearray = [];
	for (var i = 0; i < collectionData.length; i++){
		genrearray.push(collectionData[i].genre);
	}
	console.log(genrearray);

	var numGenres = _.uniq(genrearray);
	console.log(numGenres.length);

}












