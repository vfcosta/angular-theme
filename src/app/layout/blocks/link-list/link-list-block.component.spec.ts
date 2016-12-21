import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { provideFilters } from '../../../../spec/helpers';
import { LinkListBlockComponent } from './link-list-block.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-link-list-block [block]="ctrl.block" [owner]="ctrl.owner"></noosfero-link-list-block>';

describe("Components", () => {

    describe("Link List Block Component", () => {

        let helper: ComponentTestHelper<LinkListBlockComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [LinkListBlockComponent],
                properties: {
                    block: { type: 'Block', settings: { links: [{ name: 'link1', address: 'address1' }, { name: 'link2', address: 'address2' }] } },
                    owner: { name: 'profile-name' }
                },
                providers: provideFilters("noosferoTemplateFilter", "translateFilter")
            });
            helper = new ComponentTestHelper<LinkListBlockComponent>(cls, done);
        });

        it("receives the block and the owner as inputs", () => {
            expect(helper.component.block.type).toEqual("Block");
            expect(helper.component.owner.name).toEqual("profile-name");
        });

        it("display links stored in block settings", () => {
            expect(helper.all(".link-list-block a").length).toEqual(2);
        });

        it("add a new link", () => {
            helper.component.addLink();
            helper.detectChanges();
            expect(helper.all(".link-list-block a").length).toEqual(3);
        });

        it("remove a new link", () => {
            helper.component.removeLink(0);
            helper.detectChanges();
            expect(helper.all(".link-list-block a").length).toEqual(1);
        });

        it("return true when check for a new link by index", () => {
            helper.component.addLink();
            expect(helper.component.isNewLink(2)).toBeTruthy();
        });
    });

});
