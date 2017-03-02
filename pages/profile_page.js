var profilePage = function(){

this.mySettingsButton = element(by.xpath('//*[@id="profileDashboardView"]/div[2]/div[1]/div[2]/div/div[2]'));
this.changePasswordButton = element(by.id('changepassword'));
this.currentPasswordInput = element(by.id('CurrentPassword'));
this.newPassword = element(by.id('registerPassword'));
this.newPasswordConfirm = element(by.id('ConfirmPassword'));
this.newPasswordSubmit = element(by.id('submit-button'));
this.changePasswordXButton = element(by.xpath('//*[@id="changePwdClose"]/i'));

this.logoutButton = element(by.xpath('//*[@id="updateProfile"]/div/div[2]/div/a[3]'));

};
module.exports = new profilePage();
