describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');

var hotkeys = require('protractor-hotkeys');

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  browser.waitForAngular();
});

  it('select amount of passengers',  function(){
    console.log("first test");
    homePage.openTravelers.click();
    //homePage.addAdult.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('adt=1')).toBe(true, 'URL doesnt contain "adt=1" ');
    });
  });

  it('select origin', function(){
    console.log("second test");
    homePage.openOrigin.click();
    homePage.openOrigin.sendKeys('ARN');
    homePage.openOrigin.sendKeys(protractor.Key.ENTER);
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('org=ARN')).toBe(true, 'URL doesnt contain "org=ARN" ');
    });
  });

  it('select destination', function(){
    console.log("third test");
    homePage.openDestination.click();
    homePage.openDestination.sendKeys('LHR');
    homePage.openDestination.sendKeys(protractor.Key.ENTER);
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('dest=LHR')).toBe(true,'URL doesnt contain "dest=LHR" ');
    });
  });

  it('select dates', function(){
    console.log("fourth test");
    homePage.openDates.click();
    homePage.setOutbound();
    browser.waitForAngular();
    homePage.setInbound();
    browser.getCurrentUrl().then(function(url) {
      //här måste man veta exakt datum, och just nu väljs inget särskilt datum
      //expect(url.includes('[???]')).toBe(true);
      console.log("expect not yet implemented");
    });
  });

  it('Click forward button', function(){
    console.log("fifth test");
    homePage.clickForwardButton();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('booking/select-flights?')).toBe(true,'URL doesnt show "booking/select-flights", user might not be able to select flight');
    });
  });

  it('accept cookies', function(){
    console.log("sixth test");
    upsellPage.cookieButton.click();
    expect(upsellPage.cookieButton.isPresent()).toBe(false,'accept cookies button still present!');
  });

  it('select outbound flight', function(){
    console.log("seventh test");
    upsellPage.flight1.click();
    browser.waitForAngular();
    upsellPage.shoppingCartButton.isPresent().then(function(selectReturn){
        if(selectReturn){
          upsellPage.shoppingCartButton.getText().then(function(selectReturn){
            expect(selectReturn).toEqual('SELECT RETURN', 'shopping cart button is supposed to be "SELECT RETURN"!');
          });
        }else {
          //this will always fail, because this only happens when selectReturn is false. 
          expect(selectReturn).toBe(true, 'shopping cart button is not present on page!');
        }
      });
  });

  it('click shopping cart button', function(){
    console.log("eighth test");
    upsellPage.shoppingCartButton.click();
    browser.waitForAngular();
    //skippar expect för denna tills vidare
    //kräver någon sorts funktion som kollar om ett element är i viewporten eller inte
    //det går att göra med en JQuery, men går det att köra med executeScript?
    console.log("expect not yet implemented");
  });

  it('select return flight', function(){
    console.log("ninth test");
    //upsell.Page.returnFlight7.scrollIntoView();
    upsellPage.returnFlight3.click();
    browser.waitForAngular();
    if(selectReturn){
      upsellPage.shoppingCartButton.getText().then(function(selectReturn){
        expect(selectReturn).toEqual('CONTINUE', 'shopping cart button is supposed to be "CONTINUE"!');
      });
    }else {
      //this will always fail, because this only happens when selectReturn is false. 
      expect(selectReturn).toBe(true, 'shopping cart button is not present on page!');
    }
  });

  it('click shopping cart button', function(){
    console.log("tenth test");
    upsellPage.shoppingCartButton.click();
  });

  it('enter first name', function(){
    console.log("eleventh test");
    passengerPage.firstName0.click();
    passengerPage.firstName0.sendKeys('Name');
    //passengerPage.firstName1.click();
    //passengerPage.firstName1.sendKeys('Namette');
  });

  it('enter last name', function(){
    console.log("twelvth test");
    passengerPage.lastName0.click();
    passengerPage.lastName0.sendKeys('McNameface');
    //passengerPage.lastName1.click();
    //passengerPage.lastName1.sendKeys('McNameface');
  });

  it('enter gender', function(){
    console.log("thirteenth test");
    passengerPage.gender0.click();
    passengerPage.genderDropDownMale.click();
    //passengerPage.gender1.click();
    //hotkeys.trigger('down down', { targetElement: passengerPage.gender1}).trigger('enter');
    //browser.sleep(100);
    /*
    passengerPage.firstName1.isPresent().then(function (secondaryPresent) {
  	if (secondaryPresent) {
        passengerPage.gender1.click().genderDropDownFemale.click();
    }
  	});
    */

    //hotkeys.trigger('down', { targetElement: passengerPage.gender1});
    //browser.sleep(100);
    //hotkeys.trigger('enter', { targetElement: browser.driver.activeElement()});
    //passengerPage.gender1.sendKeys(protractor.Key.ENTER);
  });

  it('enter email', function(){
    console.log("fourtheenth test");
    passengerPage.email0.click();
    passengerPage.email0.sendKeys('McNameface123@emailplace.com');
  });

  it('enter phone number', function(){
    console.log("fifteenth test");
    passengerPage.phone0.click();
    passengerPage.phone0.sendKeys('701111111');
  });

  it('click shopping cart button', function(){
    console.log("sixteenth test");
    passengerPage.goToPaymentButton.click();
  });

  it('click shopping cart button', function(){
    console.log("seventeenth test");
    browser.waitForAngular();
    ancillariesPage.shoppingCartButton.click();
  });

  it('Enter card details', function(){
    console.log("eighteenth test");
    paymentPage.visa();
    browser.sleep(5000);
  });


/*
  if(paymentPage.cityForm.isPresent(true)){
    it('enter city', function(){
      console.log("ninteenth test");
      paymentPage.cityForm.click();
      paymentPage.cityForm.sendKeys('Stockholm');
      paymentPage.cityForm.sendKeys(protractor.Key.ENTER);

    });

    it('enter country', function(){
      console.log('twentieth test');
      paymentPage.countryForm.click();
      paymentPage.countryForm.sendKeys('Sweden');
      paymentPage.countryForm.sendKeys(protractor.Key.ENTER);
    });

    it('Enter address', function(){
      console.log('twentysecond test');
      paymentPage.addressForm.click();
      paymentPage.addressForm.sendKeys('StreetMcStreetface 11');
    });

    it('enter postal code', function(){
      console.log('twentythird test');
      paymentPage.postalcodeForm.click();
      paymentPage.postalcodeForm.sendKeys('11111');
    });
  }
  */

  it('review purchase', function(){
    console.log('twentyfourth test');
    paymentPage.reviewButton.click();
  });

  it('accept terms', function(){
    console.log('twentyfifth test');
    paymentPage.checkBox.click();
  });

  it('Pay', function(){
    console.log('twentysixth test');
    paymentPage.payNowButton.click()
    browser.sleep(45000);
  });

});
