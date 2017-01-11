/**
 * @ngdoc overview
 * @name components.noosfero.top-profile-image.ProfileImageSpec
 * @description
 *  This file contains the tests for the {@link components.noosfero.top-profile-image.ProfileImage} component.
 */
import { ComponentTestHelper, createClass } from '../../../spec/component-test-helper';
import { TestComponentBuilder, ComponentFixture } from 'ng-forward/cjs/testing/test-component-builder';
import { Pipe, Input, provide, Component } from 'ng-forward';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

import * as helpers from "../../../spec/helpers";

import { TopProfileImageComponent } from "./top-profile-image.component";

const htmlTemplate: string = '<noosfero-top-profile-image [editable]="true" [edit-class]="editable-class" [profile]="vm.profile"></noosfero-top-profile-image>';

describe("Components", () => {

    describe("Top Profile Image Component", () => {

        let helper: ComponentTestHelper<TopProfileImageComponent>;

        beforeEach(angular.mock.module("templates"));

        beforeEach((done) => {
            let profileService = jasmine.createSpyObj("profileService", ["upload"]);
            let permissionService = jasmine.createSpyObj("permissionService", ["isAllowed"]);
            let properties = { profile: { custom_footer: "footer", top_image: "top_image.png" } };
            let upload = jasmine.createSpyObj("Upload", ["dataUrl"]);
            let cls = createClass({
                template: htmlTemplate,
                directives: [TopProfileImageComponent],
                properties: properties,
                providers: [
                    helpers.createProviderToValue("ProfileService", profileService),
                    helpers.createProviderToValue("PermissionService", permissionService),
                    helpers.createProviderToValue('Upload', upload)
                ]
            });
            helper = new ComponentTestHelper<TopProfileImageComponent>(cls, done);
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
    });
});
