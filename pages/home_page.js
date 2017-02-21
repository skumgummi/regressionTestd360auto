var homePage = function(){
  this.openTravelers = element(by.binding('translation["booking.cep.travellers"]'));
  this.openOrigin = element(by.id('select-origin'));
  this.openDestination = element(by.id('select-destination'));
  this.openDates = element(by.partialLinkText('Dates'));
  this.selectOutboundDate = element(by.binding('onwardMonthAndDate'));
  this.selectReturnDate = element(by.binding('returnMonthAndDate'));

};
module.exports = new homePage();
