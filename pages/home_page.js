var homePage = function(){
  this.openTravelers = element(by.binding('translation["booking.cep.travellers"]'));
  this.openOrigin = element(by.id('select-origin'));
  this.openDestination = element(by.id('select-destination'));
  this.openDates = element(by.id('datesTab'));
  this.selectOutboundDate = element(by.binding('onwardMonthAndDate'));
  this.selectReturnDate = element(by.binding('returnMonthAndDate'));
  this.addAdult = element(by.id('addAdults'));
  this.removeAdult =  element(by.id('removeAdults'));

  //placeholder dates!
  this.setOutbound = function() {
    otbDate = "1";
    element.all(by.linkText(otbDate)).first().click();
    browser.driver.sleep(400);
  }

  this.setInbound = function() {
    otbDate = "1";
    element.all(by.linkText(otbDate)).first().click();
    browser.driver.sleep(400);
  }

  this.clickForwardButton = function() {
   var fwdButton = element(by.css('.cepArrow.center-block'));
   fwdButton.click();
   return require('./upsell_page.js');
 }

};
module.exports = new homePage();
