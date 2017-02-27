var ancillariesPage = function(){
  this.shoppingCartButton = element(by.buttonText('CONTINUE'));

  this.selectSeatButton = element(by.css('img[src="images/seat-img.jpg"]'));
  this.selectSeatOutbound = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[1]/a'));
  this.selectSeatReturn = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[2]/a'));

  this.selectBagsButton = element(by.css('img[src="images/bag-img.jpg"]'));
  this.addBaggageOutbound = element(by.id('add_0_0'));
  this.removeBaggageOutbound = element(by.id('remove_0_0'));
  this.addBaggageReturn = element(by.id('add_0_1'));
  this.removeBaggageReturn = element(by.id('remove_0_1'));
  this.bagAddToBooking = element(by.binding('translation["ancillaryxbags.addToBooking"]'));
  this.freeBaggageInfo = element(by.binding('translation["ancillaryxbags.freeBaggageInfo"]'));
  this.bagCancelButton = element(by.binding('translation["ancillaryxbags.cancel"]'));

  this.addMealButton = element(by.css('img[alt="Select Meal"]'));
  this.selectMealOutbound = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[1]/a'));
  this.selectMealReturn = element(by.xpath('//*[@id="segment-container"]/div[2]/ul/li[2]/a'));
  this.mealDropDown = element(by.css('.btn.btn-default.paidMealsBtn'));
  this.mealDropDown1 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[2]'));
  this.mealDropDown2 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[3]'));
  this.mealDropDown2 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[4]'));
  this.mealDropDown2 = element(by.xpath('//*[@id="segment-container"]/div[4]/div[1]/div[1]/div/div[2]/div/ul/li[5]'));

  //Got stuck on the buttons used to switch between outbound and return flight, no unique identifiers? trying xpath

};
module.exports = new ancillariesPage();
