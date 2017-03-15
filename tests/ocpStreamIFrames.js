describe('Checking iFrame for 404 or showing as if not logged in', function(){

	var homePage = require('../pages/home_page.js');
	var profilePage = require('../pages/profile_page.js');
	var loginFailed = false;
	var fail404 = false;
	var pagesToCheck = ['https://www.sas.se/profil/retroregistrering/','https://www.sas.se/profil/ge-bort-kort/','https://www.sas.se/profil/order-new-card/',
						'https://www.sas.se/profil/upgrade-on-star/', 'https://www.sas.se/profil/travel-cash/',
						'https://www.sas.se/profil/attach-travel-pass/', 'https://www.sas.se/profil/attach-eurobonus/'];

	//pagesToCheck = ['https://www.sas.se/profil/retroregistrering/','https://www.sas.se/profil/ge-bort-kort/'];

	var url = '';
	var ignoreWarnings = false;
	// eurobonus links not just to pages with iframes with classic sas contents, but also links directly to it sometimes.
	//here are those links, if ever relevant:
	//'https://points.flysas.com/', 'http://classic.sas.se/?cep=240462', 'https://classic.sas.se/misc/boka-hotell000/searchawardhotel/?d360=true'

	//d360u login
	//var username = "Ebbeta11";
	//var password = "Nov@25";
	//var newPassword = "banan123";

	//sas.se login
	var username = "iframetest@sas.se";
	var password = "pass123";

	//sas.no login
	//var username = "sasnotest@testemail.com";
	//var password = "123abc";


	beforeAll(function(){
		console.log("before all running!");

		browser.get('https://sas.se');
		//browser.get('https://d360u.flysas.com/se-en');
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 250000;
		browser.ignoreSynchronization=true;
		browser.waitForAngular();
	});

	afterAll(function() {
	  browser.driver.manage().deleteAllCookies();
	  browser.executeScript('window.sessionStorage.clear();');
	  browser.executeScript('window.localStorage.clear();');
	});

  	it ('log in', function(){
		homePage.loginLink.click();
		homePage.emailField.click();
		homePage.emailField.sendKeys(username);
		homePage.passwordField.click();
		homePage.passwordField.sendKeys(password);
		homePage.loginButton.click();
		browser.waitForAngular();

		browser.isElementPresent(element(by.id('loginApiErr'))).then(function(pres){
			expect(pres).toBe(false,'User login details not accepted! Remainder of this test skipped. Try again with new login details!');
			if (pres){
				loginFailed = true;
			}
		});
  	});

  	if (loginFailed){
	  	for (var i = 0; i < pagesToCheck.length; i++) {
	  		let toCheck = pagesToCheck[i];

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
					fail404 = presence;
				});


			});


			it ('checking if iFrame is correct', function(){

		  		if(!fail404){

			  		var errMsg;
					iframe = element(by.css('iframe[allowfullscreen=""]'));
					var url;
			  		browser.getCurrentUrl().then(function(currentUrl) {
						url = currentUrl;
					});

					browser.isElementPresent(iframe).then(function(presence){
			  			if(presence){
			  				console.log('iframe presence ----> '+presence);

			  				//browser.driver.switchTo().frame(browser.driver.findElement(protractor.By.css('iframe[allowfullscreen=""]')));
			  				browser.driver.switchTo().frame(iframe.getWebElement());



							browser.driver.findElement(protractor.By.xpath('/html')).then(function(htm){
								htm.getAttribute('xmlns').then(function(xml){
									if(xml != null){

										browser.driver.findElement(protractor.By.name('aspnetForm')).then(function(elm){

											if (elm == null || elm == 'undefined'){
												console.log('DEN ÄR NULL / UNDEFINED!' + elm)
											}
											elm.getAttribute('action').then(function(actn){
												console.log('This is null'+actn+'<---');
												action = actn;
											});
										}).then(function(){
											console.log(action);
											//if action (which is a url) contains "My_Profile_Container" then it means user not recognized as logged in.
											expect(action.includes('My_Profile_Container')).toBe(false, 'User not recognized as logged in. iframe aspnetForm leads to: '+action);
										});
									} else {
										var warning = 'test warning';
										if(!ignoreWarnings){
											expect(xml).not.toBe(null, 'WARNING: <html> attribute "xmlns" equals null. Possible scenario: user needs to be a higher eurobonus level to use feature. Or user failed to log in (check login step).')
										}
									}

								});

							});







			  			} else {

			  				errMsg = 'classic sas iFrame not found. Is this the page you are trying to test? '+url;
			  				console.log(errMsg);
			  				expect(presence).toBe(true,errMsg);
			  			}



			  		});
		  		}

	  		});
		}
	}
});
