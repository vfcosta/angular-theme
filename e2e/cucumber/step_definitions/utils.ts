import { defineSupportCode } from 'cucumber';
import { Http, Response } from '@angular/http';
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built';

export function pressButton(selector: string) {
    return element(by.css(selector)).click();
}

export function destroy(profile: string) {
    return browser.get(`/myprofile/${profile}/destroy_profile`).then(() => {
        // browser.waitForAngular();
        return element(by.css(".swal2-confirm")).isPresent().then((present) => {
            if (present) {
                return pressButton(".swal2-confirm");
            }
        });
    });
}

export function goTo(profile: string) {
    browser.waitForAngular();
    return browser.driver.get(`http://localhost:49152/${profile}`);
}
