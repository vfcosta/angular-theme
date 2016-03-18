import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import {ProfileImageBlockComponent} from './profile-image-block.component';

import * as helpers from "./../../../../spec/helpers";

const tcb = new TestComponentBuilder();

const htmlTemplate: string = '<noosfero-profile-image-block  [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-profile-image-block>';

describe("Components", () => {

    describe("Profile Image Block Component", () => {

        beforeEach(angular.mock.module("templates"));

        @Component({
            selector: 'test-container-component',
            template: htmlTemplate,
            directives: [ProfileImageBlockComponent],
            providers: helpers.provideFilters("translateFilter")
        })
        class BlockContainerComponent {
            block = { type: 'Block' };
            owner = { name: 'profile-name' };
            constructor() {
            }
        }

        it("show image if present", () => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                expect(elProfile.query('div.profile-image-block').length).toEqual(1);
            });
        });

        it("has link to the profile", () => {
            helpers.tcb.createAsync(BlockContainerComponent).then(fixture => {
                let elProfile = fixture.debugElement.componentViewChildren[0];
                expect(elProfile.query('a.settings-link').length).toEqual(1);
            });
        });

    });
});
