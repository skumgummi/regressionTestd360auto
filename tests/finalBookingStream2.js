

describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');

var hotkeys = require('protractor-hotkeys');
var EC = protractor.ExpectedConditions;
var totalAdults = 2;
var totalChildren = 0;
var totalInfants = 0;
var totalPassengers;

var flyers = [];
var flyerInputElements = [];

//var seats = [];
//var flights = [];
//var availableSeats = [];
//var numberOfFlights = [];
//var seatMaps = [];

//to be used to skip test of test through if-statements
var testFailed = false;

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  //browser.get('https://sas.no/en');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

  totalPassengers = totalAdults+totalChildren+totalInfants;
  var t = totalPassengers*1000;
  t+=30000;
  console.log('timeout is now '+t);
  allScriptsTimeout = t;
  browser.waitForAngular();
});

afterAll(function() {
  browser.driver.manage().deleteAllCookies();
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});

  it('select amount of passengers', function(){
    console.log("first test");





    //this mostly verifies that page has loaded correctly, and test can proceed
    browser.wait(EC.presenceOf(homePage.openTravelers), 5000, 'Not able to select amount of travelers. Button not found. Did page load correctly?')
      .catch(function(expectation) {
        testFailed = true;
        throw expectation;
    });

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
    //element(by.css('input[ng-show="travellersFlag"]')).getAttribute('value').then(function(attribute){
      //expect(attribute).toEqual('4 Travelers','Chosen number of travellers not correct for this (hardcoded) test.');
    //});
  });

  it('select origin', function(){
    browser.wait(EC.elementToBeClickable(homePage.openOrigin), 5000, 'Not able to . Button not identified as clickable.').then(function(clickable){
      expect(clickable).toBe(true,'Not able to select amount of travelers. Button not identified as clickable');
    });

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
    homePage.setOutbound("24");
    browser.waitForAngular();
    homePage.setInbound("28");
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
    var dobPresent = true;
    browser.wait(EC.presenceOf(passengerPage.dob0), 100)
      .catch(function(expectation) {
        dobPresent = false;
        //throw expectation;
    }).then(function(){
      if (dobPresent) {
        //date of birth
        passengerPage.dob0.click();
        passengerPage.dob0.sendKeys(flyer0.dobAdult);
        passengerPage.dob0.sendKeys('01');
        passengerPage.dob0.sendKeys('01');
      }
    });

    //email
    passengerPage.email0.click();
    passengerPage.email0.sendKeys(flyer0.email);

    //phone number
    passengerPage.phone0.click();
    passengerPage.phone0.sendKeys(flyer0.phone);


    //0th position in this array represents the first adult, which is already used
    //however it is added anyway to maintain sound logic
    for (var i = 0; i < totalPassengers; i++) {
      var inputObj = helperFunctions.getFlyerInputsObj(i);
      flyerInputElements.push(inputObj);
      var flyer = helperFunctions.getFlyer();
      flyers.push(flyer);
    }

  });


  //all other adults

  it('remaining adult details', function (){
    for (var i = 1; i < totalAdults; i++) {
      let j = i;
      helperFunctions.scrollElementToBeClickable(flyerInputElements[j].firstName);

      //first name
      flyerInputElements[j].firstName.click();
      flyerInputElements[j].firstName.sendKeys(flyers[j].firstName);
      //last name
      flyerInputElements[j].lastName.click();
      flyerInputElements[j].lastName.sendKeys(flyers[j].lastName);
      //gender
      flyerInputElements[j].gender.click();
      if (flyers[j].gender == 'male'){
        flyerInputElements[j].genderDropDownMale.click();
      } else {
        flyerInputElements[j].genderDropDownFemale.click();
      }
      var dobPresent = true;
      browser.wait(EC.presenceOf(flyerInputElements[j].dob), 100)
        .catch(function(expectation) {
          dobPresent = false;
      }).then(function(){
        if (dobPresent) {
          //date of birth
          flyerInputElements[j].dob.click();
          flyerInputElements[j].dob.sendKeys(flyers[j].dobAdult);
          flyerInputElements[j].dob.sendKeys('01');
          flyerInputElements[j].dob.sendKeys('01');
        }
      });

      //this expect is not ideal
      //it might even fuck up at the end, looking for a new element to scroll to when no scroll is required
      expect(flyerInputElements[j].firstName.isPresent()).toBe(true,'Cant find next element. Wont be able to scroll to it!');
    }
  });

  it('all children details', function (){
    for (var i = totalAdults; i < totalChildren+totalAdults; i++) {

      let j = i;
      helperFunctions.scrollElementToBeClickable(flyerInputElements[j].firstName);
      //first name
      flyerInputElements[j].firstName.click();
      flyerInputElements[j].firstName.sendKeys(flyers[j].firstName);
      //last name
      flyerInputElements[j].lastName.click();
      flyerInputElements[j].lastName.sendKeys(flyers[j].lastName);

      //gender
      var genderPresent = true;
      browser.wait(EC.presenceOf(flyerInputElements[j].gender), 100).
      catch(function(expectation){
        genderPresent = false;
      }).then(function(){
        if(genderPresent){
          flyerInputElements[j].gender.click();
          if (flyers[j].gender == 'male'){
            flyerInputElements[j].genderDropDownMale.click();
          } else {
            flyerInputElements[j].genderDropDownFemale.click();
          }
        }
      });

      //date of birth
      flyerInputElements[j].dob.click();
      //currently date of birth in flyer object is hardcoded. Later on, it should be generated based on current date
      flyerInputElements[j].dob.sendKeys(flyers[j].dobChild);
      flyerInputElements[j].dob.sendKeys('01');
      flyerInputElements[j].dob.sendKeys('01');
    }
  });

  it('all infants details', function (){
    for (var i = totalAdults+totalChildren; i < totalPassengers; i++) {
      let j = i;
      helperFunctions.scrollElementToBeClickable(flyerInputElements[j].firstName);
      //first name
      flyerInputElements[j].firstName.click();
      flyerInputElements[j].firstName.sendKeys(flyers[j].firstName);
      //last name
      flyerInputElements[j].lastName.click();
      flyerInputElements[j].lastName.sendKeys(flyers[j].lastName);

      //gender
      var genderPresent = true;
      browser.wait(EC.presenceOf(flyerInputElements[j].gender), 100).
      catch(function(expectation){
        genderPresent = false;
      }).then(function(){
        if(genderPresent){
          flyerInputElements[j].gender.click();
          if (flyers[j].gender == 'male'){
            flyerInputElements[j].genderDropDownMale.click();
          } else {
            flyerInputElements[j].genderDropDownFemale.click();
          }
        }
      });

      //date of birth
      flyerInputElements[j].dob.click();
      //currently date of birth in flyer object is hardcoded. Later on, it should be generated based on current date
      flyerInputElements[j].dob.sendKeys(flyers[j].dobInfant);
      flyerInputElements[j].dob.sendKeys('01');
      flyerInputElements[j].dob.sendKeys('01');
    }
  });


  it('click shopping cart button', function(){

    console.log("sixteenth test");
    passengerPage.goToPaymentButton.click();
    browser.waitForAngular();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('booking/Extras')).toBe(true, 'URL doesnt contain "booking/Extras". Is user really at the extras page?');
    });
  });

  it('Press select seats anicillaries button', function(){
    ancillariesPage.selectSeatButton.click();
  });

  it('Select seats for more passengers second try', function(){
    var availableSeats = [];
    var numberOfFlights = [];
    
    numberOfFlights = helperFunctions.getNumberOfFlights();
    for(var k = 1; k<=totalPassengers; k++){
            let current = element(by.xpath('//*[@id="segment-container"]/div[4]/div['+k+']'));
            current.click();
            availableSeats[k-1].click();
    }


    for(var k = 1; k<=totalPassengers; k++){
            let current = element(by.xpath('//*[@id="segment-container"]/div[4]/div['+k+']'));
            current.click();
            availableSeats[k-1].click();
    }

    /*browser.waitForAngular().then(function(){
      numberOfFlights = helperFunctions.getNumberOfFlights();
    }).then(function(){
      for(var i = 0; i<numberOfFlights; i++){
        let j = i
        browser.waitForAngular().then(function(){
          numberOfFlights[j].click();
          availableSeats = seats.getAvailableSeats();
        }).then(function(){
          for(var k = 1; k<=totalPassengers; k++){
            let current = element(by.xpath('//*[@id="segment-container"]/div[4]/div['+k+']'));
            current.click();
            availableSeats[k-1].click();
          }
        });
      }
    });*/

    //helperFunctions.seatSelectionDynamic(totalAdults+totalChildren);
  });

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
    browser.wait(EC.elementToBeClickable(paymentPage.reviewButton), 15000, 'Button to review payment is not clickable or visible!');
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

    browser.wait(EC.and(EC.presenceOf(paymentPage.paxDetails), EC.presenceOf(paymentPage.interTotalPrize),EC.presenceOf(paymentPage.insuranceRadioOptions)), 15000,'"paxDetails", "interTotalPrize" or "insuranceRadioOptions" not present on page!');
    //.catch(function(err){
      //throw err;
    //});
    expect(paymentPage.fareNotAvailableError.isPresent()).toBe(false,'"Fare Not Available"-message detected! Try a different flight!');
  });

  it('accept terms', function(){
    console.log('twentyfifth test');
    browser.wait(EC.visibilityOf(paymentPage.checkBox), 15000).then(function(visible){
      expect(visible).toBe(true,'Checkbox to accept terms not visible!');
      if (visible){
        paymentPage.checkBox.click().then(function(){
          paymentPage.inputAcceptCheckBox.getAttribute('checked').then(function(attribute){
            expect(attribute).toBe('true','Checkbox still not checked after click!');
          });
        });
      }
    });

    browser.wait(EC.elementToBeClickable(paymentPage.payNowButton), 5000,'Button to confirm payment is not clickable or visible!');
      /*.then(function(clickable){
        expect(clickable).toBe(true,'Button to confirm payment is not clickable or visible!');
      });*/
  });

  it('Pay', function(){
    console.log('twentysixth test');
    browser.wait(EC.visibilityOf(paymentPage.payNowButton), 5000).then(function(visible){

      if (visible) {
        paymentPage.payNowButton.click().then(function(result){
          expect(paymentPage.reservationNumber.isPresent()).toBe(true,'Reservation number not displayed!');
        });
      }
    });
  });

});
