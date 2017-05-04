import { ValidationMessageComponent } from './../../../shared/components/validation-message/validation-message.component';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { EditCommunityComponent } from './edit-community.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import {
    FormsModule, NG_VALIDATORS, AbstractControl,
    NgForm, FormControl
} from '@angular/forms';

describe("Components", () => {
    describe("Update Community", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<EditCommunityComponent>;
        let component: EditCommunityComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [EditCommunityComponent, TranslatePipe, ValidationMessageComponent],
                providers: [
                    { provide: "profileService", useValue: mocks.profileService },
                    { provide: "communityService", useValue: mocks.communityService },
                    { provide: "notificationService", useValue: mocks.notificationService },
                    { provide: "sessionService", useValue: mocks.sessionService },
                    { provide: "$state", useValue: mocks.$state },
                    { provide: "translatorService", useValue: mocks.translatorService },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(EditCommunityComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Community>mocks.community;
            fixture.detectChanges();
        }));

        it("verify if community is initialized with close true ", () => {
            component.community = undefined;
            component.ngOnInit();
            expect(component.community).toEqual(component.profile);
        });

        it("verify if session profile is initialized with current user ", () => {
            component.sessionProfile = null;
            let currentUser = { person: { identifier: 'profile1' } };
            component['sessionService'].currentUser = jasmine.createSpy("currentUser").and.returnValue(currentUser);
            component.ngOnInit();
            expect(component.sessionProfile).toEqual(currentUser.person);
        });

        it("verify if translate service is called with correct parameters ", () => {
            spyOn(component.translatorService, 'translate');
            component.getTitle();
            expect(component.translatorService.translate).toHaveBeenCalledWith('myprofile.configuration.community.edit');
        });

        it("verify if the method update of profile service is called after save ", () => {
            spyOn(component.profileService, 'update').and.callThrough();
            component.save();
            expect(component.profileService.update).toHaveBeenCalledWith(component.community);
        });

        it("verify if notification service success is called after community is successfuly created ", fakeAsync(() => {
            spyOn(component.notificationService, 'success').and.callThrough();
            component.save();
            tick();
            expect(component.notificationService.success).toHaveBeenCalledWith({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
        }));

        it("verify if set name error when the save is rejected by the server ", fakeAsync(() => {
            let response = { status: 422, data: { errors_details: { name: [{ error: 'blank' }] }, errors_messages: { name: [{ error: 'cant be blank' }] }  } };
            component.profileService.update = jasmine.createSpy("update").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.nameErrors.getBackendErrors()[0]).toEqual('profile.edition.name.blank');
        }));

        it("verify if set identifier error when the save is rejected by the server ", fakeAsync(() => {
            spyOn(component.notificationService, 'error').and.callThrough();
            let response = { status: 422, data: { message: 'Failed', errors_details: { identifier: [{ error: 'not_available' }] }, errors_messages: { identifier: [{ error: 'not_available' }] } } };
            component.profileService.update = jasmine.createSpy("update").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.notificationService.error).toHaveBeenCalledWith({ title: "profile.edition.error.title", message: 'Failed' });
        }));

        it("verify if the server could not save the community ", fakeAsync(() => {
            spyOn(component.notificationService, 'error').and.callThrough();
            let response = { status: 400, data: { message: 'Failed' } };
            component.profileService.update = jasmine.createSpy("update").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.notificationService.error).toHaveBeenCalledWith({ title: "profile.edition.error.title", message: 'Failed' });
        }));

        it("change selection of the community acceptance", () => {
            fixture.detectChanges();
            component.onSelectionChange(true);
            expect(component.community.closed).toBeTruthy();
        });
    });
});