module.exports = {
  foo: 'bar',
  doSomething: function () {
    return 1+1;
  },

  //returns a flyer object with some random values
  getFlyer : function () {
		var flyer = {
			firstName: '',
			middleName: '',
			lastName: '',
			gender: 'female',
			email: '',
			phone:'',
			countryCode: '',
			dobAdult: '1950-01-01',
			//dobYouth behövs inte eftersom man måste vara inloggad för att köpa ungdomsbiljett
			dobChild:'2015-01-01',
			dobInfant: '2017-03-03' 
		}
		flyer.firstName = this.getRandomString(this.getRandomNum(2,7));
		flyer.lastName = this.getRandomString(this.getRandomNum(2,40));
		
		var rand = this.getRandomNum(1,2);
		if (rand = 1) {
			flyer.gender = 'male';
		}
		flyer.email =  firstName+'.'+lastName+'@'+this.getRandomString(this.getRandomNum(2,5))+'mail.com';
		//flyer.email = 'rickard.sjogren@sogeti.se';
		//flyer.email = 'niklas.ekstrand@sogeti.se';
		flyer.phone = '70'+this.getRandomNum(1000000,9999999);
		flyer.countryCode = 46;
		
		return flyer;
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
