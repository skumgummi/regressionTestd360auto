describe('cms stream', function(){
  var homePage = require('../pages/home_page.js');

  beforeAll(function(){
    console.log("before all running!");
    browser.get('https://d360u.flysas.com/se-en');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    browser.waitForAngular();
  });

  clickHamburger = function(){
    homePage.hamburgerMenu.click();
  }

  it('Accept cookies', function(){
    console.log('accepting cookies');
    homePage.cookieButton.click();
  });

  it('click Travel classes', function(){
    console.log('1');
    clickHamburger();
    homePage.travelClasses.click();
  });

  it('click Our aircraft', function(){
    console.log('1');
    clickHamburger();
    homePage.ourAircraft.click();
  });

  it('click Inflight', function(){
    console.log('2');
    clickHamburger();
    homePage.inflight.click();
  });

  it('click SAS youth', function(){
    console.log('3');
    clickHamburger();
    homePage.sasYouth.click();
  });

  it('click Group trips', function(){
    console.log('4');
    clickHamburger();
    homePage.groupTrips.click();
  });

  it('click Travel extras', function(){
    console.log('5');
    clickHamburger();
    homePage.travelExtras.click();
  });

  it('click Group trips', function(){
    console.log('6');
    clickHamburger();
    homePage.groupTrips.click();
  });

  it('click Charters', function(){
    console.log('7');
    clickHamburger();
    homePage.charter.click();
  });

  it('click Other', function(){
    console.log('8');
    clickHamburger();
    homePage.other.click();
  });

  it('click Baggage', function(){
    console.log('9');
    clickHamburger();
    homePage.baggage.click();
  });

  it('click Check In', function(){
    console.log('10');
    clickHamburger();
    homePage.checkIn.click();
  });

  it('click Flight status', function(){
    console.log('11');
    clickHamburger();
    homePage.flightStatus.click();
  });

  it('click Passport & visa', function(){
    console.log('12');
    clickHamburger();
    homePage.passportVisa.click();
  });

  it('click At the airport', function(){
    console.log('13');
    clickHamburger();
    homePage.atTheAirport.click();
  });

  it('click Mobile services', function(){
    console.log('14');
    clickHamburger();
    homePage.mobileServices.click();
  });

  it('click Travel with children and animals', function(){
    console.log('15');
    clickHamburger();
    homePage.childrenAnimals.click();
  });

  it('click Assistance', function(){
    console.log('16');
    clickHamburger();
    homePage.assistance.click();
  });

  it('click Service and feedback', function(){
    console.log('17');
    clickHamburger();
    homePage.serviceFeedback.click();
  });

  it('click Terms and conditions', function(){
    console.log('18');
    clickHamburger();
    homePage.termsAndConditions.click();
  });

  it('click become a memeber', function(){
    console.log('19');
    clickHamburger();
    homePage.becomeAMember.click();
  });

  it('click About the program', function(){
    console.log('20');
    clickHamburger();
    homePage.aboutTheProgram.click();
  });

  it('click Membership levels', function(){
    console.log('21');
    clickHamburger();
    homePage.membershipLevels.click();
  });

  it('click Earn points', function(){
    console.log('22');
    clickHamburger();
    homePage.earnPoints.click();
  });

  it('click Using points', function(){
    console.log('23');
    clickHamburger();
    homePage.usingPoints.click();
  });

  it('click Points charts', function(){
    console.log('24');
    clickHamburger();
    homePage.pointsCharts.click();
  });

  it('click Travel cash', function(){
    console.log('25');
    clickHamburger();
    homePage.travelCash.click();
  });

  it('click Register missing points', function(){
    console.log('26');
    clickHamburger();
    browser.executeScript("arguments[0].scrollIntoView();", homePage.registerMissingPoints.getWebElement());
    homePage.registerMissingPoints.click();
  });

  it('click Partnerindex-test', function(){
    console.log('27');
    clickHamburger();
    homePage.partnerindexTest.click();
  });

  it('click Information', function(){
    console.log('28');
    clickHamburger();
    homePage.information.click();
  });

  it('click Become a corporate customer', function(){
    console.log('29');
    clickHamburger();
    homePage.becomeACorporateCustomer.click();
  });

  it('click SAS credits', function(){
    console.log('30');
    clickHamburger();
    homePage.sasCredits.click();
  });

  it('click Travel pass corporate', function(){
    console.log('31');
    clickHamburger();
    homePage.travelPassCorporate.click();
  });

  it('click More ways to travel smart', function(){
    console.log('32');
    clickHamburger();
    homePage.moreWaysToTravelSmart.click();
  });

  it('Click News', function(){
    console.log('33');
    clickHamburger();
    homePage.news.click();
  });

});
