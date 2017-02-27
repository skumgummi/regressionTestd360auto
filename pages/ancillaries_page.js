var ancillariesPage = function(){
  this.shoppingCartButton = element(by.buttonText('CONTINUE'));

  this.selectSeatButton = element(by.css('img[src="images/seat-img.jpg"]'));
  this.selectSeatOutbound = element(by.xpath("//*[@id="segment-container"]/div[2]/ul/li[1]/a"));
  this.selectSeatReturn = element(by.xpath("//*[@id="segment-container"]/div[2]/ul/li[2]/a"));

  this.selectBagsButton = element(by.css('img[src="images/bag-img.jpg"]'));
  this.addBaggageOutbound = element(by.id('add_0_0'));
  this.removeBaggageOutbound = element(by.id('remove_0_0'));
  this.addBaggageReturn = element(by.id('add_0_1'));
  this.removeBaggageReturn = element(by.id('remove_0_1'));
  this.bagAddToBooking = element(by.binding('translation["ancillaryxbags.addToBooking"]'));
  this.freeBaggageInfo = element(by.binding('translation["ancillaryxbags.freeBaggageInfo"]'));
  this.bagCancelButton = element(by.binding('translation["ancillaryxbags.cancel"]'));

  this.addMealButton = element(by.css('img[alt="Select Meal"]'));

  //Got stuck on the buttons used to switch between outbound and return flight, no unique identifiers?

};
module.exports = new ancillariesPage();
