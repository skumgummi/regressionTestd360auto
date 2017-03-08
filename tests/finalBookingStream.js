

describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');

var hotkeys = require('protractor-hotkeys');
var EC = protractor.ExpectedConditions;
var totalAdults = 7;
var totalChildren = 2;
var totalInfants = 7;
var totalPassengers;

var flyers = [];
var flyerInputElements = [];

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

  totalPassengers = totalAdults+totalChildren+totalInfants;
  var t = totalPassengers*1000;
  t+=30000;
  console.log('timeout is now '+t);
  allScriptsTimeout = 30000+t;
  browser.waitForAngular();
});

afterAll(function() {
  browser.driver.manage().deleteAllCookies();
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});

  it('select amount of passengers', function(){
    console.log("first test");


    homePage.openTravelers.click().then(function(){
      //one adult chosen by default, so i = 1
      for (var i = 1; i < totalAdults; i++) {
        homePage.addAdult.click();
      }
      for (var i = 0; i < totalChildren; i++) {
        homePage.addChild.click();
      }
      for (var i = 0; i < totalInfants; i++) {
        homePage.addInfant.click();
      }
    });
    /*browser.getCurrentUrl().then(function(url) {
      expect(url.includes('adt=1')).toBe(true, 'URL doesnt contain "adt=1" ');
    });*/

    //this checks the input field rather than the URL
    element(by.css('input[ng-show="travellersFlag"]')).getAttribute('value').then(function(attribute){
      expect(attribute).toEqual('4 Travelers','Chosen number of travellers not correct for this (hardcoded) test.');
    });
  });

  it('select origin', function(){
    console.log("second test");
    homePage.openOrigin.click();
    homePage.openOrigin.sendKeys(helperFunctions.getRandomAirportScandinavia());
    homePage.openOrigin.sendKeys(protractor.Key.ENTER);
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('org=ARN')).toBe(true, 'URL doesnt contain "org=ARN" ');
    });
  });

  it('select destination', function(){
    console.log("third test");
    homePage.openDestination.click();
    homePage.openDestination.sendKeys(helperFunctions.getRandomAirportEU());
    homePage.openDestination.sendKeys(protractor.Key.ENTER);
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('dest=LHR')).toBe(true,'URL doesnt contain "dest=LHR" ');
    });
  });

  it('select dates', function(){
    console.log("fourth test");
    homePage.openDates.click();
    homePage.setOutbound("11");
    browser.waitForAngular();
    homePage.setInbound("15");
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
    //bör gå att göra med en executescript
    console.log("expect not yet implemented");
  });

  it('select return flight', function(){
    console.log("ninth test");
    //upsell.Page.returnFlight7.scrollIntoView();
    upsellPage.returnFlight1.click();
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
    upsellPage.shoppingCartButton.click().then(function(result){
      expect(passengerPage.firstName0.isPresent()).toBe(true,'First Name box not present. Is page still loading?');
    });


  });

  //first adult
  it('main adult details', function (){
    var flyer0 = helperFunctions.getFlyer();


    //first name
    passengerPage.firstName0.click();
    passengerPage.firstName0.sendKeys(flyer0.firstName);
    //last name
    passengerPage.lastName0.click();
    passengerPage.lastName0.sendKeys(flyer0.lastName);
    //gender
    passengerPage.gender0.click();
    if (flyer0.gender == 'male'){
      passengerPage.gender0DropDownMale.click();
    } else {
      passengerPage.gender0DropDownFemale.click();
    }

    //email
    passengerPage.email0.click();
    passengerPage.email0.sendKeys(flyer0.email);

    //phone number
    passengerPage.phone0.click();
    passengerPage.phone0.sendKeys(flyer0.phone);


    //i starts at 1 because the first adult is handled separately
    for (var i = 1; i < totalPassengers; i++) {
      var inputObj = helperFunctions.getFlyerInputsObj(i);
      flyerInputElements.push(inputObj);
      var flyer = helperFunctions.getFlyer();
      flyers.push(flyer);
    }

  });


  //all other adults

  it('remaining adult details', function (){
    for (var i = 0; i < totalAdults-1; i++) {



      helperFunctions.scrollElementToBeClickable(flyerInputElements[i].firstName);

      //first name
      flyerInputElements[i].firstName.click();
      flyerInputElements[i].firstName.sendKeys(flyers[i].firstName);
      //last name
      flyerInputElements[i].lastName.click();
      flyerInputElements[i].lastName.sendKeys(flyers[i].lastName);
      //gender
      flyerInputElements[i].gender.click();
      if (flyers[i].gender == 'male'){
        flyerInputElements[i].genderDropDownMale.click();
      } else {
        flyerInputElements[i].genderDropDownFemale.click();
      }
      //this expect is not ideal
      //it might even fuck up at the end, looking for a new element to scroll to when no scroll is required
      expect(flyerInputElements[i].firstName.isPresent()).toBe(true,'Cant find next element. Wont be able to scroll to it!');
    }
  });

  it('all children details', function (){
    for (var i = totalAdults-1; i < totalChildren+totalAdults-1; i++) {


      helperFunctions.scrollElementToBeClickable(flyerInputElements[i].firstName);
      //first name
      flyerInputElements[i].firstName.click();
      flyerInputElements[i].firstName.sendKeys(flyers[i].firstName);
      //last name
      flyerInputElements[i].lastName.click();
      flyerInputElements[i].lastName.sendKeys(flyers[i].lastName);
      //date of birth
      flyerInputElements[i].dob.click();
      //currently date of birth in flyer object is hardcoded. Later on, it should be generated based on current date
      flyerInputElements[i].dob.sendKeys(flyers[i].dobChild);
      flyerInputElements[i].dob.sendKeys('01');
      flyerInputElements[i].dob.sendKeys('01');
    }
  });

  it('all infants details', function (){
    for (var i = totalAdults+totalChildren-1; i < totalPassengers-1; i++) {
      helperFunctions.scrollElementToBeClickable(flyerInputElements[i].firstName);
      //first name
      flyerInputElements[i].firstName.click();
      flyerInputElements[i].firstName.sendKeys(flyers[i].firstName);
      //last name
      flyerInputElements[i].lastName.click();
      flyerInputElements[i].lastName.sendKeys(flyers[i].lastName);
      //date of birth
      flyerInputElements[i].dob.click();
      //currently date of birth in flyer object is hardcoded. Later on, it should be generated based on current date
      flyerInputElements[i].dob.sendKeys(flyers[i].dobInfant);
      flyerInputElements[i].dob.sendKeys('01');
      flyerInputElements[i].dob.sendKeys('01');
    }
  });



/*
  //#3
  it('first child details', function (){
    var flyer2 = helperFunctions.getFlyer();

    helperFunctions.scrollElementToBeClickable(passengerPage.firstName2);
    //first name
    passengerPage.firstName2.click();
    passengerPage.firstName2.sendKeys(flyer2.firstName);
    //last name
    passengerPage.lastName2.click();
    passengerPage.lastName2.sendKeys(flyer2.lastName);
    //date of birth
    passengerPage.dob2.click();
    //currently date of birth in flyer object is hardcoded. Later on, it should be generated based on current date
    passengerPage.dob2.sendKeys(flyer2.dobChild);
  });

  //#4
  it('first infant details', function (){
    helperFunctions.scrollElementToBeClickable(passengerPage.firstName3);
    //first name
    passengerPage.firstName3.click();
    passengerPage.firstName3.sendKeys(flyer3.firstName);
    //last name
    passengerPage.lastName3.click();
    passengerPage.lastName3.sendKeys(flyer3.lastName);
    //date of birth
    passengerPage.dob3.click();
    //currently date of birth in flyer object is hardcoded. Later on, it should be generated based on current date
    passengerPage.dob3.sendKeys(flyer3.dobInfant);
  });

*/

  it('click shopping cart button', function(){

    console.log("sixteenth test");
    passengerPage.goToPaymentButton.click();
    browser.waitForAngular();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('booking/Extras')).toBe(true, 'URL doesnt contain "booking/Extras". Is user really at the extras page?');
    });
  });

  it('select seat', function(){
    console.log("seventeenth test");
    browser.waitForAngular();
    ancillariesPage.selectSeatButton.click();
    console.log('selecting seat 1');
    ancillariesPage.selectSeat();
    ancillariesPage.selectSeat2.isPresent().then(function(present){
      if(present){
        console.log('selecting seat 2');
        ancillariesPage.selectSeat2.click();
        ancillariesPage.selectSeat();
      }
    });
    ancillariesPage.selectSeat3.isPresent().then(function(present){
      if(present){
        console.log('selecting seat 3');
        ancillariesPage.selectSeat3.click();
        ancillariesPage.selectSeat();
      }
    });
    ancillariesPage.selectSeat4.isPresent().then(function(present){
      if(present){
        console.log('selecting seat 4');
        ancillariesPage.selectSeat4.click();
        ancillariesPage.selectSeat();
      }
    });
    ancillariesPage.selectSeat5.isPresent().then(function(present){
      if(present){
        console.log('selecting seat 5');
        ancillariesPage.selectSeat5.click();
        ancillariesPage.selectSeat();
      }
    });
    ancillariesPage.selectSeat6.isPresent().then(function(present){
      if(present){
        console.log('selecting seat 6');
        ancillariesPage.selectSeat6.click();
        ancillariesPage.selectSeat();
      }
    });
    browser.waitForAngular().then(function(){
      ancillariesPage.forgotSeatOkay.isPresent().then(function(present){
        if(present){
          console.log('Forgot to pick seat, but thats okay');
          ancillariesPage.forgotSeatOkay.click();
        }
      });
      ancillariesPage.seatAddToBooking.isPresent().then(function(present){
        if(present){
          ancillariesPage.seatAddToBooking.click();
        }
      });
    });
    expect(paymentPage.creditCardFrame.isPresent()).toBe(true,'Credit card iframe not present! Is page still loading?');
  });

  it('select seats for remaining passengers', function(){
    for (var i = 0; i < totalAdults+totalChildren-1; i++) {
      //Write this tomorrow!
    }
  })

  it('click shopping cart button', function(){
    console.log("seventeenth test");
    browser.waitForAngular();
    ancillariesPage.shoppingCartButton.click().then(function(){
      expect(paymentPage.creditCardFrame.isPresent()).toBe(true,'Credit card iframe not present! Is page still loading?');
    });
  });

  it('Enter card details', function(){
    console.log("eighteenth test");
    paymentPage.visa();
    //additional expects done in above function in paymentPage.js
    //browser.sleep(5000);
    //expect(paymentPage.reviewButton);
    //var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(paymentPage.reviewButton), 5000).then(function(clickable){
      expect(clickable).toBe(true,'Button to review payment is not clickable or visible!');
    });
  });


  it('review purchase', function(){
    console.log('twentyfourth test');
    paymentPage.reviewButton.click();

    browser.wait(EC.visibilityOf(paymentPage.paxDetails), 15000).then(function(clickable){
      expect(paymentPage.paxDetails.isPresent()).toBe(true,'Pax details arent visible!');
      expect(paymentPage.interTotalPrize.isPresent()).toBe(true,'Total prize not visible!');
      expect(paymentPage.insuranceRadioOptions.isPresent()).toBe(true,'Insurance options not visible!');
    });
  });

  it('accept terms', function(){
    console.log('twentyfifth test');

    paymentPage.checkBox.click().then(function(){
      paymentPage.inputAcceptCheckBox.getAttribute('checked').then(function(attribute){
        expect(attribute).toBe('true','Checkbox still not checked after click!');
      });
    })

    browser.wait(EC.elementToBeClickable(paymentPage.payNowButton), 5000).then(function(clickable){
      expect(clickable).toBe(true,'Button to confirm payment is not clickable or visible!');
    });
  });

  it('Pay', function(){
    console.log('twentysixth test');
    paymentPage.payNowButton.click().then(function(result){
      expect(paymentPage.reservationNumber.isPresent()).toBe(true,'Reservation number not displayed!');
    });
  });

});
