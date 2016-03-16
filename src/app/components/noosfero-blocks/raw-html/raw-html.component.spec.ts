import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Component} from 'ng-forward';

import {RawHTMLBlock} from './raw-html.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-raw-htmlblock [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-raw-htmlblock>';

describe("Components", () => {

    describe("Raw Html Block Component", () => {

        beforeEach(angular.mock.module("templates"));
        beforeEach(angular.mock.module("ngSanitize"));

        it("display html stored in block settings", done => {

            @Component({
                selector: 'test-container-component',
                template: htmlTemplate,
                directives: [RawHTMLBlock],
            })
            class CustomBlockType {
                block: any = { settings: { html: '<em>block content</em>' } };
                owner: any = { name: 'profile-name' };
            }
            tcb.createAsync(CustomBlockType).then(fixture => {
                expect(fixture.debugElement.query(".raw-html-block em").text().trim()).toEqual('block content');
                done();
            });
        });

    });

});
