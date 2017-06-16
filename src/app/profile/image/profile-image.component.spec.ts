import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import * as helpers from "../../../spec/helpers";
import { ProfileImageComponent } from "./profile-image.component";

describe("Components", () => {

    describe("Profile Image Component", () => {
        let fixture: ComponentFixture<ProfileImageComponent>;
        let component: ProfileImageComponent;
        let mocks = helpers.getMocks();

        let imageProfileUpdateFn: Function;
        mocks.eventsHubService.subscribeToEvent = <any>((event: string, fn: Function) => {
            imageProfileUpdateFn = fn;
        });

        beforeEach(async(() => {
            let scope = helpers.mocks.scopeWithEvents;
            let profileService = jasmine.createSpyObj("profileService", ["upload"]);
            let permissionService = jasmine.createSpyObj("permissionService", ["isAllowed"]);

            TestBed.configureTestingModule({
                declarations: [ProfileImageComponent, TranslatePipe],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "profileService", useValue: profileService },
                    { provide: "eventsHubService", useValue: mocks.eventsHubService },
                    { provide: "permissionService", useValue: permissionService },
                    { provide: "sessionService", useValue: helpers.mocks.sessionService },
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileImageComponent);
                component = fixture.componentInstance;
                component.profile = <any>{ custom_footer: "footer" };
                component.editable = true;
            });
        }));

        it("show community users image if profile is not Person", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            component.profile = profile;
            component.ngOnInit();
            expect(component.defaultIcon).toBe("fa-users", "The default icon should be community users");
        });

        it("show Person image if profile is Person", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Person" };
            component.profile = profile;
            component.ngOnInit();
            expect(component.defaultIcon).toEqual("fa-user", "The default icon should be person user");
        });

        it("is editable be true in blocks that are editable", () => {
            expect(component.editable).toBe(true);
        });

        it("is not editable in editable blocks but without permission", () => {
            component['permissionService'].isAllowed = jasmine.createSpy("isAllowed").and.returnValue(false);
            expect(component.isEditable()).toBe(false);
        });

        it("is editable in editable blocks with edit permission", () => {
            component['permissionService'].isAllowed = jasmine.createSpy("isAllowed").and.returnValue(true);
            expect(component.isEditable()).toBe(true);
        });

        it("should not update profile with different id", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            component.profile.id = 99;
            imageProfileUpdateFn(component['eventsHubService'].knownEvents.IMAGE_PROFILE_UPDATED,
                profile);
            expect(component.profile.id).not.toEqual(profile.id);
        });

        it("should update profile with same id", () => {
            let profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            component.profile.id = 1;
            imageProfileUpdateFn(component['eventsHubService'].knownEvents.IMAGE_PROFILE_UPDATED,
                profile);
            expect(component.profile.id).toEqual(profile.id);
        });

    });
});
