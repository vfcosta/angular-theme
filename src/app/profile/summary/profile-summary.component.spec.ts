import { TranslatorService } from './../../shared/services/translator.service';
import { DesignModeService } from './../../shared/services/design-mode.service';
import { PersonService } from './../../../lib/ng-noosfero-api/http/person.service';
import { SessionService } from './../../login/session.service';
import { PermissionNg2Directive } from '../../shared/components/permission/permission.ng2.directive';
import { UiSrefDirective } from '../../shared/directives/ui-sref-directive';
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
        let mocks = helpers.getMocks();
        let $transitions = jasmine.createSpyObj("$transitions", ["onSuccess"]);
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, PopoverModule.forRoot()],
                declarations: [ProfileSummaryComponent, TranslatePipe, UiSrefDirective, PermissionNg2Directive],
                providers: [
                    { provide: EnvironmentService, useValue: environmentService},
                    { provide: SessionService, useValue: sessionService },
                    { provide: PersonService, useValue: personService },
                    { provide: "notificationService", useValue: mocks.notificationService },
                    { provide: DesignModeService, useValue: mocks.designModeService },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: "$transitions", useValue: $transitions },
                    { provide: TranslatorService, useValue: mocks.translatorService }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(ProfileSummaryComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>{ id: 1, identifier: 'adminuser', type: "Person", permissions: ['allow_edit'] };
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
            component.popover = { hide: () => { } };
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
