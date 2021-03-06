import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../shared/services/notification.service';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { AuthService } from './../../login/auth.service';
import { PermissionService } from './../../shared/services/permission.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import * as helpers from '../../../spec/helpers';
import { ProfileImageComponent } from './profile-image.component';

describe("Components", () => {

    describe("Profile Image Component", () => {
        let fixture: ComponentFixture<ProfileImageComponent>;
        let component: ProfileImageComponent;
        const mocks = helpers.getMocks();

        let imageProfileUpdateFn: Function;
        mocks.eventsHubService.subscribeToEvent = <any>((event: string, fn: Function) => {
            imageProfileUpdateFn = fn;
        });

        beforeEach(async(() => {
            const scope = mocks.scopeWithEvents;
            const profileService = jasmine.createSpyObj("profileService", ["upload"]);
            const permissionService = jasmine.createSpyObj("permissionService", ["isAllowed"]);

            TestBed.configureTestingModule({
                declarations: [ProfileImageComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: ProfileService, useValue: profileService },
                    { provide: EventsHubService, useValue: mocks.eventsHubService },
                    { provide: PermissionService, useValue: permissionService },
                    { provide: AuthService, useValue: mocks.authService },
                ],
                imports: [TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ProfileImageComponent);
            component = fixture.componentInstance;
            component.profile = <any>{ custom_footer: "footer" };
            component.editable = true;
        }));

        it("show community users image if profile is not Person", () => {
            const profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            component.profile = profile;
            component.ngOnInit();
            expect(component.defaultIcon).toBe("fa-users", "The default icon should be community users");
        });

        it("show Person image if profile is Person", () => {
            const profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Person" };
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
            const profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            component.profile.id = 99;
            imageProfileUpdateFn(component['eventsHubService'].knownEvents.IMAGE_PROFILE_UPDATED,
                profile);
            expect(component.profile.id).not.toEqual(profile.id);
        });

        it("should update profile with same id", () => {
            const profile = <noosfero.Profile>{ id: 1, identifier: "myprofile", type: "Community" };
            component.profile.id = 1;
            imageProfileUpdateFn(component['eventsHubService'].knownEvents.IMAGE_PROFILE_UPDATED,
                profile);
            expect(component.profile.id).toEqual(profile.id);
        });

    });
});
