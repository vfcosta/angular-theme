var browserTesting = require('@angular/platform-browser-dynamic/testing');
var coreTesting = require('@angular/core/testing');
coreTesting.TestBed.initTestEnvironment(browserTesting.BrowserDynamicTestingModule,
                                        browserTesting.platformBrowserDynamicTesting());