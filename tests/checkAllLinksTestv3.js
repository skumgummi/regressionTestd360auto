describe('testing all links on a given page', function(){

	var homePage = require('../pages/home_page.js');
	var helperFunctions = require('../helpers/helperFunctions.js');
	var pagesToCheck = new Array();
	var extraPages = new Array();
	var tempArray = new Array();
	var failedPages404 = new Array();
	var EC = protractor.ExpectedConditions;

	//when this is true, time to complete the test is multiplied drastically! On every page it will look for new links not already in the array
	var checkLinksOnLinkedPages = false;
	var errorElement;
	var errorPresence;
	var errorReport;
	clickHamburger = function(){
    	homePage.hamburgerMenu.click();
  	}
	
	beforeAll(function(){
		console.log("before all running!");
		browser.get('https://d360u.flysas.com/se-en');
		//one hours timeout, because this test can take a LONG time
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 3600000;
		browser.waitForAngular();
		pagesToCheck = ['https://d360u.flysas.com/en/foo/'];
		
	});

	afterAll(function() {
	  browser.driver.manage().deleteAllCookies();
	  browser.executeScript('window.sessionStorage.clear();');
	  browser.executeScript('window.localStorage.clear();');
	});

	
  	
  	
	
    it ('Click hamburger menu and collect all links on page', function(){
      	clickHamburger();
      	//this should send the array of currently known pages to check, and update it with new pages if any are found
      	tempArray = pagesToCheck;

      	pagesToCheck = helperFunctions.collectAllLinksOnPage(tempArray);


      	/*$$('a').map(function(link) {
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
		});*/
    });

    it ('Check all links for 404 errors', function(){
      	//this is all from another spec. Change variables to work with this spec!
		//for (var i = 0; i < pagesToCheck.length; i++) {
		pagesToCheck.forEach(function(link){


	  		let toCheck = link;

	  		//browser.get('https://d360u.flysas.com/en/profile/attach-travel-pass/#/booking');
	  		//browser.get('https://d360u.flysas.com/se-en/404');
	  		//browser.get('https://weather.com/');
	  		//browser.get('https://www.sas.se/profil/attach-travel-pass/#/booking');
	  		browser.get(toCheck);

	  		let currUrl;
	  		browser.getCurrentUrl().then(function(currentUrl) {
				currUrl = currentUrl;
			}).then(function(){
				errorElement = element(by.css('div.errorNo')).element(by.xpath("./span"));
			}).then(function(){
				//console.log(errorElement);
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
								errorReport = '404 error identified on '+currUrl;
								failedPages404.push(toCheck);
								//maybe call a function to send the URL error to a specific place in a google sheet or such
							} else {
								errorReport = 'Unexpected error. Attempting to print error code here --> '+errorElement.textContent+' <--- Error occurred on '+currUrl;
								//maybe call a function to send the URL error to a specific place in a google sheet or such
							}

						});

					} else {
						errorReport = 'No error found on '+currUrl;
					}
				});
				browser.getCurrentUrl().then(function(currentUrl) {
					expect(currentUrl.includes('/Errors/')).toBe(false, 'URL contains "/Errors/". Full url is: '+currentUrl+' ... Error occurred when trying to reach '+ toCheck);
					expect(currentUrl.includes('/Error/')).toBe(false, 'URL contains "/Error/". Full url is: '+currentUrl+' ... Error occurred when trying to reach '+ toCheck);
				});
				

				browser.isElementPresent(errorElement).then(function(presence){
					expect(presence).toBe(false, errorReport);
					if(!presence && checkLinksOnLinkedPages){
						tempArray = pagesToCheck;
						//extraPages will included all previous pages, and any new that is found
      					extraPages = helperFunctions.collectAllLinksOnPage(tempArray);
					}
				});
			});
		});
    });

	it ('Check all new links for 404 errors', function(){
		if(checkLinksOnLinkedPages) {
			//this is all from another spec. Change variables to work with this spec!
			//for (var i = 0; i < pagesToCheck.length; i++) {
			
			var diff = new Set([...extraPages].filter(x => !pagesToCheck.has(x)));

			diff.forEach(function(link){
				console.log('checking a new page!');

				let toCheck = link;

				//browser.get('https://d360u.flysas.com/en/profile/attach-travel-pass/#/booking');
				//browser.get('https://d360u.flysas.com/se-en/404');
				//browser.get('https://weather.com/');
				//browser.get('https://www.sas.se/profil/attach-travel-pass/#/booking');
				browser.get(toCheck);

				let currUrl;
				browser.getCurrentUrl().then(function(currentUrl) {
					currUrl = currentUrl;
				}).then(function(){
					errorElement = element(by.css('div.errorNo')).element(by.xpath("./span"));
				}).then(function(){
					//console.log(errorElement);
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
									errorReport = '404 error identified on '+currUrl;
									//maybe call a function to send the URL error to a specific place in a google sheet or such
								} else {
									errorReport = 'Unexpected error. Attempting to print error code here --> '+errorElement.textContent+' <--- Error occurred on '+currUrl;
									//maybe call a function to send the URL error to a specific place in a google sheet or such
								}

							});

						} else {
							errorReport = 'No error found on '+currUrl;
						}
					});
					browser.getCurrentUrl().then(function(currentUrl) {
						expect(currentUrl.includes('/Errors/')).toBe(false, 'URL contains "/Errors/". Full url is: '+currentUrl+' ... Error occurred when trying to reach '+ toCheck);
						expect(currentUrl.includes('/Error/')).toBe(false, 'URL contains "/Error/". Full url is: '+currentUrl+' ... Error occurred when trying to reach '+ toCheck);
					});
					

					browser.isElementPresent(errorElement).then(function(presence){
						expect(presence).toBe(false, errorReport);
						if(!presence && checkLinksOnLinkedPages){
							tempArray = pagesToCheck;
							pagesToCheck = helperFunctions.collectAllLinksOnPage(tempArray);
						}
					});
				});
			});
		}
    });

    it ('Checking pages that contained 404 error', function(){
    	console.log(failedPages404)
    	expect(failedPages404.length).toEqual(0, 'There were errors found! These are the pages with 404 errors: '+failedPages404)
    });
});
