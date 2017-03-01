var passengerPage = function(){
  this.firstName0 = element(by.id('firstName0'));
  this.lastName0 = element(by.id('lastName0'));
  this.firstName1 = element(by.id('firstName1'));
  this.lastName1 = element(by.id('lastName1'));
  this.firstName2 = element(by.id('firstName2'));
  this.lastName2 = element(by.id('lastName2'));
  this.firstName3 = element(by.id('firstName3'));
  this.lastName3 = element(by.id('lastName3'));
  this.firstName4 = element(by.id('firstNam4'));
  this.lastName4 = element(by.id('lastName4'));
  this.firstName5 = element(by.id('firstName5'));
  this.lastName5 = element(by.id('lastName5'));
  this.firstName6 = element(by.id('firstName6'));
  this.lastName6 = element(by.id('lastName6'));
  this.firstName7 = element(by.id('firstName7'));
  this.lastName7 = element(by.id('lastName7'));


  this.gender0 = element(by.id('genderr0'));
  this.gender1 = element(by.id('genderr1'));
  this.gender2 = element(by.id('genderr2'));
  this.gender3 = element(by.id('genderr3'));
  this.gender4 = element(by.id('genderr4'));
  this.gender5 = element(by.id('genderr5'));
  this.gender6 = element(by.id('genderr6'));
  this.gender7 = element(by.id('genderr7'));

  this.dob0 = element(by.id('dateOfBirth0'));
  this.dob1 = element(by.id('dateOfBirth1'));
  this.dob2 = element(by.id('dateOfBirth2'));
  this.dob3 = element(by.id('dateOfBirth3'));
  this.dob4 = element(by.id('dateOfBirth4'));
  this.dob5 = element(by.id('dateOfBirth5'));
  this.dob6 = element(by.id('dateOfBirth6'));
  this.dob7 = element(by.id('dateOfBirth7'));

  this.gender0DropDownMale = element(by.xpath('//*[@id="genderDropdown"]/li[1]'));
  this.gender0DropDownFemale = element(by.binding('booking.passenger.female'));
  this.email0 = element(by.id('email0'));
  this.phone0 = element(by.id('phoneNumber0'));

  this.goToPaymentButton = element(by.id('goToPayment'));

};
module.exports = new passengerPage();
