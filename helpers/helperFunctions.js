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
	}
};
