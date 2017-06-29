import { TranslatorService } from './../../shared/services/translator.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { UiSrefDirective } from './../../shared/directives/ui-sref-directive';
import { ProfileImageComponent } from './../../profile/image/profile-image.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommunityMembersComponent } from './community-members.component';
import { PaginationModule } from 'ngx-bootstrap';
import * as helpers from "../../../spec/helpers";

describe("Components", () => {

    describe("Community Members Component", () => {
        let fixture: ComponentFixture<CommunityMembersComponent>;
        let component: CommunityMembersComponent;
        let state = jasmine.createSpyObj("$state", ["href"]);
        let profileService = jasmine.createSpyObj("profileService", ["getCurrentProfile", "getMembers"]);
        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(Promise.resolve({ people: [{ identifier: "person1" }] }));
        let currentProfile = { id: 1 };
        let members = [{ id: 1 }, { id: 2 }];

        profileService.getCurrentProfile = jasmine.createSpy("getCurrentProfile").and.returnValue(
            Promise.resolve({
                data: currentProfile
            }));

        profileService.getMembers = jasmine.createSpy("getMembers").and.returnValue(
            Promise.resolve({
                headers: {
                    get: (key: string) => { },
                },
                data: members
            }));


        let translatorService = jasmine.createSpyObj("translatorService", ["translate"]);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CommunityMembersComponent, UiSrefDirective],
                providers: [
                    { provide: ProfileService, useValue: profileService },
                    { provide: "$state", useValue: state },
                    { provide: TranslatorService, useValue: translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            });
            fixture = TestBed.createComponent(CommunityMembersComponent);
            component = fixture.componentInstance;
        }));

        it("load current profile", () => {
            expect(profileService.getCurrentProfile).toHaveBeenCalled();
        });

        it("load profile members", () => {
            expect(profileService.getMembers).toHaveBeenCalled();
        });

        it("load profile members with parameters", () => {
            expect(profileService.getMembers).toHaveBeenCalledWith({ data: { id: 1 } }, { page: 1, per_page: 20, order: 'name ASC' });
        });

        it("has default style type *card*", () => {
            expect(component.getDisplayStyle()).toEqual('card');
        });

    });
});
