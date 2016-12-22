import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { provideFilters } from '../../../../spec/helpers';
import { EditableLinkComponent } from './editable-link.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-editable-link [link]="ctrl.link" [desig-mode]="ctrl.designMode" [opened]="ctrl.opened"></noosfero-editable-link>';

describe("Components", () => {

    describe("Editable Link Component", () => {

        let helper: ComponentTestHelper<EditableLinkComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [EditableLinkComponent],
                properties: {
                    link: { name: 'link', address: 'address' },
                    designMode: true,
                    popupOpen: false
                }
            });
            helper = new ComponentTestHelper<EditableLinkComponent>(cls, done);
        });

        it("copy link content on init", () => {
            expect(helper.component.modifiedLink).toEqual({ name: 'link', address: 'address' });
        });

        it("copy link content when save", () => {
            helper.component.modifiedLink = { name: "modified name", address: "modified address" };
            helper.component.save();
            expect(helper.component.link).toEqual({ name: 'modified name', address: 'modified address' });
        });

        it("set popupOpen to false when cancel", () => {
            helper.component.popupOpen = true;
            helper.component.cancel();
            expect(helper.component.popupOpen).toBeFalsy();
        });
    });

});
