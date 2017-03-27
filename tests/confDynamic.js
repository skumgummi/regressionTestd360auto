var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var d = new Date();
var cTime = d.getHours();
var date = d.getFullYear()+'_'+d.getMonth()+'_'+d.getDate();
date = date.replace(/:/gi, '');
date = date.replace(/ /gi, '_');

exports.config = {
  allScriptsTimeout: 50000,
  framework: 'jasmine2',
  capabilities: {
		'browserName': 'chrome'
	},
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  suites: {
    bookingStream: 'bookStreamDynamic.js',
    ocp: 'ocpStreamIFrames.js',
    checkLinks404: 'checkAllLinksTestv3.js'  
  },
  

  onPrepare: function() {

   	  console.log(date);
      date='screenshots/'+date;

      jasmine.getEnv().addReporter(

        new Jasmine2HtmlReporter({
          //savePath: date,
          savePath: 'reports',
          cleanDestination: false,
          fileNamePrefix: 'D360'
        })

      );
   }
};
