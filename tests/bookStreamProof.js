describe ('booking stream', function(){

var homePage = require('../pages/home_page.js');

beforeAll(function(){
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
});
