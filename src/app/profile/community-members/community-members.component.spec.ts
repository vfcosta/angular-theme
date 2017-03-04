import { UiSrefDirective } from './../../../shared/directives/ui-sref-directive';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { ProfileImageComponent } from './../../../profile/image/profile-image.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommunityMembersComponent } from './community-members.component';
import * as helpers from "../../../../spec/helpers";

describe("Components", () => {

    describe("Community Members Component", () => {
        let fixture: ComponentFixture<CommunityMembersComponent>;
        let component: CommunityMembersComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);
        let profileService = jasmine.createSpyObj("profileService", ["getCurrentProfile", "getMembers"]);
        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ people: [{ identifier: "person1" }] }));
        let currentProfile = {id: 1};
        let members = [{id: 1 }, { id: 2 }];

        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(
          Promise.resolve({
              data: currentProfile
          }));

        profileService.getMembers = jasmine.createSpy("getMembers").and.returnValue(
          Promise.resolve({
              headers: () => { },
              data: members
          }));


        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CommunityMembersComponent, TranslatePipe, UiSrefDirective],
                providers: [
                    { provide: "profileService", useValue: profileService },
                    { provide: "$state", useValue: state }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(CommunityMembersComponent);
                component = fixture.componentInstance;
            });
        }));

        it("load current profile", () => {
            expect(profileService.getCurrentProfile).toHaveBeenCalled();
        });

        it("load profile members", () => {
            expect(profileService.getMembers).toHaveBeenCalled();
        });

        it("load profile members with parameters", () => {
            expect(profileService.getMembers).toHaveBeenCalledWith({ data: { id: 1 } }, { page: 1, per_page: 20 });
        });

    });
});
