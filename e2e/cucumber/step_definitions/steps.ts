import { defineSupportCode } from 'cucumber';
import { browser, element, by } from "protractor";

let path = require('path');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
let expect = chai.expect;

defineSupportCode(function ({ Given, Then, When, setDefaultTimeout }) {
    setDefaultTimeout(10000);

    Given('I go to the homepage', () => {
        return browser.get('/');
    });

    Given('I follow {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        element(by.css('#navbar .login')).click();
        return expect(element.all(by.css('.modal-body .login-form')).count()).to.eventually.equal(1);
    });

    Given('I fill in the following:', (table, callback) => {
        for (let line of table.raw()) {
            element(by.css(line[0])).sendKeys(line[1]);
        };
        callback();
    });

    When('I press {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return element(by.css(stringInDoubleQuotes)).click();
    });

    Then('I should be logged in as {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return expect(element(by.css('#navbar .profile-link .truncated-profile-name')).getText()).to.eventually.equal(stringInDoubleQuotes);
    });

    Given('I login with {stringInDoubleQuotes}, {stringInDoubleQuotes}', (user: string, password: string) => {
        return element(by.css('#navbar .login')).click().then(() => {
            return element(by.css(".modal-dialog #email")).sendKeys(user);
        }).then(() => {
            return element(by.css(".modal-dialog #passwd")).sendKeys(password);
        }).then(() => {
            return element(by.css(".btn-login")).click();
        });
    });

    Given('I go to {stringInDoubleQuotes} profile', (profile) => {
        return browser.setLocation(`/${profile}`);
    });

    Given('I enter in edit mode', () => {
        return element(by.css(".button-edit-mode")).click();
    });

    Given('I upload {stringInDoubleQuotes} to {stringInDoubleQuotes}', (file, selector) => {
        return element(by.css(selector)).sendKeys(path.resolve(__dirname, `../../assets/${file}`));
    });

    Then('I see {stringInDoubleQuotes} as top image', (image) => {
        return expect(element(by.css('noosfero-profile-header .profile-header')).getCssValue('background-image')).to.eventually.contain(image);
    });

    Given('I am logged out', () => {
        return element(by.css("#navbar .profile-menu > .profile-link")).isDisplayed().then((visible) => {
            if (visible) {
                return element(by.css("#navbar .profile-menu > .profile-link")).click().then(() => {
                    return element(by.css("#navbar .btn-logout")).click();
                });
            }
        });
    });

    When('I change layout to {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return element(by.css("#layout-config-btn")).click().then(() => {
            return element(by.css(`.layout-config .dropdown-menu .layout-${stringInDoubleQuotes} a.dropdown-item`)).click();
        });
    });

    Then('I see {stringInDoubleQuotes} {int} times', (selector, amount) => {
        return expect(element.all(by.css(selector)).count()).to.eventually.equal(amount);
    });
});
