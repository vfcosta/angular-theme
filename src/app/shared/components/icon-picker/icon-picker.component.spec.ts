import { TestComponentBuilder } from 'ng-forward/cjs/testing/test-component-builder';
import { IconPickerComponent } from './icon-picker.component';
import * as helpers from "../../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../../spec/component-test-helper';

const htmlTemplate: string = '<noosfero-icon-picker [current-icon]="ctrl.currentIcon"></noosfero-icon-picker>';

describe("Components", () => {

    describe("Icon Picker Component", () => {

        let helper: ComponentTestHelper<IconPickerComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let cls = createClass({
                template: htmlTemplate,
                directives: [IconPickerComponent],
                properties: { icon: 'fa-edit' }
            });
            helper = new ComponentTestHelper<IconPickerComponent>(cls, done);
        });

        it("display available icons as options", () => {
            expect(helper.all('.icon-picker-item').length).toEqual(helper.component.availableIcons.length);
        });

        it("change current icon when select an option", () => {
            helper.component.changeIcon("fa-plus");
            expect(helper.all('.fa-plus').length).toEqual(1);
        });
    });
});
