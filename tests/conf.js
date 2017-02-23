exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['bookStreamProof.js'],
  capabilities: {
		'browserName': 'chrome'
	}
};
