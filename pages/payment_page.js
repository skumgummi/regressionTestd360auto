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

  this.visa = function() {
    browser.waitForAngular();
	  browser.driver.switchTo().frame("creditCardFrame");
    //browser.driver.switchTo().frame(0);
    browser.driver.findElement(protractor.By.id('pan_visible')).sendKeys('4111111111111111');
    browser.driver.findElement(protractor.By.id('idEndDate')).sendKeys('08/18');
    browser.driver.findElement(protractor.By.id('owner_visible')).sendKeys('Emil Burman');
    browser.driver.findElement(protractor.By.id('cvv')).sendKeys('737');
    browser.driver.switchTo().defaultContent();

	}


};
module.exports = new paymentPage();
