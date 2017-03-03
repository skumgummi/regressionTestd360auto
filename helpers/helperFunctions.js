module.exports = {
  foo: 'bar',
  doSomething: function () {
    return 1+1;
  },

  //scrolls to element, taking into account the header height so it's not covered by the header
  scrollElementToBeClickable: function (element){

		var scrollTarget = 0;
		var headerHeight = 125;

		var elementPosition = element.getLocation().then(function (location) {

	    	scrollTarget = location.y-headerHeight;
	    	
	    	if(scrollTarget < 0) {
	    		console.log('scroll target of '+scrollTarget+' changed to 0');
	    		scrollTarget = 0;
	    	}

		    browser.executeScript('window.scrollTo(0,'+scrollTarget+');');
	    });
	},

	//returns a random number between the values given to the function
	getRandomNum: function (min, max){
	    return parseInt(Math.random() * (max - min) + min);
	},

	//returns a random string of a length (int) given to the function
	getRandomString: function (length) {
		var string = '';
		var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖÆØabcdefghijklmnopqrstuvwxyzåäöæø' //Include numbers if you want
		for (i = 0; i < length; i++) {
			string += letters.charAt(Math.floor(Math.random() * letters.length));
		}
		return string;
	},

  /*
  getRandomAirportScandinavia: function(){
    var airportArray = ["ARN", "OSL", "CPH"];
    var airport = "";
    var airport = airportArray[parseInt(Math.random() * (2 - 0) + 0)];
    return airport;
  },

  getRandomAirportEU: function(){
    var airportArray = ["VIE", "BRU", "HEL", "KEF", "CDG", "TXL", "FRA", "HAM", "DUB", "AMS", "WAW", "GVA", "LHR", "ABZ"];
    var airport = "";
    var airport = airportArray[parseInt(Math.random() * (13 - 0) + 0)];
    return airport;
  },

  getRandomAirportOther: function(){
    var airportArray = ["EWR", "BOS", "IAD", "MIA", "ORD", "LAX", "SFO", "PEK", "HKG", "PVG", "NRT"];
    var airport = "";
    var airport = airportArray[parseInt(Math.random() * (10 - 0) + 0)];
    return airport;
  }
  */
  getRandomAirportScandinavia: function(){
    var airportArray = ["ARN", "OSL", "CPH"];
    return airportArray[Math.floor(Math.random() * airportArray.length)];
  },

  getRandomAirportEU: function(){
    var airportArray = ["VIE", "BRU", "HEL", "KEF", "CDG", "TXL", "FRA", "HAM", "DUB", "AMS", "WAW", "GVA", "LHR", "ABZ"];
    return airportArray[Math.floor(Math.random() * airportArray.length)];
  },

  getRandomAirportOther: function(){
    var airportArray = ["EWR", "BOS", "IAD", "MIA", "ORD", "LAX", "SFO", "PEK", "HKG", "PVG", "NRT"];
    return airportArray[Math.floor(Math.random() * airportArray.length)];
  }
};
