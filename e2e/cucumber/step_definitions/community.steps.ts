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
    Given('I choose to moderate members of the community before', () => {
        return utils.pressButton("#acceptBefore");
    });

    Given('I choose to moderate members of the community after', () => {
        return utils.pressButton("#acceptAfter");
    });

    When('I save the community', () => {
        return utils.pressButton(".save-community");
    });

    Given('I press button leave community', () => {
        utils.pressButton("profile-join .actions .profile-actions .leave");
        return browser.waitForAngular();
    });

    Given('I press button join community', () => {
        return utils.pressButton("profile-join .actions .profile-actions .join");
    });

    Given('I prepare community to run tests', () => {
        return utils.goTo("adminuser").then(() => {
            return utils.destroy("e2e-community");
        }).then(() => {
            return browser.get('/myprofile/adminuser');
        }).then( () => {
            browser.waitForAngular();
            return utils.pressButton('ul li .communities');
        }).then( () => {
            return utils.pressButton('.create-community');
        }).then( () => {
            return element(by.css('#name')).sendKeys('E2e community');
        }).then( () => {
            return utils.pressButton('#acceptAfter');
        }).then( () => {
            return utils.pressButton('.save-community');
        }).then( () => {
            return utils.goTo("e2e-community");
        });
    });
    Then('I should see join community button', () => {
        return expect(element(by.css("profile-join .actions .profile-actions .join")).isPresent()).to.eventually.equal(true);
    });
});