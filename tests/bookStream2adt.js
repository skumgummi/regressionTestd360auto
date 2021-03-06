

describe ('booking stream, 2 adults, ARN-LHR return', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');

var hotkeys = require('protractor-hotkeys');

//flyerobject, because it felt right
var flyer0 = {
    firstName: helperFunctions.getRandomString(helperFunctions.getRandomNum(1, 12)),
    lastName: helperFunctions.getRandomString(helperFunctions.getRandomNum(1, 12)),
    gender: 'Male',
    email: 'niklas.ekstrand@sogeti.se',
    phone:'701111111',
    countryCode: '46',
    getFirstName: function () {
        return this.firstName;
    },
    getLastName: function () {
        return this.lastName;
    },
    getGender: function () {
      return this.gender;
    },
    getEmail: function () {
      return this.email;
    },
    getPhone: function () {
      return this.phone;
    },
    getCountryCode: function () {
      return this.countryCode;
    }
}

var flyer1 = {
    firstName: helperFunctions.getRandomString(helperFunctions.getRandomNum(1, 12)),
    lastName: helperFunctions.getRandomString(helperFunctions.getRandomNum(1, 12)),
    gender: 'Female',
    getFirstName: function () {
        return this.firstName;
    },
    getLastName: function () {
        return this.lastName;
    },
    getGender: function () {
      return this.gender;
    }
}

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  browser.waitForAngular();
});

afterAll(function() {
  browser.driver.manage().deleteAllCookies();
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});

  it('select amount of passengers',  function(){
    console.log("first test");

    homePage.openTravelers.click();
    homePage.addAdult.click();
    /*browser.getCurrentUrl().then(function(url) {
      expect(url.includes('adt=1')).toBe(true, 'URL doesnt contain "adt=1" ');
    });*/

    //this checks the input field rather than the URL
    element(by.css('input[ng-show="travellersFlag"]')).getAttribute('value').then(function(attribute){
      expect(attribute).toEqual('2 Adults','Chosen number of travellers not correct for this (hardcoded) test.');
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
    homePage.tripSelect.click();
    homePage.returnTrip.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('dest=LHR')).toBe(true,'URL doesnt contain "dest=LHR" ');
    });
  });

  it('select dates', function(){
    console.log("fourth test");
    homePage.openDates.click();
    homePage.setOutbound('5');
    browser.waitForAngular();
    homePage.setInbound('15');
    browser.getCurrentUrl().then(function(url) {
      //här måste man veta exakt datum, och just nu väljs inget särskilt datum
      //expect(url.includes('[???]')).toBe(true);
      console.log("this assertion can't be implemented until handling of dates is done properly");
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
    //bör gå att göra meden executescript
    console.log("expect not yet implemented");
  });

  it('select return flight', function(){
    console.log("ninth test");
    //upsell.Page.returnFlight7.scrollIntoView();
    upsellPage.returnFlight3.click();
    browser.waitForAngular();
    upsellPage.shoppingCartButton.isPresent().then(function(selectReturn){
        if(selectReturn){
          upsellPage.shoppingCartButton.getText().then(function(selectReturn){
            expect(selectReturn).toEqual('CONTINUE', 'shopping cart button is supposed to be "CONTINUE"!');
          });
        }else {
          //this will always fail, because this only happens when selectReturn is false.
          expect(selectReturn).toBe(true, 'shopping cart button is not present on page!');
        }

    });
  });

  it('click shopping cart button', function(){
    console.log("tenth test");
    upsellPage.shoppingCartButton.click();
    browser.waitForAngular();
    expect(passengerPage.firstName0.isPresent()).toBe(true,'First Name box not present. Is page still loading?');

  });

  it('enter first name', function(){
    console.log("eleventh test");
    passengerPage.firstName0.click();
    passengerPage.firstName0.sendKeys(flyer0.getFirstName());
    passengerPage.firstName0.getAttribute('value').then(function(attribute){
      expect(attribute).toEqual(flyer0.getFirstName(),'Flyer first name not entered?');
    });
    passengerPage.firstName1.click();
    passengerPage.firstName1.sendKeys(flyer1.getFirstName());
  });

  it('enter last name', function(){
    console.log("twelvth test");
    passengerPage.lastName0.click();
    passengerPage.lastName0.sendKeys(flyer0.getLastName());
    passengerPage.lastName0.getAttribute('value').then(function(attribute){
      expect(attribute).toEqual(flyer0.getLastName(),'Flyer last name not entered?');
    });
    passengerPage.lastName1.click();
    passengerPage.lastName1.sendKeys(flyer0.getLastName());
  });

  it('enter gender', function(){
    console.log("thirteenth test");

    passengerPage.gender0.click();
    passengerPage.gender0DropDownMale.click();

    passengerPage.gender1.click();
    passengerPage.gender1DropDownFemale.click();
  });

  it('enter email', function(){
    console.log("fourtheenth test");
    passengerPage.email0.click();
    passengerPage.email0.sendKeys('niklas.ekstrand@sogeti.com');
      passengerPage.email0.getAttribute('value').then(function(attribute){
        //är gender någonsin relevant att testa? Kanske kan vara värt att fråga UAT-teamet.
          expect(attribute).toEqual(flyer0.getEmail(),'Flyer email not entered?');
      });
    });

  it('enter phone number', function(){
    console.log("fifteenth test");
    passengerPage.phone0.click();
    passengerPage.phone0.sendKeys(flyer0.getPhone());
      passengerPage.phone0.getAttribute('value').then(function(attribute){
        expect(attribute).toEqual(flyer0.getCountryCode()+flyer0.getPhone(),'Flyer phone not entered?');
      });
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(passengerPage.goToPaymentButton), 5000).then(function(clickable){
      expect(clickable).toBe(true,'Button to go to Payment is not clickable or visible!');
    });


  });

  it('click shopping cart button', function(){
    console.log("sixteenth test");
    passengerPage.goToPaymentButton.click();
    browser.waitForAngular();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('booking/Extras')).toBe(true, 'URL doesnt contain "booking/Extras". Is user really at the extras page?');
    });
  });

  it('click shopping cart button', function(){
    console.log("seventeenth test");
    browser.waitForAngular();
    ancillariesPage.shoppingCartButton.click();
    expect(paymentPage.creditCardFrame.isPresent()).toBe(true,'Credit card iframe not present! Is page still loading?');
  });

  it('Enter card details', function(){
    console.log("eighteenth test");
    paymentPage.visa();
    //additional expects done in above function in paymentPage.js
    //browser.sleep(5000);
    //expect(paymentPage.reviewButton);
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(paymentPage.reviewButton), 5000).then(function(clickable){
      expect(clickable).toBe(true,'Button to review payment is not clickable or visible!');
    });
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
  }*/


  it('review purchase', function(){
    console.log('twentyfourth test');
    paymentPage.reviewButton.click();
    expect(paymentPage.paxDetails.isPresent()).toBe(true,'Pax details arent visible!');
    expect(paymentPage.interTotalPrize.isPresent()).toBe(true,'Total prize not visible!');
    expect(paymentPage.insuranceRadioOptions.isPresent()).toBe(true,'Insurance options not visible!');



  });

  it('accept terms', function(){
    console.log('twentyfifth test');

    paymentPage.checkBox.click();
    paymentPage.inputAcceptCheckBox.getAttribute('checked').then(function(attribute){
      expect(attribute).toBe('true','Checkbox still not checked after click!');
    });
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(paymentPage.payNowButton), 5000).then(function(clickable){
    expect(clickable).toBe(true,'Button to confirm payment is not clickable or visible!');
  });
  });

  it('Pay', function(){
    console.log('twentysixth test');
    paymentPage.payNowButton.click();
    //kan nog ersätta denna sleep med en browser.wait med expectedconditions.
    //jag tror den bara väntar så länge den behöver då, tills det väntade villkoret är sant
    browser.sleep(45000);
    browser.waitForAngular();
    expect(paymentPage.reservationNumber.isPresent()).toBe(true,'Reservation number not displayed!');

  });
});
