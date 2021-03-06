// spec.js
describe('Protractor test', function() {

  var openLogin = element(by.binding('LoginTxt'));
  var emailField = element(by.id('loginEmailAddress'));
  var pwdField = element(by.id('loginPassword'));
  var submit = element(by.css('.btn.btn-blue.login-button-blue.mt0'));
  var userDash = element(by.id('proDashToggle'));
  var logoutButton = element(by.partialLinkText('Log out'));

  var username =  "valid@mail.com";
  var password = "pass123";

  //run before any tests
 /* beforeAll(function(){
    console.log("yo");
  });*/

  //run right before each test
/*  beforeEach(function(){
    console.log("yo");
  });*/
  

  it('login with email then logout', function() {
    browser.get('https://d360u.flysas.com/se-en');
    browser.waitForAngular();
    
    openLogin.click();
    
    emailField.sendKeys(username);
    pwdField.sendKeys(password);
    
    submit.click();
    browser.waitForAngular();
    expect(browser.getTitle()).toEqual('Super Calculator');
    //userDash.click();
    logoutButton.click();


  });

  /*
  it('logout user', function() {
    browser.get('https://d360u.flysas.com/se-en');
    browser.sleep(10000);
    userDash.click();
    logoutButton.click();
  })
  */

  it('login with EB then logout', function() {
    browser.get('https://d360u.flysas.com/se-en');
    browser.waitForAngular();

    openLogin.click();

    emailField.sendKeys('700005002');
    pwdField.sendKeys('123abc');

    submit.click();

    browser.waitForAngular();

    //userDash.click();
    logoutButton.click();
  });
});
