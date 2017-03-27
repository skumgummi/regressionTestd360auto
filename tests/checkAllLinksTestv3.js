describe('testing all links on a given page', function(){

	var homePage = require('../pages/home_page.js');
	var pagesToCheck = new Array();
	
	beforeAll(function(){
		console.log("before all running!");
		browser.get('https://d360u.flysas.com/se-en');
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 250000;
		browser.waitForAngular();
	});

	afterAll(function() {
	  browser.driver.manage().deleteAllCookies();
	  browser.executeScript('window.sessionStorage.clear();');
	  browser.executeScript('window.localStorage.clear();');
	});
	clickHamburger = function(){
    	homePage.hamburgerMenu.click();
  	}
  	it('open hamburger menu and collect all links', function(){
  		clickHamburger();

		$$('a').map(function(link) {
		    return link.getAttribute("href");
		}).then(function(links) {
			
			//this should clear the list of links and enter this single link, to verify that error handling works
			//links = ['https://d360u.flysas.com/en/foo/'];
			//urlsToCheck = ['https://d360u.flysas.com/en/foo/'];
		    links.forEach(function(link) {
		    	//console.log('THIS IS DONE!')
				


				let url = link;
		        //link.getAttribute("href").then(function (href) {
		        if(url !== null && url !== undefined){
			        if(url.includes('d360u' || 'sas.se' || 'sas.no' || 'sas.dk' || 'flysas.com')){
			        	console.log('Found a relevant link!');
			        	pagesToCheck.indexOf(url) === -1 ? pagesToCheck.push(url) : console.log("This item already exists");
			        }
		       	}
		    });
		});


	});
  	it ('log stuff', function(){
  		console.log(pagesToCheck.length);
  		
  	});

	//this is all from another spec. Change variables to work with this spec!
	//for (var i = 0; i < pagesToCheck.length; i++) {
	pagesToCheck.forEach(function(link){


  		let toCheck = link;

  		it ('go to page to test', function(){
	  		//browser.get('https://d360u.flysas.com/en/profile/attach-travel-pass/#/booking');
	  		//browser.get('https://d360u.flysas.com/se-en/404');
	  		//browser.get('https://weather.com/');
	  		//browser.get('https://www.sas.se/profil/attach-travel-pass/#/booking');
	  		browser.get(toCheck);
	  		browser.getCurrentUrl().then(function(currentUrl) {
				url = currentUrl;
			});
	  	});

	  	it('checking for 404 on page', function(){
	  		var errorElement = element(by.css('div.errorNo')).element(by.xpath("./span"));
			var errorPresence = false;
			var errorReport = '';


			browser.isElementPresent(errorElement).then(function(presence){
				if(presence){
					errorPresence = true;
				}
			}).then(function(){
				if(errorPresence){
					errorElement.getText().then(function(text){
						console.log(text+ ' <------------');
						if(text === '404'){
							errorReport = '404 error identified on '+url;
							//maybe call a function to send the URL error to a specific place in a google sheet or such
						} else {
							errorReport = 'Unexpected error. Attempting to print error code here --> '+errorElement.textContent+' <--- Error occurred on '+url;
							//maybe call a function to send the URL error to a specific place in a google sheet or such
						}

					});

				} else {
					errorReport = 'No error found on '+url;
				}
			});

			expect(url.includes('/Errors/')).toBe(false, 'URL contains "/Errors/". Full url is: '+url+' ... Error occurred when trying to reach '+ toCheck);
			expect(url.includes('/Error/')).toBe(false, 'URL contains "/Error/". Full url is: '+url+' ... Error occurred when trying to reach '+ toCheck);

			browser.isElementPresent(errorElement).then(function(presence){
				expect(presence).toBe(false, errorReport);
				
			});
		});
	});
	//}
});
