var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');

var count = 0;

module.exports = {
  foo: 'bar',
  doSomething: function () {
    return 1+1;
  },
  
  

  /******************************************
  * ATTENTION          						*
  * When using this function, make sure		*
  * whatever operation uses the output is 	*
  * synced with the control flow.			*
  *	This is a good practice in general.		*
  * 										*
  * So e.g. you can put your operation in 	*
  * a .then() function, even after doing 	*
  * a browser.getCurrentUrl() without using	*
  * the url for anything.					*
  *******************************************/
  getAvailableSeats : function () {
	var availableSeats = [];
	var seats = element.all(by.css('span[ng-click="data.selectGivenSeatForGivenPax(seat, $event);"]')).then(function(elm){
        for (var i = 0; i < elm.length; i++) {

          //let creates a local variable for each iteration of the for-loop.
          //This is required because the for-loop doesn't stop to wait for calls to the browser, like .getAttribute(), to finish
          let j = i;
          elm[j].getAttribute('class').then(function(clss){

            //for some planes, seats are labeled 'seatFree', and others 'seatChargeable'
            if(clss.includes('seatFree') || clss.includes('seatChargeable')){
              availableSeats.push(elm[j]);
            }
          });
        }
      });
      return availableSeats;
  },

  getNumberOfFlights : function () {
	var numFlights = [];
	var flights = element.all(by.css('a[data-toggle="tab"]')).then(function(elm){
    console.log("elm is: " + elm.length);
        for (var i = 0; i < elm.length; i++) {
          console.log("does this happen? " + i);
          let j = i;
          elm[j].getAttribute('class').then(function(clss){
            if(clss.includes('btn btn-tabs')){
              numFlights.push(elm[j]);
            }
          });
        }
      });
      return numFlights;
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
			dobAdult: '19500101',
			//dobYouth behövs inte eftersom man måste vara inloggad för att köpa ungdomsbiljett
			dobChild:'20150101',
			dobInfant: '20170101'
		}
		//shorter strings, because long strings makes the testing slower
		//eventually, using an array with names will probably be better
		flyer.firstName = this.getRandomString(this.getRandomNum(2,10));
		flyer.lastName = this.getRandomString(this.getRandomNum(2,10));
		//flyer.firstName = this.getRandomString(this.getRandomNum(2,32));
		//flyer.lastName = this.getRandomString(this.getRandomNum(2,40));

		var rand = this.getRandomNum(1,3);
    console.log(rand+'<--------------- This is the female/male rand number!');
		if (rand === 1) {
			flyer.gender = 'male';
		}
		flyer.email =  'testskapp@gmail.com';
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
	    		//console.log('scroll target of '+scrollTarget+' changed to 0');
	    		scrollTarget = 0;
	    	}

		    browser.executeScript('window.scrollTo(0,'+scrollTarget+');');
	    });
	},
	scrollElementUpWithOffset: function (element, i){

		var scrollTarget = 0;
		var headerHeight = i;

		var elementPosition = element.getLocation().then(function (location) {

	    	scrollTarget = location.y-headerHeight;

	    	if(scrollTarget < 0) {
	    		console.log('scroll target of '+scrollTarget+' changed to 0');
	    		scrollTarget = 0;
	    	}

		    browser.executeScript('window.scrollTo(0,'+scrollTarget+');');
	    });
	},

  collectAllLinksOnPage: function (array) {
    var pagesToCheck = array;
    $$('a').map(function(link) {
        return link.getAttribute("href");
    }).then(function(links) {
      
      //this should clear the list of links and enter this single link, to verify that error handling works
      //links = ['https://d360u.flysas.com/en/foo/'];
      //urlsToCheck = ['https://d360u.flysas.com/en/foo/'];
        links.forEach(function(link) {
        
        let url = link;
            if(url !== null && url !== undefined){
              if(url.includes('d360u' || 'sas.se' || 'sas.no' || 'sas.dk' || 'flysas.com')){
                console.log('Found a relevant link!');
                pagesToCheck.indexOf(url) === -1 ? pagesToCheck.push(url) : console.log("This item already exists");
              }
            }
        });
    });
    return pagesToCheck;
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
    var airportArray = ["VIE", "BRU", "HEL", "KEF", "CDG", "TXL", "FRA", "HAM", "DUB", "AMS", "WAW", "GVA", "LHR", "LPA", "ATH", "MLA", "TOS", "MUC"];
    return airportArray[Math.floor(Math.random() * airportArray.length)];
  },

  getRandomAirportOther: function(){
    var airportArray = ["EWR", "BOS", "IAD", "MIA", "ORD", "LAX", "SFO", "PEK", "HKG", "PVG", "NRT"];
    return airportArray[Math.floor(Math.random() * airportArray.length)];
  },

  //returns an object containing locators to elements for input fields for
  //passengers, such as firstName, gender etc
  //depending on the integer (i) provided, it gets the elements for a certain
  //passenger
  getFlyerInputsObj: function (i) {
    var inputObj = {
    	firstName: 'test',
    	lastName: 'test',
    	gender: 'test',
    	genderDropDownMale: 'test',
    	genderDropDownFemale: 'test',
    	dob: 'test',
    	email: 'test',
    	phone: 'test',
	}
	if(i == 0){
    console.log('firstName0 etc');
		inputObj.firstName = passengerPage.firstName0;
    	inputObj.lastName = passengerPage.lastName0;
    	inputObj.gender = passengerPage.gender0;
    	inputObj.genderDropDownMale = passengerPage.gender0DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender0DropDownFemale;
    	inputObj.dob = passengerPage.dob0;
    	inputObj.email = passengerPage.email0;
    	inputObj.phone = passengerPage.phone0;
	} else if(i == 1) {
    console.log('firstName1 etc');
		inputObj.firstName = passengerPage.firstName1;
    	inputObj.lastName = passengerPage.lastName1;
    	inputObj.gender = passengerPage.gender1;
    	inputObj.genderDropDownMale = passengerPage.gender1DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender1DropDownFemale;
    	inputObj.dob = passengerPage.dob1;
    	inputObj.email = passengerPage.email1;
    	inputObj.phone = passengerPage.phone1;
	} else if (i == 2) {
    console.log('firstName2 etc');
		inputObj.firstName = passengerPage.firstName2;
    	inputObj.lastName = passengerPage.lastName2;
    	inputObj.gender = passengerPage.gender2;
    	inputObj.genderDropDownMale = passengerPage.gender2DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender2DropDownFemale;
    	inputObj.dob = passengerPage.dob2;
    	inputObj.email = passengerPage.email2;
    	inputObj.phone = passengerPage.phone2;
	} else if (i == 3) {
    console.log('firstName3 etc');
		inputObj.firstName = passengerPage.firstName3;
    	inputObj.lastName = passengerPage.lastName3;
    	inputObj.gender = passengerPage.gender3;
    	inputObj.genderDropDownMale = passengerPage.gender3DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender3DropDownFemale;
    	inputObj.dob = passengerPage.dob3;
    	inputObj.email = passengerPage.email3;
    	inputObj.phone = passengerPage.phone3;
	} else if (i == 4) {
    console.log('firstName4 etc');
		inputObj.firstName = passengerPage.firstName4;
    	inputObj.lastName = passengerPage.lastName4;
    	inputObj.gender = passengerPage.gender4;
    	inputObj.genderDropDownMale = passengerPage.gender4DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender4DropDownFemale;
    	inputObj.dob = passengerPage.dob4;
    	inputObj.email = passengerPage.email4;
    	inputObj.phone = passengerPage.phone4;
	} else if (i == 5) {
    console.log('firstName5 etc');
		inputObj.firstName = passengerPage.firstName5;
    	inputObj.lastName = passengerPage.lastName5;
    	inputObj.gender = passengerPage.gender5;
    	inputObj.genderDropDownMale = passengerPage.gender5DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender5DropDownFemale;
    	inputObj.dob = passengerPage.dob5;
    	inputObj.email = passengerPage.email5;
    	inputObj.phone = passengerPage.phone5;
	} else if (i == 6) {
    console.log('firstName6 etc');
		inputObj.firstName = passengerPage.firstName6;
    	inputObj.lastName = passengerPage.lastName6;
    	inputObj.gender = passengerPage.gender6;
    	inputObj.genderDropDownMale = passengerPage.gender6DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender6DropDownFemale;
    	inputObj.dob = passengerPage.dob6;
    	inputObj.email = passengerPage.email6;
    	inputObj.phone = passengerPage.phone6;
	} else if (i == 7) {
    console.log('firstName7 etc');
		inputObj.firstName = passengerPage.firstName7;
    	inputObj.lastName = passengerPage.lastName7;
    	inputObj.gender = passengerPage.gender7;
    	inputObj.genderDropDownMale = passengerPage.gender7DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender7DropDownFemale;
    	inputObj.dob = passengerPage.dob7;
    	inputObj.email = passengerPage.email7;
    	inputObj.phone = passengerPage.phone7;
	} else if (i == 8) {
    console.log('firstName8 etc');
		inputObj.firstName = passengerPage.firstName8;
    	inputObj.lastName = passengerPage.lastName8;
    	inputObj.gender = passengerPage.gender8;
    	inputObj.genderDropDownMale = passengerPage.gender8DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender8DropDownFemale;
    	inputObj.dob = passengerPage.dob8;
    	inputObj.email = passengerPage.email8;
    	inputObj.phone = passengerPage.phone8;
	} else if (i == 9) {
    console.log('firstName9 etc');
		inputObj.firstName = passengerPage.firstName9;
    	inputObj.lastName = passengerPage.lastName9;
    	inputObj.gender = passengerPage.gender9;
    	inputObj.genderDropDownMale = passengerPage.gender9DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender9DropDownFemale;
    	inputObj.dob = passengerPage.dob9;
    	inputObj.email = passengerPage.email9;
    	inputObj.phone = passengerPage.phone9;
	} else if (i == 10) {
    console.log('firstName10 etc');
		inputObj.firstName = passengerPage.firstName10;
    	inputObj.lastName = passengerPage.lastName10;
    	inputObj.gender = passengerPage.gender10;
    	inputObj.genderDropDownMale = passengerPage.gender10DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender10DropDownFemale;
    	inputObj.dob = passengerPage.dob10;
    	inputObj.email = passengerPage.email10;
    	inputObj.phone = passengerPage.phone10;
	} else if (i == 11) {
    console.log('firstName11 etc');
		inputObj.firstName = passengerPage.firstName11;
    	inputObj.lastName = passengerPage.lastName11;
    	inputObj.gender = passengerPage.gender11;
    	inputObj.genderDropDownMale = passengerPage.gender11DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender11DropDownFemale;
    	inputObj.dob = passengerPage.dob11;
    	inputObj.email = passengerPage.email11;
    	inputObj.phone = passengerPage.phone11;
	} else if (i == 12) {
    console.log('firstName12 etc');
		inputObj.firstName = passengerPage.firstName12;
    	inputObj.lastName = passengerPage.lastName12;
    	inputObj.gender = passengerPage.gender12;
    	inputObj.genderDropDownMale = passengerPage.gender12DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender12DropDownFemale;
    	inputObj.dob = passengerPage.dob12;
    	inputObj.email = passengerPage.email12;
    	inputObj.phone = passengerPage.phone12;
	} else if (i == 13) {
    console.log('firstName13 etc');
		inputObj.firstName = passengerPage.firstName13;
    	inputObj.lastName = passengerPage.lastName13;
    	inputObj.gender = passengerPage.gender13;
    	inputObj.genderDropDownMale = passengerPage.gender13DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender13DropDownFemale;
    	inputObj.dob = passengerPage.dob13;
    	inputObj.email = passengerPage.email13;
    	inputObj.phone = passengerPage.phone13;
	} else if (i == 14) {
    console.log('firstName14 etc');
		inputObj.firstName = passengerPage.firstName14;
    	inputObj.lastName = passengerPage.lastName14;
    	inputObj.gender = passengerPage.gender14;
    	inputObj.genderDropDownMale = passengerPage.gender14DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender14DropDownFemale;
    	inputObj.dob = passengerPage.dob14;
    	inputObj.email = passengerPage.email14;
    	inputObj.phone = passengerPage.phone14;
	} else if (i == 15) {
    console.log('firstName15 etc');
		inputObj.firstName = passengerPage.firstName15;
    	inputObj.lastName = passengerPage.lastName15;
    	inputObj.gender = passengerPage.gender15;
    	inputObj.genderDropDownMale = passengerPage.gender15DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender15DropDownFemale;
    	inputObj.dob = passengerPage.dob15;
    	inputObj.email = passengerPage.email15;
    	inputObj.phone = passengerPage.phone15;
	} else if (i == 16) {
    console.log('firstName16 etc');
		inputObj.firstName = passengerPage.firstName16;
    	inputObj.lastName = passengerPage.lastName16;
    	inputObj.gender = passengerPage.gender16;
    	inputObj.genderDropDownMale = passengerPage.gender16DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender16DropDownFemale;
    	inputObj.dob = passengerPage.dob16;
    	inputObj.email = passengerPage.email16;
    	inputObj.phone = passengerPage.phone16;
	} else if (i == 17) {
    console.log('firstName17 etc');
		inputObj.firstName = passengerPage.firstName17;
    	inputObj.lastName = passengerPage.lastName17;
    	inputObj.gender = passengerPage.gender17;
    	inputObj.genderDropDownMale = passengerPage.gender17DropDownMale;
    	inputObj.genderDropDownFemale = passengerPage.gender17DropDownFemale;
    	inputObj.dob = passengerPage.dob17;
    	inputObj.email = passengerPage.email17;
    	inputObj.phone = passengerPage.phone17;
	}
    return inputObj;
  },

  getTomorrow : function(){
    var date = new Date();
    var tomorrow = date.getDate()+1;
    return tomorrow.toString();
  },

  testCounter : function(){
    console.log(" ");
    console.log('Test number: ' + count);
    count++;
  },

  selectSeats: function (numberOfFlights, seatsRequired) {
    for (var i = 0; i < numberOfFlights.length; i++) {
      let j = i;
      numberOfFlights[j].click();
      let avSeats = this.getAvailableSeats();
      //if(seatsRequired <= avSeats.length){
        browser.waitForAngular().then(function(){
          for(var k = 1; k<=seatsRequired; k++){
            let current = element(by.xpath('//*[@id="segment-container"]/div[4]/div['+k+']'));
            current.click();
            avSeats[k-1].click();
          } 
        });
      //}
      
    }
    ancillariesPage.seatAddToBooking.click();
  }

};
