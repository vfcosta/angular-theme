import { NotificationService } from './../../shared/services/notification.service';
import { TranslatorService } from './../../shared/services/translator.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileFastEditionComponent } from './profile-fast-edition.component';
import { TranslatePipe } from './../../shared/pipes/translate-pipe';
import { tick, fakeAsync, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import * as helpers from "../../../spec/helpers";

describe("Components", () => {

    describe("Profile Fast Edition Component", () => {
        let fixture: ComponentFixture<ProfileFastEditionComponent>;
        let component: ProfileFastEditionComponent;
        let profileService = jasmine.createSpyObj("profileService", ["update"]);
        profileService.update = jasmine.createSpy("update").and.returnValue(Promise.resolve({}));
        let state = jasmine.createSpyObj("$state", ["go"]);

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [ProfileFastEditionComponent, TranslatePipe],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: ProfileService, useValue: profileService },
                    { provide: NotificationService, useValue: helpers.mocks.notificationService },
                    { provide: TranslatorService, useValue: helpers.mocks.translatorService },
                    { provide: "$state", useValue: state }
                ]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(ProfileFastEditionComponent);
                component = fixture.componentInstance;
                component.profile = <noosfero.Profile>{ id: 1, name: "Test", identifier: "test" };
                component.environment = <noosfero.Environment>{ id: 2, settings: {} };
            });
        }));

        it("copy input profile when init", () => {
            fixture.detectChanges();
            expect(component.updatedProfile.name).toEqual('Test');
        });

        it("call profile service to update profile when save", () => {
            fixture.detectChanges();
            component.save();
            expect(profileService.update).toHaveBeenCalled();
        });

        it("not display edition input for identifier when not allowed", () => {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#identifier'))).toBeNull();
        });

        it("not pass identifer when update profile and identifier change is not allowed", () => {
            fixture.detectChanges();
            component.save();
            expect(profileService.update).toHaveBeenCalledWith({ id: 1, name: 'Test' });
        });

        it("not reload page when identifier change is not allowed", (fakeAsync(() => {
            fixture.detectChanges();
            component.save();
            tick();
            expect(profileService.update).toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalled();
        })));

        it("reload page when identifier was changed", (fakeAsync(() => {
            fixture.detectChanges();
            component.profile = <noosfero.Profile>{ id: 1, name: "Test", identifier: "test", type: "Person" };
            component.environment = <noosfero.Environment>{ id: 2, settings: { enable_profile_url_change_enabled: true } };
            component.save();
            tick();
            expect(profileService.update).toHaveBeenCalled();
            expect(state.go).toHaveBeenCalled();
        })));

        it("display person edition of identifier when allowed", () => {
            component.profile = <noosfero.Profile>{ id: 1, name: "Test", identifier: "test", type: "Person" };
            component.environment = <noosfero.Environment>{ id: 2, settings: { enable_profile_url_change_enabled: true } };
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#identifier'))).not.toBeNull();
        });

        it("display community edition of identifier when allowed", () => {
            component.profile = <noosfero.Profile>{ id: 1, name: "Test", identifier: "test", type: "Community" };
            component.environment = <noosfero.Environment>{ id: 2, settings: { enable_profile_url_change_enabled: true } };
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#identifier'))).not.toBeNull();
        });
    });
});
