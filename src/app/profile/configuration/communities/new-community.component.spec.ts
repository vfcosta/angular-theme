import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../../shared/services/notification.service';
import { TranslatorService } from './../../../shared/services/translator.service';
import { CommunityService } from './../../../../lib/ng-noosfero-api/http/community.service';
import { SessionService } from './../../../login/session.service';
import { ProfileService } from './../../../../lib/ng-noosfero-api/http/profile.service';
import { ValidationMessageComponent } from './../../../shared/components/validation-message/validation-message.component';
import { NewCommunityComponent } from './new-community.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import { FormsModule, NG_VALIDATORS, AbstractControl, NgForm, FormControl } from '@angular/forms';

describe("Components", () => {
    describe("New Community", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<NewCommunityComponent>;
        let component: NewCommunityComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule, FormsModule, TranslateModule.forRoot()],
                declarations: [NewCommunityComponent, ValidationMessageComponent],
                providers: [
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: CommunityService, useValue: mocks.communityService },
                    { provide: NotificationService, useValue: mocks.notificationService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: TranslatorService, useValue: mocks.translatorService },
                    { provide: Router, useValue: mocks.router },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            });
            fixture = TestBed.createComponent(NewCommunityComponent);
            component = fixture.componentInstance;
            component.profile = <noosfero.Profile>mocks.profile;
            fixture.detectChanges();
        }));


        it("verify if community is initialized with close true ", () => {
            component.community = undefined;
            component.ngOnInit();
            expect(component.community).toEqual(<noosfero.Community>{ closed: true });
        });

        it("verify if session profile is initialized with current user ", () => {
            component.sessionProfile = null;
            let currentUser = { person: { identifier: 'profile1' } };
            component['sessionService'].currentUser = jasmine.createSpy("currentUser").and.returnValue(currentUser);
            component.ngOnInit();
            expect(component.sessionProfile).toEqual(<noosfero.Profile>currentUser.person);
        });

        it("verify if translate service is called with correct parameters ", () => {
            spyOn(component.translatorService, 'translate');
            component.getTitle();
            expect(component.translatorService.translate).toHaveBeenCalledWith('myprofile.configuration.community.new');
        });

        it("verify if changes the page after cancel is called ", () => {
            spyOn(TestBed.get(Router), 'navigate');
            component.cancel();
            expect(TestBed.get(Router).navigate).toHaveBeenCalledWith(['/myprofile', mocks.profile.identifier, 'communities']);
        });

        it("verify if community type is defined after save is called ", () => {
            expect(component.community.type).toBeUndefined();
            component.save();
            expect(component.community.type).toEqual('Community');
        });

        it("verify if the method createNewCommunity of community service is called after save ", () => {
            spyOn(component.communityService, 'createNewCommunity').and.callThrough();
            component.save();
            expect(component.communityService.createNewCommunity).toHaveBeenCalledWith(component.community);
        });

        it("verify if notification service success is called after community is successfuly created ", fakeAsync(() => {
            spyOn(component.notificationService, 'success').and.callThrough();
            component.save();
            tick();
            expect(component.notificationService.success).toHaveBeenCalledWith({ title: "profile.edition.success.title", message: "profile.edition.success.message" });
        }));

        it("verify if changes page after community is successfuly created ", fakeAsync(() => {
            spyOn(TestBed.get(Router), 'navigate');
            component.save();
            tick();
            expect(TestBed.get(Router).navigate).toHaveBeenCalled();
        }));

        it("verify if set name error when the save is rejected by the server ", fakeAsync(() => {
            let response = { status: 422, data: { errors: { name: [{ error: 'blank', full_message: 'cant be blank' }] } } };
            component.communityService.createNewCommunity = jasmine.createSpy("createNewCommunity").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.nameErrors.getErrors()[0]).toEqual('profile.edition.name.blank');
        }));

        it("verify if set identifier error when the save is rejected by the server ", fakeAsync(() => {
            spyOn(component.notificationService, 'error').and.callThrough();
            let response = { status: 422, data: { message: 'Failed', errors: { identifier: [{ error: 'not_available' }] }, errors_messages: { identifier: [{ error: 'not_available' }] } } };
            component.communityService.createNewCommunity = jasmine.createSpy("update").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.nameErrors.getErrors()[0]).toEqual('profile.edition.name.not_available');
        }));

        it("verify if the server could not save the community ", fakeAsync(() => {
            spyOn(component.notificationService, 'error').and.callThrough();
            let response = { status: 400, message: 'Failed' };
            component.communityService.createNewCommunity = jasmine.createSpy("createNewCommunity").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.notificationService.error).toHaveBeenCalledWith({ title: "profile.edition.error.title", message: 'Failed' });
        }));
    });
});
