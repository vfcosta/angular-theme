
import {TestComponentBuilder, ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';
import {Pipe, Input, provide, Component} from 'ng-forward';

import * as helpers from "./../../../../spec/helpers";

import {ProfileImage} from "./profile-image.component"

const tcb = new TestComponentBuilder();

describe("Components", () => {
        
    describe("Profile Image Component", () => {

        beforeEach(angular.mock.module("templates"));
        
        it("show community users image if profile is not Person", done => {
            helpers.tcb.createAsync(ProfileImage).then(fixture => {
                let profileImageComponent : ProfileImage = fixture.componentInstance
                let profile = { id: 1, identifier: "myprofile", type: "Community" }
                profileImageComponent.profile = profile
                profileImageComponent.ngOnInit();

                // Check the attribute
                expect(profileImageComponent.defaultIcon).toBe("fa-users", "The default icon should be community users");
                //var elProfile = fixture.debugElement.componentViewChildren[0];
                //expect(elProfile.query('div.profile-image-block').length).toEqual(1);
                done();
            });
        });
        
        it("show Person image if profile is Person", done => {
            tcb.createAsync(ProfileImage).then(fixture => {
                let profileImageComponent : ProfileImage = fixture.componentInstance
                let profile = { id: 1, identifier: "myprofile", type: "Person" }
                profileImageComponent.profile = profile
                profileImageComponent.ngOnInit();
                // Check the attribute
                expect(profileImageComponent.defaultIcon).toEqual("fa-user", "The default icon should be person user");
                done();
            });
        });
                        
    });
});