describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');
var passengerPage = require('../pages/passenger_page.js');
var ancillariesPage = require('../pages/ancillaries_page.js');
var paymentPage = require('../pages/payment_page.js');

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  browser.waitForAngular();
});

  it('select amount of passengers',  function(){
    console.log("first test");
    homePage.openTravelers.click();

  });

  it('select origin', function(){
    console.log("second test");
    homePage.openOrigin.click();
    homePage.openOrigin.sendKeys('ARN');
    homePage.openOrigin.sendKeys(protractor.Key.ENTER);
  });

  it('select destination', function(){
    console.log("third test");
    homePage.openDestination.click();
    homePage.openDestination.sendKeys('LHR');
    homePage.openDestination.sendKeys(protractor.Key.ENTER);
  });

  it('select dates', function(){
    console.log("fourth test");
    homePage.openDates.click();
    homePage.setOutbound();
    browser.waitForAngular();
    homePage.setInbound();
  });

  it('Click forward button', function(){
    console.log("fifth test");
    homePage.clickForwardButton();
  });

  it('accept cookies', function(){
    console.log("sixth test");
    upsellPage.cookieButton.click();
  });

  it('select outbound flight', function(){
    console.log("seventh test");
    upsellPage.flight1.click();
    browser.waitForAngular();
  });

  it('click shopping cart button', function(){
    console.log("eighth test");
    upsellPage.shoppingCartButton.click();
    browser.waitForAngular();
  });

  it('select return flight', function(){
    console.log("ninth test");
    //upsell.Page.returnFlight7.scrollIntoView();
    upsellPage.returnFlight3.click();
    browser.waitForAngular();
  });

  it('click shopping cart button', function(){
    console.log("tenth test");
    upsellPage.shoppingCartButton.click();
  });

  it('enter first name', function(){
    console.log("eleventh test");
    passengerPage.firstName0.click();
    passengerPage.firstName0.sendKeys('Name');
  });

  it('enter last name', function(){
    console.log("twelvth test");
    passengerPage.lastName0.click();
    passengerPage.lastName0.sendKeys('McNameface');
  });

  it('enter gender', function(){
    console.log("thirteenth test");
    passengerPage.gender0.click();
    passengerPage.genderDropDownMale.click();
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
    browser.sleep(10000);
  });

});
