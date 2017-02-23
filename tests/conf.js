var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  framework: 'jasmine2',
  capabilities: {
		'browserName': 'chrome'
	},
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['bookStreamProof.js'],
  
  onPrepare: function() {
   	
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: 'target/screenshots'
        })
      );
   }
};