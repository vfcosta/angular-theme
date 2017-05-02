var path = require('path');

import { browser, element, by } from "protractor";

fdescribe('Noosfero Home', () => {

    beforeEach(() => {
        browser.get('/adminuser');
    });

    it('should change top profile image', function() {
        element(by.css('#navbar .login')).click();
        var email = element(by.css('#email'));
        email.sendKeys("adminuser");
        var password = element(by.css('#passwd'));
        password.sendKeys("123456");
        element(by.css('.btn-login')).click();

        element(by.css('image-upload .fa.fa-camera.upload-camera')).click();

        var file = './assets/top-profile-image.png';
        element(by.css('label > input[type="file"]')).sendKeys(path.resolve(__dirname, file));
        expect(element(by.css('noosfero-profile-header .profile-header')).getCssValue('background-image')).toContain('adminuser_top-profile-image.png');
    });

});
