import { defineSupportCode } from 'cucumber';
import { Http, Response } from '@angular/http';
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built';
import * as utils from './utils';

let path = require('path');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
let expect = chai.expect;

defineSupportCode(function ({ Given, Then, When, setDefaultTimeout }) {
    setDefaultTimeout(50000);

    Given('I go to the homepage', () => {
        return browser.get('/');
    });

    Then('I should be on the homepage', () => {
        return expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:49152/');
    });

    Then('I should be on {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        browser.waitForAngular();
        return expect(browser.getCurrentUrl()).to.eventually.equal(`http://localhost:49152${stringInDoubleQuotes}`);
    });

    Given('I follow {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return utils.pressButton(stringInDoubleQuotes);
    });

    Given('I fill in the following:', (table, callback) => {
        for (let line of table.raw()) {
            element(by.css(line[0])).sendKeys(line[1]);
        };
        callback();
    });

    Given('I pause', (callback) => {
        browser.pause();
    });

    When('I press {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return utils.pressButton(stringInDoubleQuotes);
    });

    When('I press first {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return element.all(by.css(stringInDoubleQuotes)).first().click();
    });

    Then('I should be logged in as {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return expect(element(by.css('#navbar .profile-link .truncated-profile-name')).getText()).to.eventually.equal(stringInDoubleQuotes);
    });

    Given('I login with {stringInDoubleQuotes}, {stringInDoubleQuotes}', (user: string, password: string) => {
        return utils.pressButton('#navbar .login').then(() => {
            return element(by.css(".modal-dialog #email")).sendKeys(user);
        }).then(() => {
            return element(by.css(".modal-dialog #passwd")).sendKeys(password);
        }).then(() => {
            return utils.pressButton(".btn-login");
        });
    });

    Given('I go to {stringInDoubleQuotes} profile', (profile) => {
        browser.waitForAngular();
        return browser.driver.get(`http://localhost:49152/${profile}`);
    });

    Given('I go to {stringInDoubleQuotes}', (page) => {
        browser.waitForAngular();
        return browser.driver.get(`http://localhost:49152${page}`);
    });

    Given('I enter in edit mode', () => {
        return utils.pressButton(".button-edit-mode");
    });

    Given('I enter in profile setup', () => {
        return utils.pressButton(".open-setup");
    });

    Given('I enter members menu', () => {
        return utils.pressButton("ul li .members");
    });

    Given('I upload {stringInDoubleQuotes} to {stringInDoubleQuotes}', (file, selector) => {
        return element(by.css(selector)).sendKeys(path.resolve(__dirname, `../../assets/${file}`));
    });

    Then('I see {stringInDoubleQuotes} as top image', (image) => {
        return expect(element(by.css('noosfero-profile-header .profile-header')).getCssValue('background-image')).to.eventually.contain(image);
    });

    Given('I am logged out', () => {
        return element(by.css("#navbar .profile-menu > .profile-link")).isPresent().then((present) => {
            if (present) {
                return utils.pressButton("#navbar .profile-menu > .profile-link").then(() => {
                    return utils.pressButton("#navbar .btn-logout");
                });
            }
        });
    });

    When('I change layout to {stringInDoubleQuotes}', (stringInDoubleQuotes) => {
        return utils.pressButton("#layout-config-btn").then(() => {
            return utils.pressButton(`.layout-config .dropdown-menu .layout-${stringInDoubleQuotes} a.dropdown-item`);
        });
    });

    Then('I see {stringInDoubleQuotes} {int} times', (selector, amount) => {
        return expect(element.all(by.css(selector)).count()).to.eventually.equal(amount);
    });

    Then('I see {stringInDoubleQuotes}', (selector) => {
        return expect(element.all(by.css(selector)).count()).to.eventually.equal(1);
    });

    Given('I enter text {stringInDoubleQuotes} to {stringInDoubleQuotes} input', (text, field) => {
        return element(by.css(field)).clear().then( () => { return element(by.css(field)).sendKeys(text); } );
    });

    When('I choose first element from typeahead', () => {
        return utils.pressButton("typeahead-container li:nth-child(1)>a");
    });

    Then('I see {stringInDoubleQuotes} as {stringInDoubleQuotes} value', (text, selector) => {
        return expect(element(by.css(selector)).getText()).to.eventually.equal(text);
    });

    Then('I should see success message', () => {
        return element(by.css(".toast-success")).isPresent();
    });

    Then('I eventually should see success message', () => {
        return browser.waitForAngular().then(() => {
            return expect(element(by.css(".toast-success")).isPresent()).to.eventually.equal(true);
        });
    });

    Then('I should see {stringInDoubleQuotes} as message', (message) => {
        return expect(element(by.css("#toast-container")).getText()).to.eventually.contain(message);
    });

    Then('I should see welcome message', () => {
        return expect(element(by.css("#toast-container")).getText()).to.eventually.contain("Bem vindo");
    });

    Given('I wait for angular to render', () => {
        return browser.waitForAngular();
    });

    Then('I should see profile removed message', () => {
        return expect(element(by.css("#toast-container")).getText()).to.eventually.contain("Perfil removido");
    });


    Then('I should see the list {stringInDoubleQuotes}', (selector) => {
        return element.all(by.css(selector)).count().then( total => {
            return expect(element.all(by.css(selector)).count()).to.eventually.equal(total);
        });
    });

    Given('article {stringInDoubleQuotes} doesn\'t exists on {stringInDoubleQuotes}', (article, profile) => {
        return browser.get(`/${profile}/${article}`).then(() => {
            return browser.getCurrentUrl();
        }).then((url) => {
            if (url === `http://localhost:49152/${profile}/${article}`) {
                browser.waitForAngular();
                return utils.pressButton(".delete-article").then(() => {
                    return utils.pressButton(".swal2-confirm");
                });
            }
        });
    });

    Given('profile {stringInDoubleQuotes} doesn\'t exists', (profile) => {
        return utils.destroy(profile);
    });

    Given('I press delete profile', () => {
        browser.waitForAngular().then(() => {
            return utils.pressButton('ul li .destroy-community');
        }).then(() => {
            return utils.pressButton(".swal2-confirm");
        });
    });

    When('I press ok on confirmation dialog', () => {
        return utils.pressButton(".swal2-confirm");
    });

    When('I press the invite button', () => {
        return utils.pressButton("noosfero-invite-component button");
    });

    Then('I wait for success', () => {
        return browser.waitForAngular().then(() => {
            return expect(element(by.css(".toast-success")).isPresent()).to.eventually.equal(true);
        });
    });

    When('I edit the profile name', () => {
        return utils.pressButton(".profile-edition-link").then( () => {
            return element(by.css("#name")).clear().then( () => {
                return element(by.css("#name")).sendKeys("E2e fast edtion").then(() => {
                    return utils.pressButton(".save-fast-edtion");
                });
            });
        });
    });
});