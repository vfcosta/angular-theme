let path = require('path');

import { browser, element, by } from "protractor";

fdescribe('Noosfero Home', () => {

    beforeEach(() => {
        browser.get('/adminuser');
    });

    it('should change top profile image', function() {
        element(by.css('#navbar .login')).click();
        let email = element(by.css('#email'));
        email.sendKeys("adminuser");
        let password = element(by.css('#passwd'));
        password.sendKeys("admin");
        element(by.css('.btn-login')).click();
        browser.sleep(1000);
        element(by.css('noosfero-top-profile-image image-upload .upload-camera')).click();

        let file = './assets/top-profile-image.png';
        element(by.css('noosfero-top-profile-image img-cropper input[type="file"]')).sendKeys(path.resolve(__dirname, file));
        // browser.pause();
        element(by.css('noosfero-top-profile-image image-upload .btn-upload')).click();
        expect(element(by.css('noosfero-profile-header .profile-header')).getCssValue('background-image')).toContain('adminuser_top-profile-image.png');
    });

});
