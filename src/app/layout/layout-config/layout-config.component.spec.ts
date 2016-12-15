import { Component } from 'ng-forward';
import { LayoutConfigComponent } from './layout-config.component';
import * as helpers from "../../../spec/helpers";
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';

// this htmlTemplate will be re-used between the container components in this spec file
const htmlTemplate: string = '<layout-config [owner]="ctrl.owner"></layout-config>';

describe("Layout Config Component", () => {

    let helper: ComponentTestHelper<LayoutConfigComponent>;
    beforeEach(() => {
        angular.mock.module("templates");
    });

    let properties = {
        owner: {
            id: 1,
            identifier: 'profile-name',
            type: 'Person',
            layout_template: 'default'
        }
    };
    beforeEach((done) => {
        let cls = createClass({
            template: htmlTemplate,
            directives: [LayoutConfigComponent],
            properties: properties
        });
        helper = new ComponentTestHelper<LayoutConfigComponent>(cls, done);
    });

    it("render template options", () => {
        expect(helper.all('.layout-template-option').length).toEqual(8);
    });

    it("is selected when current layout is equal to layout_template", () => {
        expect(helper.component.isSelected('default')).toBeTruthy();
    });

    it("is not selected when current layout is not equal to layout_template", () => {
        expect(helper.component.isSelected('other')).toBeFalsy();
    });

    it("add selected class in current template option", () => {
        expect(helper.all('.layout-default.selected').length).toEqual(1);
    });

    it("change owner layout when call changeLayout", () => {
        helper.component.changeLayout("leftbar");
        expect(helper.component.owner.layout_template).toEqual("leftbar");
    });
});
