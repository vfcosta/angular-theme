describe('Noosfero Home', function () {

  beforeEach(function() {
    browser.get('/');
  });

  it('should have a logo', function() {
    expect(element.all(by.css('.navbar-header .noosfero-logo')).count()).toEqual(1);
  });

  it('display modal when click on login button', function() {
    element(by.css('#navbar .login')).click();
    expect(element.all(by.css('.modal-body .login-form')).count()).toEqual(1);
  });

  it('display button to signup', function() {
    element(by.css('#navbar .signup')).click();

  });

});
