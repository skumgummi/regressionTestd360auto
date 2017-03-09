describe ('mmb stream 1', function(){

  var homePage = require('../pages/home_page.js');
  var upsellPage = require('../pages/upsell_page.js');
  var passengerPage = require('../pages/passenger_page.js');
  var ancillariesPage = require('../pages/ancillaries_page.js');
  var paymentPage = require('../pages/payment_page.js');
  var helperFunctions = require('../helpers/helperFunctions.js');
  var myTripsPage = require('../pages/myTrips_page.js');

  var username = "niklas.ekstrand@sogeti.se";
  var password = "123abc";
  var bookingReference = "";

  beforeAll(function(){
    console.log("before all running!");
    browser.get('https://d360u.flysas.com/se-en');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    browser.waitForAngular();

    if(homePage.cookieButton.isPresent()){
      console.log('accepting cookies');
      homePage.cookieButton.click();
    }
  });

  afterAll(function() {
    browser.driver.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
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

  it('select origin', function(){
    helperFunctions.testCounter();
    helperFunctions.scrollElementToBeClickable(homePage.openOrigin);
    homePage.tripSelect.click();
    homePage.oneWay.click();
    homePage.openOrigin.click();
    browser.waitForAngular();
    homePage.openOrigin.sendKeys('ARN');
    homePage.openOrigin.sendKeys(protractor.Key.ENTER);
    browser.sleep(100);
  });

  it('select destination', function(){
    helperFunctions.testCounter();
    homePage.openDestination.click();
    browser.waitForAngular();
    homePage.openDestination.sendKeys('OSL');
    homePage.openDestination.sendKeys(protractor.Key.ENTER);
    browser.sleep(100);
  });

  it('select dates', function(){
    helperFunctions.testCounter();
    homePage.openDates.click();
    homePage.setOutbound(helperFunctions.getTomorrow());
  });

  it('Click forward button', function(){
    helperFunctions.testCounter();
    homePage.clickForwardButton();
  });

  it('select outbound flight', function(){
    helperFunctions.testCounter();
    upsellPage.flight1.click();
    browser.waitForAngular();
    upsellPage.shoppingCartButton.click();
  });

  it('click shopping cart button', function(){
    helperFunctions.testCounter();
    browser.waitForAngular();
    ancillariesPage.shoppingCartButton.click();
  });

  it('Enter card details', function(){
    helperFunctions.testCounter();
    paymentPage.visa();
    browser.sleep(5000);
  });

  it('review purchase', function(){
    helperFunctions.testCounter();
    browser.sleep(45000);
    paymentPage.reviewButton.click();
  });

  it('accept terms', function(){
    helperFunctions.testCounter();
    paymentPage.checkBox.click();
  });

  it('Pay', function(){
    helperFunctions.testCounter();
    paymentPage.payNowButton.click();
    browser.sleep(45000);
  });

  it('Save booking reference', function(){
    helperFunctions.testCounter();
    element(by.xpath('//*[@id="mmbOverlayModalDialog"]/div/div/div/div/div[3]/div/div/div[2]/div[2]/div[1]/div[1]/div/span')).isPresent().then(function(present){
      if(present){
        element(by.xpath('//*[@id="mmbOverlayModalDialog"]/div/div/div/div/div[3]/div/div/div[2]/div[2]/div[1]/div[1]/div/span')).getText().then(function(text){
        bookingReference = text;
        console.log('Booking reference:' + bookingReference);
        })
      }
    });
  });

  it('press x button', function(){
    helperFunctions.testCounter();
    myTripsPage.xButton.click();
  });

  it('press my trips button', function(){
    helperFunctions.testCounter();
    homePage.myTripsButton.click();
  });

  it('Find booking', function(){
    helperFunctions.testCounter();
    myTripsPage.bookingReferenceWindow.click();
    myTripsPage.bookingReferenceWindow.sendKeys(bookingReference);
    myTripsPage.lastNameWindow.click();
    myTripsPage.lastNameWindow.sendKeys("ekstrand");
    myTripsPage.arrowButton.click();
  });

  it('Select a seat', function(){
    helperFunctions.testCounter();
    helperFunctions.scrollElementToBeClickable(myTripsPage.buySeatButton);
    //myTripsPage.buySeatButton.click()
    browser.sleep(500000);
    //browser.waitForAngular();
    //helperFunctions.seatSelection();
  })

});
