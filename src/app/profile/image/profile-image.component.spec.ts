/**
 * @ngdoc overview
 * @name components.noosfero.profile-image.ProfileImageSpec
 * @description
 *  This file contains the tests for the {@link components.noosfero.profile-image.ProfileImage} component.
 */
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TestComponentBuilder, ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';
import { Pipe, Input, provide, Component } from 'ng-forward';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

import * as helpers from "../../../spec/helpers";

import { ProfileImageComponent } from "./profile-image.component";

const htmlTemplate: string = '<noosfero-profile-image [editable]="true" [edit-class]="editable-class" [profile]="ctrl.profile"></noosfero-profile-image>';

describe("Components", () => {

    describe("Profile Image Component", () => {

        let helper: ComponentTestHelper<ProfileImageComponent>;

        let imageProfileUpdateFn: Function;
        let eventsHubService = jasmine.createSpyObj("eventsHubService", ["subscribeToEvent", "emitEvent"]);
        eventsHubService.subscribeToEvent = (event: string, fn: Function) => {
            imageProfileUpdateFn = fn;
        };
        beforeEach(angular.mock.module("templates"));

        beforeEach((done: Function) => {
            let scope = helpers.mocks.scopeWithEvents;
            let profileService = jasmine.createSpyObj("profileService", ["upload"]);
            let permissionService = jasmine.createSpyObj("permissionService", ["isAllowed"]);
            let properties = { profile: { custom_footer: "footer" } };
            let cls = createClass({
                template: htmlTemplate,
                directives: [ProfileImageComponent],
                properties: properties,
                providers: [
                    helpers.createProviderToValue("ProfileService", profileService),
                    helpers.createProviderToValue("EventsHubService", eventsHubService),
                    helpers.createProviderToValue("PermissionService", permissionService),
                    helpers.createProviderToValue("$uibModal", helpers.mocks.$modal),
                    helpers.createProviderToValue("$scope", scope)
                ]
            });
            helper = new ComponentTestHelper<ProfileImageComponent>(cls, done);
        });

        it("set modal instance when select files modal", () => {
            helper.component['$uibModal'].open = jasmine.createSpy("open");
            helper.component.fileSelected("file", []);
            expect(helper.component['$uibModal'].open).toHaveBeenCalled();
        });


        it("show community users image if profile is not Person", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            helper.component.profile = profile;
            helper.component.ngOnInit();
            expect(helper.component.defaultIcon).toBe("fa-users", "The default icon should be community users");

        });

        it("show Person image if profile is Person", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Person" };
            helper.component.profile = profile;
            helper.component.ngOnInit();
            expect(helper.component.defaultIcon).toEqual("fa-user", "The default icon should be person user");
        });

        it("is editable be true in blocks that are editable", () => {
            expect(helper.component.editable).toBe(true);
        });

        it("is not editable in editable blocks but without permission", () => {
            helper.component['permissionService'].isAllowed = jasmine.createSpy("isAllowed").and.returnValue(false);
            expect(helper.component.isEditable()).toBe(false);
        });

        it("is editable in editable blocks with edit permission", () => {
            helper.component['permissionService'].isAllowed = jasmine.createSpy("isAllowed").and.returnValue(true);
            expect(helper.component.isEditable()).toBe(true);
        });

        it("should not update profile with different id", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            helper.component.profile.id = 99;
            imageProfileUpdateFn(helper.component.eventsNames.IMAGE_PROFILE_UPDATED,
                profile);
            expect(helper.component.profile.id).not.toEqual(profile.id);
        });

        it("should update profile with same id", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            helper.component.profile.id = 1;
            imageProfileUpdateFn(helper.component.eventsNames.IMAGE_PROFILE_UPDATED,
                profile);
            expect(helper.component.profile.id).toEqual(profile.id);
        });

    });
});
