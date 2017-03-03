describe ('booking stream, 1 Adult, ARN-SFO one-way, 1 extra bag', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');

var hotkeys = require('protractor-hotkeys');

//flyerobject, because it felt right
var flyer0 = {
    firstName: helperFunctions.getRandomString(helperFunctions.getRandomNum(2, 32)),
    lastName: helperFunctions.getRandomString(helperFunctions.getRandomNum(2, 40)),
    gender: 'Female',
    email: 'niklas.ekstrand@sogeti.se',
    phone:'701111111',
    countryCode: '46',
    dob: '1983-05-07',
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
    },
    getDob: function () {
      return this.dob;
    }
}


beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
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
    homePage.openDestination.sendKeys('SFO');
    homePage.openDestination.sendKeys(protractor.Key.ENTER);
    homePage.tripSelect.click();
    homePage.oneWay.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('dest=SFO')).toBe(true,'URL doesnt contain "dest=SFO" ');
    });
  });

  it('select dates', function(){
    console.log("fourth test");
    homePage.openDates.click();
    homePage.setOutbound("5");
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
  });


  it('click shopping cart button', function(){
    console.log("tenth test");
    upsellPage.shoppingCartButton.click();
    browser.waitForAngular();
    expect(passengerPage.firstName0.isPresent()).toBe(true,'First Name box not present. Is page still loading?');

  });

  it('enter first passenger details', function(){
    console.log("eleventh test");
    browser.executeScript("arguments[0].scrollIntoViewIfNeeded();", passengerPage.firstName0.getWebElement());
    passengerPage.firstName0.click();
    passengerPage.firstName0.sendKeys(flyer0.getFirstName());
    passengerPage.lastName0.click();
    passengerPage.lastName0.sendKeys(flyer0.getLastName());
    passengerPage.gender0.click();
    passengerPage.gender0DropDownFemale.click();
    passengerPage.email0.click();
    passengerPage.email0.sendKeys('niklas.ekstrand@sogeti.com');
    passengerPage.phone0.click();
    passengerPage.phone0.sendKeys(flyer0.getPhone());
    passengerPage.dob0.click();
    passengerPage.dob0.sendKeys(flyer0.getDob());

    passengerPage.firstName0.getAttribute('value').then(function(attribute){
      expect(attribute).toEqual(flyer0.getFirstName(),'Flyer first name not entered?');
    });
    passengerPage.lastName0.getAttribute('value').then(function(attribute){
      expect(attribute).toEqual(flyer0.getLastName(),'Flyer last name not entered?');
    });
    passengerPage.gender0.getAttribute('value').then(function(attribute){
        expect(attribute).toEqual(flyer0.getGender(),'Flyer gender not entered?');
    });
    passengerPage.email0.getAttribute('value').then(function(attribute){
        expect(attribute).toEqual(flyer0.getEmail(),'Flyer email not entered?');
    });
    passengerPage.phone0.getAttribute('value').then(function(attribute){
      expect(attribute).toEqual(flyer0.getCountryCode()+flyer0.getPhone(),'Flyer phone not entered?');
    });
  });

  it('Is payment button clickable?', function(){
    console.log("fifteenth test");
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

  it('add baggage', function(){
    console.log("seventeenth test");
    browser.waitForAngular();
    ancillariesPage.selectBagsButton.click();
    ancillariesPage.addBaggageOutbound.click();
    ancillariesPage.bagAddToBooking.click();
    ancillariesPage.shoppingCartButton.click();
    expect(paymentPage.creditCardFrame.isPresent()).toBe(true,'Credit card iframe not present! Is page still loading?');
  });

  it('Enter card details', function(){
    console.log("eighteenth test");
    paymentPage.visa();
    //additional expects done in above function in paymentPage.js
    browser.sleep(5000);
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
  }
  */

  it('review purchase', function(){
    console.log('twentyfourth test');
    browser.sleep(45000);
    paymentPage.reviewButton.click();
    expect(paymentPage.paxDetails.isPresent()).toBe(true,'Pax details arent visible!');
    expect(paymentPage.interTotalPrize.isPresent()).toBe(true,'Total price not visible!');
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
    browser.sleep(45000);
    browser.waitForAngular();
    expect(paymentPage.reservationNumber.isPresent()).toBe(true,'Reservation number not displayed!');

  });
});
