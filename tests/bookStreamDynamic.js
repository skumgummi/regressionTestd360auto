

describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');
var helperFunctions = require('../helpers/helperFunctions.js');
var hotkeys = require('protractor-hotkeys');
var EC = protractor.ExpectedConditions;

//these are the test parameters
var continueTestAfterFailure = false;
var totalAdults = 1;
var totalChildren = 0;
var totalInfants = 0;
var outBoundDay = '23';
var outBoundMonth = '6';
var outBoundYear = '2017';
//avoid chosing inbound date 6 or 7 days after outbound. Due to layout of "please select return date"-tooltip it's not possible to close it by script (it is covered by text element)
var inBoundDay = '30';
var inBoundMonth = '6';
var inBoundYear = '2017';
var orig = 'ARN';
var dest = 'LHR';
var flyers = [];
var doSelectSeats = true;
//these are occasionally required
var postalCode = '11111';
var adress = 'StreetMcStreetface 11';
var country = 'Sweden';
var city = 'Stockholm';
//end of test parameters

//flight1/returnFlight1 = first flight in list. Change to a different number to select a later flight during the day
//for return trips, make sure inbound flight is later than outbount flight
var outBoundFlight = upsellPage.flight1;
var inBoundFlight = upsellPage.returnFlight1;

//these values do not need to be changed. They are used by the code
var totalPassengers;
var totalAdultsStr = '';
var totalChildrenStr = '';
var totalInfantsStr = '';
var flyerInputElements = [];
var numberOfFlights = [];
var cookieButtonPres = true;


//to be used to skip rest of test through if-statements
var testFailed = false;
//if seat selection can't be done, skips that step
var seatSelectionFailed = false;

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
  browser.manage().logs().get('browser').then(function(browserLog) {
        console.log('\n log: ' + require('util').inspect(browserLog));
  });
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
    

    //this mostly verifies that page has loaded correctly, and test can proceed
    browser.wait(EC.presenceOf(homePage.openTravelers), 5000, 'Not able to select amount of travelers. Button not found using locator '+homePage.openTravelersLocator.value+'. Did page load correctly? Skipping remainder of this test to avoid critical failure.').
      catch(function(err) {
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
    homePage.openDates.click();
    //browser.sleep(2000);
    homePage.setOutbound(outBoundDay,outBoundMonth,outBoundYear);
    browser.wait(EC.presenceOf(homePage.closeTripOverlay),5000).
    catch(function(err){
      //do nothing
    }).then(function(){
      //this is only done if error is not caught
      homePage.closeTripOverlay.click();
    });
    
    browser.waitForAngular();
    homePage.setInbound(inBoundDay,inBoundMonth,inBoundYear);
    browser.getCurrentUrl().then(function(url) {
      //expecten här behöver att funktionen setOutbound/setInbound kan ta ett riktigt datum och välja just det datumet
    });
  });

  it('Click forward button', function(){
    browser.wait(EC.presenceOf(homePage.fwdButton), 5000, '"Forward button" is not present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    homePage.clickForwardButton();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('booking/select-flights?')).toBe(true,'URL doesnt show "booking/select-flights", user might not be able to select flight');
    });
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
    upsellPage.shoppingCartButton.click();
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
    upsellPage.returnFlight3.click();    
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
    browser.wait(EC.presenceOf(passengerPage.dob0), 100).
    catch(function(expectation) {
      dobPresent = false;
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
      if (j+1 < totalAdults){
        expect(flyerInputElements[j+1].firstName.isPresent()).toBe(true,'Cant find next element. Wont be able to scroll to it!');
      }
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
      if (j+1 < totalChildren+totalAdults){
        expect(flyerInputElements[j+1].firstName.isPresent()).toBe(true,'Cant find next element. Wont be able to scroll to it!');
      }
    }
  });

  it('Passenger details: all infants', function (){
    for (var i = totalAdults+totalChildren; i < totalPassengers; i++) {
      let j = i;
      let infantNo = i-totalAdults-totalChildren+1;
      browser.wait(EC.presenceOf(flyerInputElements[j].firstName), 5000, 'First Name input box for infant #'+infantNo+' not found! Did page load correctly? Skipping remainder of this test to avoid critical failure.').
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
      if (j+1 < totalPassengers){
        expect(flyerInputElements[j+1].firstName.isPresent()).toBe(true,'Cant find next element. Wont be able to scroll to it!');
      }
    }
  });


  it('click shopping cart button', function(){
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
    passengerPage.goToPaymentButton.click();
  });

  it('Press select seats ancillaries button', function(){
    browser.wait(EC.elementToBeClickable(ancillariesPage.selectSeatButton), 5000, 'Seat selection ancillary button not present/clickable! Trying to continue test without selecting seats.').
    catch(function(err){
      seatSelectionFailed = true;
      console.log('SEAT SELECTION FAILED! Variable is now = '+seatSelectionFailed);
      //testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    if(doSelectSeats && !seatSelectionFailed){
      ancillariesPage.selectSeatButton.click();
    }
    browser.waitForAngular();

    
    numberOfFlights = helperFunctions.getNumberOfFlights();
  });

  it('Select seats for more passengers', function(){
    if(doSelectSeats && !seatSelectionFailed){
      helperFunctions.selectSeats(numberOfFlights,totalAdults+totalChildren);
    } else {

    }

   
  });


  it('click shopping cart button', function(){
    browser.wait(EC.elementToBeClickable(ancillariesPage.shoppingCartButton), 15000, 'Go to payment button is not clickable/present. Skipping remainder of this test to avoid critical failure.').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    browser.waitForAngular();
    ancillariesPage.shoppingCartButton.click().then(function(){
      expect(paymentPage.creditCardFrame.isPresent()).toBe(true,'Credit card iframe not present! Is page still loading?');
    });
  });

  it('Enter card details', function(){
    paymentPage.visa();
    

    //additional expects done in above function in paymentPage.js
    //browser.sleep(5000);
    //expect(paymentPage.reviewButton);
    //var EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(paymentPage.reviewButton), 15000, 'Button to review payment is not clickable or visible!');
  });



  
    
  it('enter city', function(){
    browser.wait(EC.elementToBeClickable(paymentPage.cityForm), 15000).
    catch(function(err){
      //no need to throw error. This form isn't always present.
    }).then(function(){
      //this is just to give the html reporter feedback that this step has passed
      expect(testFailed).toBe(false);
    });
    paymentPage.cityForm.click();
    paymentPage.cityForm.sendKeys(city);
    paymentPage.cityForm.sendKeys(protractor.Key.ENTER);
    

  });

  it('enter country', function(){
    browser.wait(EC.elementToBeClickable(paymentPage.countryForm), 15000).
    catch(function(err){
      //no need to throw error. This form isn't always present.
    }).then(function(){
      //this is just to give the html reporter feedback that this step has passed
      expect(testFailed).toBe(false);
    });
    paymentPage.countryForm.click();
    paymentPage.countryForm.sendKeys(country);
    paymentPage.countryForm.sendKeys(protractor.Key.ENTER);

  });

  it('Enter address', function(){
    browser.wait(EC.elementToBeClickable(paymentPage.addressForm), 15000).
    catch(function(err){
      //no need to throw error. This form isn't always present.
    }).then(function(){
      //this is just to give the html reporter feedback that this step has passed
      expect(testFailed).toBe(false);
    });
    paymentPage.addressForm.click();
    paymentPage.addressForm.sendKeys(adress);

  });

  it('enter postal code', function(){
    browser.wait(EC.elementToBeClickable(paymentPage.postalcodeForm), 15000).
    catch(function(err){
      //no need to throw error. This form isn't always present.
    }).then(function(){
      //this is just to give the html reporter feedback that this step has passed
      expect(testFailed).toBe(false);
    });
    paymentPage.postalcodeForm.click();
    paymentPage.postalcodeForm.sendKeys(postalCode);

  });
  
  

  it('review purchase', function(){
    browser.wait(EC.elementToBeClickable(paymentPage.reviewButton), 15000, 'Button to review payment is not clickable or visible!').
    catch(function(err){
      testFailed = true;
      throw err;
    }).then(function(){
      if (!testFailed){
        //this is just to give the html reporter feedback that this step has passed
        expect(testFailed).toBe(false);
      }
    });
    paymentPage.reviewButton.click();
    
    browser.wait(EC.and(EC.presenceOf(paymentPage.paxDetails), EC.presenceOf(paymentPage.interTotalPrize),EC.presenceOf(paymentPage.insuranceRadioOptions)), 15000,'"paxDetails", "interTotalPrize" or "insuranceRadioOptions" not present on page!');
    //.catch(function(err){
      //throw err;
    //});
    expect(paymentPage.fareNotAvailableError.isPresent()).toBe(false,'"Fare Not Available"-message detected! Try a different flight!');
  });

  it('accept terms', function(){
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
    
    //browser.wait(EC.elementToBeClickable(paymentPage.payNowButton), 5000,'Button to confirm payment is not clickable or visible!');
      //.then(function(clickable){
        //expect(clickable).toBe(true,'Button to confirm payment is not clickable or visible!');
      //});
  });

  it('Pay', function(){
    browser.wait(EC.presenceOf(paymentPage.payNowButton), 5000, 'Button to confirm payment is not clickable or visible!').then(function(pres){
      
      if (pres) { 
        paymentPage.payNowButton.click().then(function(result){
          expect(paymentPage.reservationNumber.isPresent()).toBe(true,'Reservation number not displayed!');
        });
      }
    });
  });
  
});
