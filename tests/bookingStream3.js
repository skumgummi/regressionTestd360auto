describe ('booking stream, 2 adults, 1 child, 1 infant, ARN-EWR return, Diners', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');
var hotkeys = require('protractor-hotkeys');
var EC = protractor.ExpectedConditions;

//these should be changed to take data from test parameters or something like that (i.e. data driven)
var totalAdults = 2;
var totalChildren = 1;
var totalInfants = 1;
var outBoundDay = '23';
var outBoundMonth = '6';
var outBoundYear = '2017';
var inBoundDay = '26'
var inBoundMonth = '6'
var inBoundYear = '2017'
var orig = 'ARN';
var dest = 'EWR';
var flyers = [];
var doSelectSeats = true;

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
    browser.wait(EC.elementToBeClickable(homePage.openDates), 5000, '"Forward button" is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
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

  //first adult


  it('Passenger details: main adult details', function (){
    browser.wait(EC.presenceOf(passengerPage.firstName0), 5000, 'First Name input box for first adult not found! Did page load correctly? Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });


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

  it('Passenger details: remaining adults', function (){

    for (var i = 1; i < totalAdults; i++) {
      let j = i;
      let adultNo = i+1;
      browser.wait(EC.presenceOf(flyerInputElements[j].firstName), 5000, 'First Name input box for adult #'+adultNo+' not found! Did page load correctly? Skipping remainder of this test to avoid critical failure.').
      catch(function(err){
        testFailed = true;
        throw err;
      }).then(function(){
        if (!testFailed){
          //this is just to give the html reporter feedback that this step has passed
          expect(testFailed).toBe(false);
        }
      });

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
      browser.wait(EC.presenceOf(flyerInputElements[j].dob), 100).
      catch(function(expectation) {
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

  it('Passenger details: all children', function (){
    for (var i = totalAdults; i < totalChildren+totalAdults; i++) {

      let j = i;
      let childNo = i-totalAdults+1;
      browser.wait(EC.presenceOf(flyerInputElements[j].firstName), 5000, 'First Name input box for adult #'+childNo+' not found! Did page load correctly? Skipping remainder of this test to avoid critical failure.').
      catch(function(err){
        testFailed = true;
        throw err;
      }).then(function(){
        if (!testFailed){
          //this is just to give the html reporter feedback that this step has passed
          expect(testFailed).toBe(false);
        }
      });
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

  it('Passenger details: all infants', function (){
    for (var i = totalAdults+totalChildren; i < totalPassengers; i++) {
      let j = i;
      let infantNo = i-totalAdults-totalChildren+1;
      browser.wait(EC.presenceOf(flyerInputElements[j].firstName), 5000, 'First Name input box for adult #'+infantNo+' not found! Did page load correctly? Skipping remainder of this test to avoid critical failure.').
      catch(function(err){
        testFailed = true;
        throw err;
      }).then(function(){
        if (!testFailed){
          //this is just to give the html reporter feedback that this step has passed
          expect(testFailed).toBe(false);
        }
      });
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

  it('Enter card details', function(){
    console.log("eighteenth test");
    paymentPage.diners();


    //additional expects done in above function in paymentPage.js
    //browser.sleep(5000);
    //expect(paymentPage.reviewButton);
    //var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(paymentPage.reviewButton), 15000, 'Button to review payment is not clickable or visible!');
  });

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
      //.then(function(clickable){
        //expect(clickable).toBe(true,'Button to confirm payment is not clickable or visible!');
      //});
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
