import { browser, element, by } from "protractor";

describe('Noosfero Home', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a logo', () => {
    expect(element.all(by.css('.navbar-header .noosfero-logo')).count()).toEqual(1);
  });

  it('display modal when click on login button', () => {
    element(by.css('#navbar .login')).click();
    expect(element.all(by.css('.modal-body .login-form')).count()).toEqual(1);
  });

  it('display button to signup', () => {
    element(by.css('#navbar .signup')).click();
  });

});
