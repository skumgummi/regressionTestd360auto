var homePage = function(){

  this.cookieButton = element(by.id('closeButton'));

  this.openTravelers = element(by.binding('translation["booking.cep.travellers"]'));
  this.openOrigin = element(by.id('select-origin'));
  this.openDestination = element(by.id('select-destination'));
  this.openDates = element(by.id('datesTab'));
  this.selectOutboundDate = element(by.binding('onwardMonthAndDate'));
  this.selectReturnDate = element(by.binding('returnMonthAndDate'));
  this.addAdult = element(by.id('addAdults'));
  this.removeAdult =  element(by.id('removeAdults'));
  this.addInfant = element(by.id('addInfants'));
  this.removeInfant = element(by.id('removeInfants'));
  this.addChild = element(by.id('addChildren'));
  this.removeChild = element(by.id('removeChildren'));
  this.loginLink = element(by.id('ocpWidget_login'));
  this.registerButton = element(by.id('ocpWidget_register'));
  this.emailField = element(by.id('loginEmailAddress'));
  this.passwordField = element(by.id('loginPassword'));
  this.loginButton = element(by.css('.btn.btn-blue.login-button-blue.mt0'));

  this.hamburgerMenu = element(by.id('maincontent')); //Menu in the top left (CMS)
  this.travelClasses = element(by.css('a[title="Travel classes"]'));
  this.ourAircraft = element(by.css('a[title="Our aircraft"]'));
  this.inflight = element(by.css('a[title="Inflight"]'));
  this.sasYouth = element(by.css('a[title="SAS Youth"]'));
  this.groupTrips = element(by.css('a[title="Group trips"]'));
  this.travelExtras = element(by.css('a[title="Travel extras"]'));
  this.charter = element(by.css('a[title="Charter"]'));
  this.other = element(by.css('a[title="Other"]'));
  this.baggage = element(by.css('a[title="Baggage"]'));
  this.checkIn = element(by.css('a[title="Check in"]'));
  this.flightStatus = element(by.css('a[title="Flight status"]'));
  this.passportVisa = element(by.css('a[title="Passport & visa"]'));
  this.atTheAirport = element(by.css('a[title="At the airport"]'));
  this.mobileServices = element(by.css('a[title="Mobile services"]'));
  this.childrenAnimals = element(by.css('a[title="Travel with children or animals"]'));
  this.assistance = element(by.css('a[title="Assistance"]'));
  this.serviceFeedback = element(by.css('a[title="Service and feedback"]'));
  this.termsAndConditions = element(by.css('a[title="Terms and conditions"]'));
  this.becomeAMember = element(by.css('a[title="Become a member"]'));
  this.aboutTheProgram = element(by.css('a[title="About the program"]'));
  this.membershipLevels = element(by.css('a[title="Membership levels"]'));
  this.earnPoints = element(by.css('a[title="Earn points"]'));
  this.usingPoints = element(by.css('a[title="Using points"]'));
  this.pointsCharts = element(by.css('a[title="Points charts"]'));
  this.travelCash = element(by.css('a[title="Travel Cash"]'));
  this.registerMissingPoints = element(by.css('a[title="Register missing points"]'));
  this.partnerindexTest = element(by.css('a[title="Partnerindex-test"]'));
  this.information = element(by.css('a[title="Information"]'));
  this.becomeACorporateCustomer = element(by.css('a[title="Become a corporate customer"]'));
  this.sasCredits = element(by.css('a[title="SAS Credits"]'));
  this.travelPassCorporate = element(by.css('a[title="Travel Pass Corporate"]'));
  this.moreWaysToTravelSmart = element(by.css('a[title="More ways to travel smart"]'));
  this.news = element(by.css('a[title="News"]'));

  //placeholder dates!
  this.setOutbound = function() {
    otbDate = "1";
    element.all(by.linkText(otbDate)).first().click();
    browser.driver.sleep(400);
  }

  this.setInbound = function() {
    otbDate = "5";
    element.all(by.linkText(otbDate)).first().click();
    browser.driver.sleep(400);
  }

  this.clickForwardButton = function() {
   //var fwdButton = element(by.css('.cepArrow.center-block'));
   var fwdButton = element(by.css('.sas-cep-arrow.center-block'));
   fwdButton.click();
   return require('./upsell_page.js');
 }

};
module.exports = new homePage();
