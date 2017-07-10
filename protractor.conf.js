exports.config = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu" ]
    }
  },
  useAllAngular2AppRoots: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ['e2e/cucumber/features/**/*.feature'],
  directConnect: false,
  baseUrl: 'http://localhost:3001',
  rootElement: 'body',
  cucumberOpts: {
    require: ['e2e/cucumber/step_definitions/**/*.ts'],  // require step definition files before executing features
    tags: '~@skip',                      // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    strict: true,                  // <boolean> fail if there are any undefined or pending steps
    format: ["pretty"],            // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    dryRun: false,                 // <boolean> invoke formatters without executing steps
    compiler: "ts:ts-node/register"                   // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
  }
}
