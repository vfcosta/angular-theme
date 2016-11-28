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
            properties: properties,
            providers: [
                helpers.createProviderToValue('NotificationService', helpers.mocks.notificationService),
                helpers.createProviderToValue('ProfileService', profileService)
            ]
        });
        helper = new ComponentTestHelper<LayoutConfigComponent>(cls, done);
    });

    let profileService = jasmine.createSpyObj("profileService", ["update"]);

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

    it("call profile service to update template when apply", () => {
        profileService.update = jasmine.createSpy("update").and.returnValue(helpers.mocks.promiseResultTemplate());
        helper.component.changeLayout("leftbar");
        helper.component.apply();
        expect(profileService.update).toHaveBeenCalledWith({ id: 1, layout_template: "leftbar" });
    });
});
