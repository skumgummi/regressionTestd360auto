describe('testing all links on a given page', function(){
	
	var homePage = require('../pages/home_page.js');
	

	beforeAll(function(){
		console.log("before all running!");
		browser.get('https://d360u.flysas.com/se-en');
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 250000;
		browser.waitForAngular();
	});
	clickHamburger = function(){
    	homePage.hamburgerMenu.click();
  	}
  	it('open hamburger menu and check all links', function(){
  		clickHamburger();

		/*var allLinks = browser.findElements(by.css('a')).then(function(links){

		});	*/	
		/*
		browser.findElements(by.css('a')).then(function(links){
			console.log('elements should be found now');
			//console.log(links);
			x = 0;
			links.forEach(function(link) {
				console.log('trying to open these links');
				if (x == 0){
					console.log(link);
					x++;
				}
		        link.getAttribute("href").then(function (href) {
		        	browser.get(href);
		        });
		        
		        //console.log(browser.getCurrentUrl());
		        expect(browser.getCurrentUrl()).not.toContain('/Error/');

		    });
		});*/
		

		
		$$('a').map(function(link) {
		    return link.getAttribute("href");/*.then(function (href) {
		    	//this replace function was used specifically for a certain user
		    	//I imagine it can be  entirely removed
		        return href.replace(/https\:\/\/app\.perflectie\.nl\//g, 'localhost');
		        //return href;
		    });*/
		}).then(function(links) {
		    links.forEach(function(link) {

		        console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL);
				var urls = new Array();
				

				var url = '';
				url += link;
		        //link.getAttribute("href").then(function (href) {
		        if(url.includes('d360u')){

		        	
		        	browser.get(link).then(function(){
					console.log('****************');
					console.log("This link will be checked");
					console.log(link+" <---------------------");
					console.log('****************');
		        	expect(browser.getCurrentUrl()).not.toContain('/Error/');
					console.log("Checked the link below");
					console.log(link+" <---------------------");
		        	});
		        	
		        }
		        //add an else for those that are not checked? 
		        //Maybe to look at later and see if maybe we are missing some links to check
		        //});
		        
		        //console.log(browser.getCurrentUrl());
		        


		        /*browser.get(link);
		        console.log(browser.getCurrentUrl());
		        expect(browser.getCurrentUrl()).not.toContain('/Error/');
				*/
		    });
		});
		
	});


});