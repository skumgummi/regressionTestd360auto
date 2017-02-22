var paymentPage = function(){
  this.creditcardForm = element(by.id('pan_visible'));
  this.nameForm = element(by.id('owner_visible'));
  this.expiryDateForm = element(by.id('idEndDate'));
  this.cvvForm = element(by.id('cvv'));
  this.addressForm = element(by.id('saddr'));
  this.postalcodeForm = element(by.id('postalcode'));

  this.checkBox = element(by.css('.icon-ok'));
  this.payNowButton = element(by.css('input[value="PAY NOW"]'));

  this.reviewButton = element(by.buttonText('REVIEW'));

};
module.exports = new paymentPage();
