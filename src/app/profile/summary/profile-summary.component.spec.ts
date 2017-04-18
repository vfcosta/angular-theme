import { PopoverModule } from 'ngx-bootstrap';
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import * as helpers from "../../../spec/helpers";

import { ProfileSummaryComponent } from "./profile-summary.component";

describe("Components", () => {
    describe("Profile Summary Component", () => {
        let fixture: ComponentFixture<ProfileSummaryComponent>;
        let component: ProfileSummaryComponent;
        let environmentService = jasmine.createSpyObj("environmentService", ["getCurrentEnvironment"]);
        environmentService.getCurrentEnvironment = jasmine.createSpy("getCurrentEnvironment").and.returnValue(
            Promise.resolve({ id: 1, name: 'Nosofero', host: "https://noosfero.org" })
        );
        let personService = jasmine.createSpyObj("personService", ["upload", "isFriend"]);
        personService.isFriend = jasmine.createSpy("isFriend").and.returnValue(Promise.resolve(false));
        let sessionService = jasmine.createSpyObj("sessionService", ["currentUser"]);
        sessionService.currentUser = jasmine.createSpy("currentUser").and.returnValue({ person: { id: 1, identifier: 'adminuser', type: "Person" } });

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, PopoverModule.forRoot()],
                declarations: [ProfileSummaryComponent, TranslatePipe],
                providers: [
                    { provide: "environmentService", useValue: environmentService},
                    { provide: "sessionService", useValue: sessionService },
                    { provide: "personService", useValue: personService },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "translatorService", useValue: helpers.mocks.translatorService }
                ],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileSummaryComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>{ id: 1, identifier: 'adminuser', type: "Person", permissions: ['allow_edit'] };
            });
        }));

        it("returns profile link", () => {
            fixture.detectChanges();
            expect(component.profileLink()).toBe("noosfero.org/adminuser");
        });

        it("returns null in profile link when there is no current environment", () => {
            fixture.detectChanges();
            component['environment'] = null;
            expect(component.profileLink()).toBeNull();
        });

        it("returns null in profile link when there is no profile", () => {
            fixture.detectChanges();
            component.profile = null;
            expect(component.profileLink()).toBeNull();
        });

        it("set popover open to false when close edition", () => {
            fixture.detectChanges();
            component.editPopoverOpen = true;
            component.closeEdition();
            expect(component.editPopoverOpen).toBeFalsy();
        });

        it("not display add/remove button when view the current user profile", () => {
            fixture.detectChanges();
            component.profile.id = 0;
            component.ngOnInit();
            expect(component.showRemoveFriend).toBeFalsy();
            expect(component.showAddFriend).toBeFalsy();
        });
    });
});
