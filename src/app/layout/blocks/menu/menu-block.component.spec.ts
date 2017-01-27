import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { provideFilters } from '../../../../spec/helpers';
import { MenuBlockComponent } from './menu-block.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-menu-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-link-list-block>';

describe("Components", () => {

    describe("Menu Block Component", () => {

        let helper: ComponentTestHelper<MenuBlockComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [MenuBlockComponent],
                properties: {
                    block: { type: 'Block', settings: {} },
                    owner: { name: 'profile-name' }
                },
                providers: provideFilters("noosferoTemplateFilter", "translateFilter")
            });
            helper = new ComponentTestHelper<MenuBlockComponent>(cls, done);
        });

        it("receives the block and the owner as inputs", () => {
            expect(helper.component.block.type).toEqual("Block");
            expect(helper.component.owner.name).toEqual("profile-name");
        });

        it("display the default links defined for person profile", () => {
            expect(helper.all(".menu-block a").length).toEqual(4);
        });

    });

});
