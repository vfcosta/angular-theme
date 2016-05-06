import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Component} from 'ng-forward';

import {StatisticsBlockComponent} from './statistics-block.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-statistics-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-statistics-block>';

describe("Components", () => {

    describe("Statistics Block Component", () => {

        beforeEach(angular.mock.module("templates"));
        beforeEach(angular.mock.module("ngSanitize"));

        it("display title stored in block attribute", done => {

            @Component({
                selector: 'test-container-component',
                template: htmlTemplate,
                directives: [StatisticsBlockComponent],
            })
            class CustomBlockType {
                block: any = { settings: { user_counter: '<em>block content</em>' } };
                owner: any = { name: 'profile-name' };
            }
            tcb.createAsync(CustomBlockType).then(fixture => {
                expect(fixture.debugElement.query(".statistics-block").text().trim()).toEqual('block content');
                done();
            });
        });

    });

});
