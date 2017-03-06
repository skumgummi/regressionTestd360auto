var upsellPage = function(){
  /*
   * Outbound flights
   */
  this.flight1 = element(by.id('GO1'));
  this.flight2 = element(by.id('GO2'));
  this.flight3 = element(by.id('GO3'));
  this.flight4 = element(by.id('GO4'));
  this.flight5 = element(by.id('GO5'));
  this.flight6 = element(by.id('GO6'));
  this.flight7 = element(by.id('GO7'));

  /*
   * Return flights
   */
  this.returnFlight1 = element(by.id('GOReturn1'));
  this.returnFlight2 = element(by.id('GOReturn2'));
  this.returnFlight3 = element(by.id('GOReturn3'));
  this.returnFlight4 = element(by.id('GOReturn4'));
  this.returnFlight5 = element(by.id('GOReturn5'));
  this.returnFlight6 = element(by.id('GOReturn6'));
  this.returnFlight7 = element(by.id('GOReturn7'));

  this.shoppingCartButton = element(by.id('shoppingcrtbtn'));
  this.cookieButton = element(by.id('closeButton'));
};
module.exports = new upsellPage();
