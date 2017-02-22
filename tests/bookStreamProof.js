describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');
var upsellPage = require('../pages/upsell_page.js');

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  browser.waitForAngular();
});

  it('select amount of passengers',  function(){
    homePage.openTravelers.click();

  });

  it('select origin', function(){
    homePage.openOrigin.click();
    homePage.openOrigin.sendKeys('ARN');
    homePage.openOrigin.sendKeys(protractor.Key.ENTER);
  });

  it('select destination', function(){
    homePage.openDestination.click();
    homePage.openDestination.sendKeys('LHR');
    homePage.openDestination.sendKeys(protractor.Key.ENTER);
  });

  it('select dates', function(){
    homePage.openDates.click();
    homePage.setOutbound();
    browser.waitForAngular();
    homePage.setInbound();
  });

  it('Click forward button', function(){
    homePage.clickForwardButton();
  });

  it('accept cookies', function(){
    upsellPage.cookieButton.click();
  });

  it('select outbound flight', function(){
    upsellPage.flight1.click();
  });

  it('click shopping cart button', function(){
    upsellPage.shoppingCartButton.click();
  });

  it('select return flight', function(){
    upsellPage.returnFlight7.click();
  });

  it('click shopping cart button', function(){
    upsellPage.shoppingCartButton.click();
  });
});
