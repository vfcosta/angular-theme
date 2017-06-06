import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Pipe, Input, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { ProfileJoinComponent } from './profile-join.component';
import * as helpers from "./../../../spec/helpers";
import { TranslatePipe } from '../../shared/pipes/translate-pipe';

describe("Components", () => {

    describe("Profile Join Component", () => {

        let mocks = helpers.getMocks();

        let fixture: ComponentFixture<ProfileJoinComponent>;
        let component: ProfileJoinComponent;
        let compiled: any;

        let retorno: any;
        let translatorService = jasmine.createSpyObj("translatorService", ["translate"]);
        let profileService = jasmine.createSpyObj("profileService", ["isMember", "addMember", "removeMember"]);
        let communityService = jasmine.createSpyObj("communityService", ["getMembershipState"]);
        profileService.isMember = jasmine.createSpy("isMember").and.returnValue(Promise.resolve(true));
        profileService.addMember = jasmine.createSpy("addMember").and.returnValue(Promise.resolve({ data: {} }));
        profileService.removeMember = jasmine.createSpy("removeMember").and.returnValue(Promise.resolve({ data: {} }));
        communityService.getMembershipState = jasmine.createSpy("getMembershipState").and.returnValue(Promise.resolve({ data: {} }));
        let session = helpers.mocks.sessionWithCurrentUser({});
        session.currentUser().person = <any>{};

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ProfileJoinComponent, TranslatePipe],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: "profileService", useValue: profileService },
                    { provide: "sessionService", useValue: session },
                    { provide: "notificationService", useValue: helpers.mocks.notificationService },
                    { provide: "eventsHubService", useValue: mocks.eventsHubService },
                    { provide: "$uibModal", useValue: helpers.mocks.$modal },
                    { provide: "translatorService", useValue: translatorService },
                    { provide: "communityService", useValue: communityService }
                ]
            });
            fixture = TestBed.createComponent(ProfileJoinComponent);
            component = fixture.componentInstance;
            component.profile = <any>{ name: 'profile-name' };
        }));

        it("display button to join community", () => {
            fixture.detectChanges();
            let compiled = fixture.debugElement;
            expect(component.displayOrganizationActions()).toBeTruthy();
            expect(compiled.queryAll(By.css(".comment .actions .reply")).length).toEqual(0);
            expect(compiled.queryAll(By.css(".comment .actions .reply")).length).toEqual(0);
            expect(compiled.queryAll(By.css('.actions .organization-actions .join')).length).toEqual(1);
        });

        it("not display button to join community for person", () => {
            component.profile = <any>{ name: 'person-name', type: 'Person' };
            let compiled = fixture.debugElement;
            fixture.detectChanges();
            expect(component.displayOrganizationActions()).toBeFalsy();
            expect(compiled.queryAll(By.css('.actions .organization-actions .join')).length).toEqual(0);
        });

        it("display button to leave community", () => {
            let compiled = fixture.debugElement;
            component['isMember'] = true;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .leave')).length).toEqual(1);
        });

        it("join community", () => {
            let compiled = fixture.debugElement;
            component.join();
            expect(profileService.addMember).toHaveBeenCalled();
        });

        it("leave community", () => {
            let compiled = fixture.debugElement;
            component.leave();
            expect(profileService.removeMember).toHaveBeenCalled();
        });

        it("get membership state", () => {
            let compiled = fixture.debugElement;
            component.loadMembership();
            expect(communityService.getMembershipState).toHaveBeenCalled();
        });

        it("display wait button when user is waiting membership approval", () => {
            let compiled = fixture.debugElement;
            component['isMember'] = false;
            component['membershipState'] = 1;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .wait')).length).toEqual(1);
        });
    });
});
