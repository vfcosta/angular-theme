import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TestComponentBuilder, ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';
import { Pipe, Input, provide, Component } from 'ng-forward';
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";

import * as helpers from "../../../spec/helpers";

import { ProfileSummaryComponent } from "./profile-summary.component";

const htmlTemplate: string = '<noosfero-profile-summary [profile]="ctrl.profile"></noosfero-profile-summary>';

describe("Components", () => {

    describe("Profile Summary Component", () => {

        let helper: ComponentTestHelper<ProfileSummaryComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done: Function) => {
            let environmentService = jasmine.createSpyObj("environmentService", ["getCurrentEnvironment"]);
            environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue({ host: "https://noosfero.org" });
            let properties = { profile: { identifier: 'adminuser' } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [ProfileSummaryComponent],
                properties: properties,
                providers: [
                    helpers.createProviderToValue("EnvironmentService", environmentService)
                ]
            });
            helper = new ComponentTestHelper<ProfileSummaryComponent>(cls, done);
        });

        it("returns profile link", () => {
            expect(helper.component.profileLink()).toBe("noosfero.org/adminuser");
        });

        it("returns null in profile link when there is no current environment", () => {
            helper.component['environment'] = null;
            expect(helper.component.profileLink()).toBeNull();
        });

        it("returns null in profile link when there is no profile", () => {
            helper.component.profile = null;
            expect(helper.component.profileLink()).toBeNull();
        });
    });
});
