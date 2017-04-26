import { ValidationMessageComponent } from './../../../shared/components/validation-message/validation-message.component';
import { TranslatePipe } from './../../../shared/pipes/translate-pipe';
import { NewCommunityComponent } from './new-community.component';
import { By } from '@angular/platform-browser';
import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as helpers from "../../../../spec/helpers";
import { FormsModule, NG_VALIDATORS, AbstractControl, NgForm, FormControl } from '@angular/forms';

describe("Components", () => {

    fdescribe("New Community", () => {
        let mocks = helpers.getMocks();
        let fixture: ComponentFixture<NewCommunityComponent>;
        let component: NewCommunityComponent;

        // let profileService = jasmine.createSpyObj("profileService", ["update"]);
        // let communityService = jasmine.createSpyObj("communityService", ["createNewCommunity"]);
        //  let sessionService = jasmine.createSpyObj("sessionService", ["currentUser"]);
        //  sessionService.currentUser = jasmine.createSpy("currentUser").and.returnValue({ person: { identifier: 'profile1' } });
        // let state = jasmine.createSpyObj("$state", ["go"]);
        // communityService.createNewCommunity = jasmine.createSpy("createNewCommunity").and.returnValue(Promise.resolve({}));

        beforeEach(async(() => {
            // spyOn(mocks.notificationService, 'success').and.callThrough();
            // spyOn(mocks.$state, 'go').and.callThrough();
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [NewCommunityComponent, TranslatePipe, ValidationMessageComponent],
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
            expect(component.sessionProfile).toEqual(currentUser.person);
        });

        it("verify if translate service is called with correct parameters ", () => {
            spyOn(component.translatorService, 'translate');
            component.getTitle();
            expect(component.translatorService.translate).toHaveBeenCalledWith('myprofile.configuration.community.new');
        });

        it("verify if changes the page after cancel is called ", () => {
            spyOn(component.$state, 'go');
            component.cancel();
            expect(component.$state.go).toHaveBeenCalledWith('main.myprofile.communities', { profile: component.sessionProfile.identifier });
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
            spyOn(component.$state, 'go').and.callThrough();
            component.save();
            tick();
            expect(component.$state.go).toHaveBeenCalledWith('main.myprofile.communities', { profile: component.profile.identifier });
        }));

        it("verify if set name error when the save is rejected by the server ", fakeAsync(() => {
            let response = {status: 422, data: {errors_details: { name: [{error: 'blank'}] } } };
            component.communityService.createNewCommunity = jasmine.createSpy("createNewCommunity").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.nameErrors.getErrors()[0]).toEqual('profile.edition.name.blank');
        }));

        it("verify if the server could not save the community ", fakeAsync(() => {
            spyOn(component.notificationService, 'error').and.callThrough();
            let response = {status: 400, data: {message: 'Failed' } };
            component.communityService.createNewCommunity = jasmine.createSpy("createNewCommunity").and.returnValue(Promise.reject(response));
            fixture.detectChanges();
            component.save();
            tick();
            expect(component.notificationService.error).toHaveBeenCalledWith({ title: "profile.edition.error.title", message: 'Failed' });
        }));
    });
});
