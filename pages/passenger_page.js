var passengerPage = function(){
  this.firstName0 = element(by.id('firstName0'));
  this.lastName0 = element(by.id('lastName0'));
  this.gender0 = element(by.id('genderr0'));
  this.firstName1 = element(by.id('firstName1'));
  this.lastName1 = element(by.id('lastName1'));
  this.gender1 = element(by.id('genderr1'));
  this.genderDropDownMale = element(by.binding('booking.passenger.male'));
  this.genderDropDownFemale = element(by.binding('booking.passenger.female'));
  this.email0 = element(by.id('email0'));
  this.phone0 = element(by.id('phoneNumber0'));

  this.goToPaymentButton = element(by.id('goToPayment'));

};
module.exports = new passengerPage();
