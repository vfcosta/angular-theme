import {TestComponentBuilder} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import {ProfileImageBlock} from './profile-image.component';

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-profile-image-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-profile-image-block>';


describe("Components", () => {
    describe("Profile Image Block Component", () => {

        beforeEach(angular.mock.module("templates"));

        @Component({ selector: 'test-container-component', template: htmlTemplate, directives: [ProfileImageBlock] })
        class BlockContainerComponent {
            block = { type: 'Block' };
            owner = { name: 'profile-name' };
            constructor() {
            }
        }

        it("render the profile image", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll("noosfero-profile-image").length).toEqual(1);
                done();
            });
        });

        it("render the settings link", done => {
            tcb.createAsync(BlockContainerComponent).then(fixture => {
                expect(fixture.debugElement.queryAll(".settings-link").length).toEqual(1);
                done();
            });
        });

    });
});