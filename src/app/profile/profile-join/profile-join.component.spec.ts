import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../shared/services/notification.service';
import { TranslatorService } from './../../shared/services/translator.service';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { CommunityService } from './../../../lib/ng-noosfero-api/http/community.service';
import { SessionService } from './../../login/session.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Pipe, Input, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MembershipStatus } from '../../../lib/ng-noosfero-api/http/profile.service';
import { ProfileJoinComponent } from './profile-join.component';
import * as helpers from "./../../../spec/helpers";

describe("Components", () => {

    describe("Profile Join Component", () => {

        let mocks = helpers.getMocks();

        let fixture: ComponentFixture<ProfileJoinComponent>;
        let component: ProfileJoinComponent;

        let retorno: any;
        let translatorService = jasmine.createSpyObj("translatorService", ["translate"]);
        let profileService = jasmine.createSpyObj("profileService", ["isMember", "addMember", "removeMember"]);
        let communityService = jasmine.createSpyObj("communityService", ["getMembershipState"]);
        profileService.isMember = jasmine.createSpy("isMember").and.returnValue(Promise.resolve(true));
        profileService.addMember = jasmine.createSpy("addMember").and.returnValue(Promise.resolve({ data: {} }));
        profileService.removeMember = jasmine.createSpy("removeMember").and.returnValue(Promise.resolve({ data: {} }));
        communityService.getMembershipState = jasmine.createSpy("getMembershipState").and.returnValue(Promise.resolve({ data: {} }));

        beforeEach(async(() => {
            spyOn(mocks.sessionService, 'currentPerson').and.callThrough();

            TestBed.configureTestingModule({
                declarations: [ProfileJoinComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: ProfileService, useValue: profileService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: NotificationService, useValue: helpers.mocks.notificationService },
                    { provide: EventsHubService, useValue: mocks.eventsHubService },
                    { provide: "$uibModal", useValue: helpers.mocks.$modal },
                    { provide: TranslatorService, useValue: translatorService },
                    { provide: CommunityService, useValue: communityService }
                ],
                imports: [TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ProfileJoinComponent);
            component = fixture.componentInstance;
            component.profile = <any>{ name: 'profile-name', type: 'Community' };
        }));

        it("display button to join community", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(false);
            component.isNotMember = jasmine.createSpy("isNotMember").and.returnValue(true);
            fixture.detectChanges();            
            expect(fixture.debugElement.queryAll(By.css('.actions .organization-actions .join')).length).toEqual(1);
        });

        it("not display button to join community for person", () => {            
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            fixture.detectChanges();            
            expect(component.isPerson()).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css('.actions .organization-actions .join')).length).toEqual(0);
        });

        it("display button to leave community for members", () => {
            let compiled = fixture.debugElement;
            component['membershipState'] = MembershipStatus.Member;
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
            component['membershipState'] = MembershipStatus.WaitingForApproval;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .wait')).length).toEqual(1);
        });

        it("should isMember return true when member state is Member", () => {
            component['membershipState'] = MembershipStatus.Member;
            expect(component.isMember()).toEqual(true);
        });

        it("should isMember return false when member state is WaitingForApproval", () => {
            component['membershipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isMember()).toEqual(false);
        });

        it("should isMember return false when member state is NotMember", () => {
            component['membershipState'] = MembershipStatus.NotMember;
            expect(component.isMember()).toEqual(false);
        });

        it("should isNotMember return true when member state is NotMember", () => {
            component['membershipState'] = MembershipStatus.NotMember;
            expect(component.isNotMember()).toEqual(true);
        });

        it("should isNotMember return false when member state is WaitingForApproval", () => {
            component['membershipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isNotMember()).toEqual(false);
        });

        it("should isNotMember return false when member state is Member", () => {
            component['membershipState'] = MembershipStatus.Member;
            expect(component.isNotMember()).toEqual(false);
        });

        it("should isWaitingMembershipApproval return true when member state is WaitingForApproval", () => {
            component['membershipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isWaitingMembershipApproval()).toEqual(true);
        });

        it("should isWaitingMembershipApproval return false when member state is NotMember", () => {
            component['membershipState'] = MembershipStatus.NotMember;
            expect(component.isWaitingMembershipApproval()).toEqual(false);
        });

        it("should isWaitingMembershipApproval return false when member state is Member", () => {
            component['membershipState'] = MembershipStatus.Member;
            expect(component.isWaitingMembershipApproval()).toEqual(false);
        });

    });
});
