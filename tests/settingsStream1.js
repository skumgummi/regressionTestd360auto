describe ('settings stream 1', function(){

var homePage = require('../pages/home_page.js');
var profilePage = require('../pages/profile_page.js');

var username = "qwertyu@xyz.com";
var password = "123abc";
var newPassword = "banan123";

beforeAll(function(){
  console.log("before all running!");
  browser.get('https://d360u.flysas.com/se-en');
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  browser.waitForAngular();
});

it('Login user', function(){
  homePage.loginLink.click();
  homePage.emailField.click();
  homePage.emailField.sendKeys(username);
  homePage.passwordField.click();
  homePage.passwordField.sendKeys(password);
  homePage.loginButton.click();
});

it('click settings', function(){
  profilePage.mySettingsButton.click();
});

it('change password', function(){
  profilePage.changePasswordButton.click();
  profilePage.currentPasswordInput.click();
  profilePage.currentPasswordInput.sendKeys(password);
  profilePage.newPassword.click();
  profilePage.newPassword.sendKeys(newPassword);
  profilePage.newPasswordConfirm.click();
  profilePage.newPasswordConfirm.sendKeys(newPassword);
  profilePage.newPasswordSubmit.click();
  browser.waitForAngular();
  profilePage.changePasswordXButton.click();
});

it('logout', function(){
  profilePage.logoutButton.click();
});

it('Login user with new password', function(){
  homePage.loginLink.click();
  homePage.emailField.click();
  homePage.emailField.sendKeys(username);
  homePage.passwordField.click();
  homePage.passwordField.sendKeys(newPassword);
  homePage.loginButton.click();
});

it('click settings', function(){
  profilePage.mySettingsButton.click();
});

it('change password to old password', function(){
  profilePage.changePasswordButton.click();
  profilePage.currentPasswordInput.click();
  profilePage.currentPasswordInput.sendKeys(newPassword);
  profilePage.newPassword.click();
  profilePage.newPassword.sendKeys(password);
  profilePage.newPasswordConfirm.click();
  profilePage.newPasswordConfirm.sendKeys(password);
  profilePage.newPasswordSubmit.click();
  browser.waitForAngular();
  profilePage.changePasswordXButton.click();
});

it('logout', function(){
  profilePage.logoutButton.click();
});

});
