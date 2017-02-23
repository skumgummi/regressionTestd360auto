var paymentPage = function(){

  /*
  this.creditcardForm = element(by.input('Card number'));
  this.nameForm = element(by.id('owner_visible'));
  this.expiryDateForm = element(by.id('idEndDate'));
  this.cvvForm = element(by.id('cvv'));
  */


  this.addressForm = element(by.id('saddr'));
  this.postalcodeForm = element(by.id('postalcode'));

  this.checkBox = element(by.css('.icon-ok'));
  this.payNowButton = element(by.css('input[value="PAY NOW"]'));

  this.reviewButton = element(by.buttonText('REVIEW'));

  this.visa = function() {
	  //browser.driver.switchTo().frame("creditCardFrame");
    browser.driver.switchTo().frame(0);
      browser.driver.findElement(protractor.By.id('pan_visible')).sendKeys('7111111111111111');
      browser.driver.findElement(protractor.By.id('idEndDate')).sendKeys('08/18');
      browser.driver.findElement(protractor.By.id('owner_visible')).sendKeys('Name McNameface');
      browser.driver.findElement(protractor.By.id('cvv')).sendKeys('717');
      browser.driver.switchTo().defaultContent();

	}


};
module.exports = new paymentPage();
