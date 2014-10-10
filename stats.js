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
	}	
	
	//draw some fucking charts
	var genreChartData = genreDataFormatter(tableData);
	var consoleChartData = consoleDataFormatter(tableData);
	var ctx = document.getElementById('consoleChart').getContext('2d');
	var myConsoleChart = new Chart(ctx).Pie(consoleChartData);
	
	var ctx = document.getElementById('genreChart').getContext('2d');
	var myGenreChart = new Chart(ctx).Pie(genreChartData);
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
	var consoleNameArray = [];
	for (var i = 0; i < collectionData.length; i++){
		consoleNameArray.push(collectionData[i].genre);
	}
	
	collectionData = consoleNameArray;
	var commongenre = mode(collectionData);
	return commongenre;
}

function commonConsole (tableData) {
	var collectionData = tableData;
	var consoleNameArray = [];
	for (var i = 0; i < collectionData.length; i++){
		consoleNameArray.push(collectionData[i].consolename);
	}
	
	collectionData = consoleNameArray;
	var commonconsole = mode(collectionData);
	return commonconsole;
	
}

function mode(array)
{
    if (array.length == 0)
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
};


function genreDataFormatter (tableData) {
	var collectionData = tableData;
	var genrearray = [];
	var counts = {};
	var chartData = [];
	console.log(collectionData);
	if (collectionData===null) {
		var nodata = new ChartDataConstructor('1', '#FF0000', '#FF0000', 'None');
		chartData.push(nodata);
	}
	else {
		for (var i = 0; i < collectionData.length; i++){
			genrearray.push(collectionData[i].genre);
			}
		genrearray = _.uniq(genrearray);
		for (var i = 0; i < collectionData.length; i++){
			var num = collectionData[i].genre;
			counts[num] = counts[num] ? counts[num]+1 : 1;
		}
		console.log(counts);
	
		var chartcolor = chartColors(genrearray.length);

		for (var i = 0; i< genrearray.length; i++){
			var value = genrearray[i];
			var thisObject = new ChartDataConstructor(counts[value], chartcolor[i], chartcolor[i], genrearray[i]);
			chartData.push(thisObject);
			console.log(thisObject);
		}
		console.log(chartData);
	}	
	return chartData;
}

function consoleDataFormatter (tableData) {
	var collectionData = tableData;
	var consolearray = [];
	var counts = {};
	var chartData = [];
	if (collectionData===null) {
		var nodata = new ChartDataConstructor('1', '#FF0000', '#FF0000', 'None');
		chartData.push(nodata);
	}
	else {
		for (var i = 0; i < collectionData.length; i++){
			consolearray.push(collectionData[i].consolename);
		}
		
		consolearray = _.uniq(consolearray);
		for (var i = 0; i < collectionData.length; i++){
			var num = collectionData[i].consolename;
			counts[num] = counts[num] ? counts[num]+1 : 1;
		}
		console.log(counts);
		var chartcolor = chartColors(consolearray.length);

		for (var i = 0; i< consolearray.length; i++){
			var value = consolearray[i];
			var thisObject = new ChartDataConstructor(counts[value], chartcolor[i], chartcolor[i], consolearray[i]);
			chartData.push(thisObject);
			console.log(thisObject);
		}
	}	
	console.log(chartData);
	return chartData;
}

function chartColors (length) {
	var arrayLength = length;
	var colorArray = ['#FF0000', '#009999', '#FF7400', '#00CC00', '#9B0000', '#005D5D', '#9B4600', '#007C00', '#FF601D', '#FFA01D', '#1E6DAF', '#15B776', '#E41a5E', '#FF571D', '#15BB6B', '#7FE81A', '#FFD71D', '#7C1DB4', '#FFFE1D', '#4828B9', '#2457B3', '#DB1971'];
	var myColors = colorArray.slice(0, length);
	return myColors;
}

// function genres () {
// 	var genres = ["Other", "Action & Adventure", "Puzzle", "Strategy", "Fighting", "Racing", "RPG", "FPS", "Extreme Sports", "Accessories", "Sports", "Basketball", "Football", "Baseball", "Party"];
// 	return genres;
// }

// function consoles() {
// 	var consoles = ["Sega Dreamcast", "Playstation", "Playstation 2", "Playstation 3", "NES", "Super Nintendo", "Nintendo 64", "Gamecube", "Wii"];
// 	return consoles;
// }







