describe ('booking stream, 1 adult, logged in, ARN-AMS return, Klarna', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');
var hotkeys = require('protractor-hotkeys');
var EC = protractor.ExpectedConditions;

var username = "ebgfi";
var password = "sas111";

//these should be changed to take data from test parameters or something like that (i.e. data driven)
var totalAdults = 1;
var totalChildren = 0;
var totalInfants = 0;
var outBoundDay = '24';
var outBoundMonth = '6';
var outBoundYear = '2017';
var inBoundDay = '25'
var inBoundMonth = '6'
var inBoundYear = '2017'
var orig = 'ARN';
var dest = 'AMS';
var flyers = [];
var doSelectSeats = false;

//these values do not need to be set through test parameters
var totalPassengers;
var totalAdultsStr = '';
var totalChildrenStr = '';
var totalInfantsStr = '';
var flyerInputElements = [];
var numberOfFlights = [];

//to be used to skip rest of test through if-statements
var testFailed = false;

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  //browser.get('https://sas.se');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

  totalPassengers = totalAdults+totalChildren+totalInfants;
  var t = totalPassengers*1000;
  t+=30000;
  console.log('timeout is now '+t);
  allScriptsTimeout = t;

  totalAdultsStr = totalAdults+'';
  totalChildrenStr = totalChildren+'';
  totalInfantsStr = totalInfants+'';

  browser.waitForAngular();

});

afterAll(function() {
  browser.driver.manage().deleteAllCookies();
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});

it('accept cookies if needed', function(){

  browser.wait(EC.presenceOf(homePage.cookieButton), 5000).
  catch(function(err){
    cookieButtonPres = false;
  }).then(function(){
    if (cookieButtonPres){
      homePage.cookieButton.click();
    }
  });

  expect(homePage.cookieButton.isPresent()).toBe(false,'accept cookies button still present!');
});

it('login', function(){
  helperFunctions.testCounter();
  homePage.loginLink.click();
  homePage.emailField.click();
  homePage.emailField.sendKeys(username);
  homePage.passwordField.click();
  homePage.passwordField.sendKeys(password);
  homePage.loginButton.click();
});

  it('select amount of passengers', function(){
    console.log("first test");
    //this mostly verifies that page has loaded correctly, and test can proceed
    browser.wait(EC.presenceOf(homePage.openTravelers), 5000, 'Not able to select amount of travelers. Button not found. Did page load correctly? Skipping remainder of this test to avoid critical failure.')
      .catch(function(err) {
        testFailed = true;
        throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });

    helperFunctions.scrollElementToBeClickable(homePage.openTravelers);
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

    //verifies that requested amount of passengers was able to be selected
    homePage.adultsLabel.getText().then(function(text) {
      expect(parseInt(text)).toEqual(totalAdults, 'Number of adults selected doesnt match test specs. Did test attempt to use an invalid amount of adults? Continuing test with '+text+' adults.');
      browser.waitForAngular().then(function(){
        if (text != totalAdultsStr) {
          totalAdults = parseInt(text);
        }
      });
    });
    homePage.childrenLabel.getText().then(function(text) {
      expect(parseInt(text)).toEqual(totalChildren, 'Number of children selected doesnt match test specs. Did test attempt to use an invalid amount of children+adults? Continuing test with '+text+' children.');
      browser.waitForAngular().then(function(){
        if (text != totalChildrenStr) {
          totalChildren = parseInt(text);
        }
      });
    });
    homePage.infantsLabel.getText().then(function(text) {
      expect(parseInt(text)).toEqual(totalInfants, 'Number of infants selected doesnt match test specs. Did test attempt to use an invalid amount of infants? Continuing test with '+text+' infants.');
      browser.waitForAngular().then(function(){
        if (text != totalInfantsStr) {
          totalInfants = parseInt(text);
        }
      });
    });
  });

  it('select origin', function(){
    browser.wait(EC.elementToBeClickable(homePage.openOrigin), 5000, 'Button for selecting origin not clickable/present. Did page load correctly? Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });

    console.log("second test");
    homePage.openOrigin.click();
    homePage.openOrigin.sendKeys(orig);
    homePage.openOrigin.sendKeys(protractor.Key.ENTER);
    //homePage.openOrigin.getAttribute('value')

  });

  it('select destination', function(){
    browser.wait(EC.elementToBeClickable(homePage.openDestination), 5000, 'Button for selecting destination is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    console.log("third test");
    homePage.openDestination.click();
    homePage.openDestination.sendKeys(dest);
    homePage.openDestination.sendKeys(protractor.Key.ENTER);

  });

  it('select dates', function(){
    browser.wait(EC.elementToBeClickable(homePage.openDates), 5000, 'Button for opening up dates selection is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    console.log("fourth test");
    homePage.openDates.click();
    //browser.sleep(2000);
    homePage.setOutbound(outBoundDay,outBoundMonth,outBoundYear);
    /*browser.wait(EC.presenceOf(homePage.closeTripOverlay),5000).
    catch(function(err){
      //do nothing
    }).then(function(){
      //this is only done if error is not caught
      homePage.closeTripOverlay.click();
    });*/
    browser.waitForAngular();
    homePage.setInbound(inBoundDay,inBoundMonth,inBoundYear);
    browser.getCurrentUrl().then(function(url) {
      //expecten här behöver att funktionen setOutbound/setInbound kan ta ett riktigt datum och välja just det datumet
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
    var cookieButtonPres = true;
    browser.wait(EC.presenceOf(upsellPage.cookieButton), 5000, '"Forward button" is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      cookieButtonPres = false;
    }).then(function(){
      if (cookieButtonPres){
        upsellPage.cookieButton.click();
      }
    });

    console.log("sixth test");
    //upsellPage.cookieButton.click();
    expect(upsellPage.cookieButton.isPresent()).toBe(false,'accept cookies button still present!');
  });

  it('select outbound flight', function(){
    browser.wait(EC.elementToBeClickable(upsellPage.flight1), 5000, '"Forward button" is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    console.log("seventh test");
    upsellPage.flight1.click();
    browser.waitForAngular();
    /*upsellPage.shoppingCartButton.isPresent().then(function(selectReturn){
        if(selectReturn){
          upsellPage.shoppingCartButton.getText().then(function(selectReturn){
            expect(selectReturn).toEqual('SELECT RETURN', 'shopping cart button is supposed to be "SELECT RETURN"!');
          });
        }else {
          //this will always fail, because this only happens when selectReturn is false.
          expect(selectReturn).toBe(true, 'shopping cart button is not present on page!');
        }
      });*/
  });

  it('click shopping cart button', function(){
    browser.wait(EC.elementToBeClickable(upsellPage.shoppingCartButton), 5000, 'Shopping cart button is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    console.log("eighth test");
    upsellPage.shoppingCartButton.click();
    //skippar expect för denna tills vidare
    //kräver någon sorts funktion som kollar om ett element är i viewporten eller inte
    //bör gå att göra med en executescript
    console.log("expect not yet implemented");
  });

  it('select return flight', function(){
    browser.wait(EC.elementToBeClickable(upsellPage.returnFlight3), 5000, 'Desired flight option is not clickable/present. Dynamic flight option selection not yet implemented. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });

    console.log("ninth test");
    //upsell.Page.returnFlight7.scrollIntoView();
    upsellPage.returnFlight1.click();
    browser.waitForAngular();
    /*upsellPage.shoppingCartButton.isPresent().then(function(selectReturn){
        if(selectReturn){
          upsellPage.shoppingCartButton.getText().then(function(selectReturn){
            expect(selectReturn).toEqual('CONTINUE', 'shopping cart button is supposed to be "CONTINUE"!');
          });
        }else {
          //this will always fail, because this only happens when selectReturn is false.
          expect(selectReturn).toBe(true, 'shopping cart button is not present on page!');
        }

    });*/
  });

  it('click shopping cart button', function(){
    browser.wait(EC.elementToBeClickable(upsellPage.shoppingCartButton), 5000, 'Shopping cart button is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });

    console.log("tenth test");
    upsellPage.shoppingCartButton.click();

  });


  it('click shopping cart button passenger page', function(){
    browser.wait(EC.elementToBeClickable(passengerPage.goToPaymentButton), 5000, 'Go to payment button is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    console.log("sixteenth test");
    passengerPage.goToPaymentButton.click();
    browser.waitForAngular();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('booking/Extras')).toBe(true, 'URL doesnt contain "booking/Extras". Is user really at the extras page?');
    });
  });

  it('click shopping cart button ancillaries page', function(){
    browser.wait(EC.elementToBeClickable(ancillariesPage.shoppingCartButton), 5000, 'Go to payment button is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    console.log("seventeenth test");
    browser.waitForAngular();
    ancillariesPage.shoppingCartButton.click().then(function(){
      expect(paymentPage.creditCardFrame.isPresent()).toBe(true,'Credit card iframe not present! Is page still loading?');
    });
  });

  it('click klarna button', function(){
    helperFunctions.testCounter();
    browser.sleep(10000);
    helperFunctions.scrollElementToBeClickable(paymentPage.klarnaButton);
    paymentPage.klarnaButton.click();
  });

  it('click klarna invoice', function(){
    helperFunctions.testCounter();
    paymentPage.klarnaInvoice.click();
    browser.sleep(10000);
  });

  it('review purchase', function(){
    helperFunctions.testCounter();
    browser.sleep(25000);
    paymentPage.reviewButton.click();
  });

  it('accept terms', function(){
    helperFunctions.testCounter();
    paymentPage.checkBox.click();
  });

  it('Pay', function(){
    helperFunctions.testCounter();
    paymentPage.confirmButton.click();
    browser.sleep(25000);
  });

  it('enter klarna details', function(){
    helperFunctions.testCounter();
    browser.ignoreSynchronization = true;
    paymentPage.klarnaSSNField.click();
    paymentPage.klarnaSSNField.sendKeys(paymentPage.klarnaSSN);
    browser.sleep(1000);
    paymentPage.klarnaRetrieveAddress.click();
    browser.sleep(1000);
    paymentPage.klarnaSubmitButton.click();
    browser.sleep(3000);
  });

});
