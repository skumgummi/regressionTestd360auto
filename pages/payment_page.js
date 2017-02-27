var paymentPage = function(){

  /*
  this.creditcardForm = element(by.input('Card number'));
  this.nameForm = element(by.id('owner_visible'));
  this.expiryDateForm = element(by.id('idEndDate'));
  this.cvvForm = element(by.id('cvv'));
  */


  this.addressForm = element(by.id('saddr'));
  this.postalcodeForm = element(by.id('postalcode'));
  this.cityForm = element(by.id('city'));
  this.countryForm = element(by.id('country'));

  this.checkBox = element(by.css('.icon-ok'));
  this.payNowButton = element(by.css('input[value="PAY NOW"]'));

  this.reviewButton = element(by.buttonText('REVIEW'));

  //this is an iframe, but is it from SIP or just from a credit card service? If SIP, it will need to be replaced when SIP is bypassed.
  this.creditCardFrame = element(by.id('creditCardFrame'));
  this.paxDetails = element(by.css('.paxDetails'));
  this.interTotalPrize = element(by.css('.interTotalPrize.pull-right'));
  this.inputAcceptCheckBox = element(by.id('checkbox111'));
  this.reservationNumber = element(by.binding('reservation.airlineBookingReference'));
  this.insuranceRadioOptions = element(by.css('#readytoPayRadio'));
  


  this.visa = function() {
    browser.waitForAngular();
	  browser.driver.switchTo().frame("creditCardFrame");

    var creditCardBox = browser.driver.findElement(protractor.By.id('pan_visible'));
    var idEndDate = browser.driver.findElement(protractor.By.id('idEndDate'));
    var ownerVisible = browser.driver.findElement(protractor.By.id('owner_visible'));
    var cvv = browser.driver.findElement(protractor.By.id('cvv'));
    

    //browser.driver.switchTo().frame(0);
    creditCardBox.sendKeys('4111111111111111');
    expect(creditCardBox.getAttribute('value')).toBe('4111 1111 1111 1111', 'credit card number in box doesnt match number entered!');
    idEndDate.sendKeys('08/18');
    expect(idEndDate.getAttribute('value')).toBe('08/18', 'end date in box doesnt match end date entered!');
    ownerVisible.sendKeys('Emil Burman');
    expect(ownerVisible.getAttribute('value')).toBe('Emil Burman','owner name in box doesnt match name entered!');
    cvv.sendKeys('737');
    expect(cvv.getAttribute('value')).toBe('737','cvv numbers in box dont match numbers entered!');
    browser.driver.switchTo().defaultContent();

	}


};
module.exports = new paymentPage();
