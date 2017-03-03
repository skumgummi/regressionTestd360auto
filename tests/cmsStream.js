describe('cms stream', function(){
  var homePage = require('../pages/home_page.js');

  beforeAll(function(){
    console.log("before all running!");
    browser.get('https://d360u.flysas.com/se-en');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    browser.waitForAngular();

    if(homePage.cookieButton.isPresent()){
      console.log('accepting cookies');
      homePage.cookieButton.click();
    }
  });

  afterAll(function() {
    browser.driver.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  clickHamburger = function(){
    homePage.hamburgerMenu.click();
  }

  it('click Travel classes', function(){
    console.log('1');
    clickHamburger();
    homePage.travelClasses.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('travel-classes')).toBe(true);
    });
  });

  it('click Our aircrafts', function(){
    console.log('1');
    clickHamburger();
    homePage.ourAircraft.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('our-aircrafts')).toBe(true);
    });
  });

  it('click Inflight', function(){
    console.log('2');
    clickHamburger();
    homePage.inflight.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('inflight')).toBe(true);
    });
  });

  it('click SAS youth', function(){
    console.log('3');
    clickHamburger();
    homePage.sasYouth.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('sas-youth')).toBe(true);
    });
  });

  it('click Group trips', function(){
    console.log('4');
    clickHamburger();
    homePage.groupTrips.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('group-trips')).toBe(true);
    });
  });

  it('click Travel extras', function(){
    console.log('5');
    clickHamburger();
    homePage.travelExtras.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('travel-extras')).toBe(true);
    });
  });

  it('click Group trips', function(){
    console.log('6');
    clickHamburger();
    homePage.groupTrips.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('group-trips')).toBe(true);
    });
  });

  it('click Charter', function(){
    console.log('7');
    clickHamburger();
    homePage.charter.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('charter')).toBe(true);
    });
  });

  it('click Other', function(){
    console.log('8');
    clickHamburger();
    homePage.other.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('other')).toBe(true);
    });
  });

  it('click Baggage', function(){
    console.log('9');
    clickHamburger();
    homePage.baggage.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('baggage')).toBe(true);
    });
  });

  it('click Check In', function(){
    console.log('10');
    clickHamburger();
    homePage.checkIn.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('check-in')).toBe(true);
    });
  });

  it('click Flight status', function(){
    console.log('11');
    clickHamburger();
    homePage.flightStatus.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('flight-status')).toBe(true);
    });
  });

  it('click Passport & visa', function(){
    console.log('12');
    clickHamburger();
    homePage.passportVisa.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('passport-visa')).toBe(true);
    });
  });

  it('click At the airport', function(){
    console.log('13');
    clickHamburger();
    homePage.atTheAirport.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('at-airports')).toBe(true);
    });
  });

  it('click Mobile services', function(){
    console.log('14');
    clickHamburger();
    homePage.mobileServices.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('mobile-services')).toBe(true);
    });
  });

  it('click Travel with children and animals', function(){
    console.log('15');
    clickHamburger();
    homePage.childrenAnimals.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('travel-with-a-child-or-pet')).toBe(true);
    });
  });

  it('click Assistance', function(){
    console.log('16');
    clickHamburger();
    homePage.assistance.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('assistance')).toBe(true);
    });
  });

  it('click Service and feedback', function(){
    console.log('17');
    clickHamburger();
    homePage.serviceFeedback.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('service-and-feedback')).toBe(true);
    });
  });

  it('click Terms and conditions', function(){
    console.log('18');
    clickHamburger();
    homePage.termsAndConditions.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('terms-conditions')).toBe(true);
    });
  });

  it('click become a memeber', function(){
    console.log('19');
    clickHamburger();
    homePage.becomeAMember.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('become-a-member')).toBe(true);
    });
  });

  it('click About the program', function(){
    console.log('20');
    clickHamburger();
    homePage.aboutTheProgram.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('about-the-program')).toBe(true);
    });
  });

  it('click Membership levels', function(){
    console.log('21');
    clickHamburger();
    homePage.membershipLevels.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('membership-levels')).toBe(true);
    });
  });

  it('click Earn points', function(){
    console.log('22');
    clickHamburger();
    homePage.earnPoints.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('earn-points')).toBe(true);
    });
  });

  it('click Using points', function(){
    console.log('23');
    clickHamburger();
    homePage.usingPoints.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('using-points')).toBe(true);
    });
  });

  it('click Points charts', function(){
    console.log('24');
    clickHamburger();
    homePage.pointsCharts.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('point-tables')).toBe(true);
    });
  });

  it('click Travel cash', function(){
    console.log('25');
    clickHamburger();
    homePage.travelCash.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('travel-cash')).toBe(true);
    });
  });

  it('click Register missing points', function(){
    console.log('26');
    clickHamburger();
    browser.executeScript("arguments[0].scrollIntoView();", homePage.registerMissingPoints.getWebElement());
    homePage.registerMissingPoints.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('register-missing-credits')).toBe(true);
    });
  });

  it('click Partnerindex-test', function(){
    console.log('27');
    clickHamburger();
    homePage.partnerindexTest.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('index-test')).toBe(true);
    });
  });

  it('click Information', function(){
    console.log('28');
    clickHamburger();
    homePage.information.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('information')).toBe(true);
    });
  });

  it('click Become a corporate customer', function(){
    console.log('29');
    clickHamburger();
    homePage.becomeACorporateCustomer.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('become-corporate-customer')).toBe(true);
    });
  });

  it('click SAS credits', function(){
    console.log('30');
    clickHamburger();
    homePage.sasCredits.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('sas-credits')).toBe(true);
    });
  });

  it('click Travel pass corporate', function(){
    console.log('31');
    clickHamburger();
    homePage.travelPassCorporate.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('travel-pass-corporate')).toBe(true);
    });
  });

  it('click More ways to travel smart', function(){
    console.log('32');
    clickHamburger();
    homePage.moreWaysToTravelSmart.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('more-ways-to-travel-smart')).toBe(true);
    });
  });

  it('Click News', function(){
    console.log('33');
    clickHamburger();
    homePage.news.click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.includes('news')).toBe(true);
    });
  });

});
