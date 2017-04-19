exports.config = {
  framework: 'jasmine',
  specs: ['e2e/**/*.js'],
  directConnect: true,
  baseUrl: 'http://localhost:3001',
  rootElement: 'body',
  onPrepare: function() {
    browser.manage().timeouts().implicitlyWait(25000);
    browser.ignoreSynchronization = true;
  },
}

