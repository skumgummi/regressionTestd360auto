var myTripsPage = function(){

  var helperFunctions = require('../helpers/helperFunctions.js');

  this.cancelBooking = element(by.xpath('//*[@id="mmbOverlayModalDialog"]/div/div/div/div/div[3]/div/div/div[2]/div[2]/div[2]/div[2]/a'));
  this.xButton = element(by.xpath('//*[@id="mmbOverlayModalDialog"]/div/div/div/span'));
  this.changeBooking = element(by.xpath('//*[@id="mmbOverlayModalDialog"]/div/div/div/div/div[3]/div/div/div[2]/div[2]/div[2]/div[1]/a'));
  this.bookingReferenceWindow = element(by.id('bookingReferenceMobile'));
  this.lastNameWindow = element(by.id('lastName'));
  this.arrowButton = element(by.xpath('//*[@id="isolationWrap"]/div/div/div[2]/div/div[1]/div[1]/div[3]/form/div[2]'));
  this.buySeatButton = element(by.css('.tripDetailsBuySeats'));

};
module.exports = new myTripsPage();
