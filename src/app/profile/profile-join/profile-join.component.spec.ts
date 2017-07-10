import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from './../../shared/services/notification.service';
import { TranslatorService } from './../../shared/services/translator.service';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { CommunityService } from './../../../lib/ng-noosfero-api/http/community.service';
import { SessionService } from './../../login/session.service';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { PersonService } from './../../../lib/ng-noosfero-api/http/person.service';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Pipe, Input, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MembershipStatus, FriendshipStatus } from '../../../lib/ng-noosfero-api/http/profile.service';
import { ProfileJoinComponent } from './profile-join.component';
import * as helpers from './../../../spec/helpers';

describe("Components", () => {

    describe("Profile Join Component", () => {

        let mocks = helpers.getMocks();

        let fixture: ComponentFixture<ProfileJoinComponent>;
        let component: ProfileJoinComponent;

        let retorno: any;
        let translatorService = jasmine.createSpyObj("translatorService", ["translate"]);

        beforeEach(async(() => {
            spyOn(mocks.sessionService, 'currentPerson').and.callThrough();
            spyOn(mocks.personService, 'addFriend').and.callThrough();            
            spyOn(mocks.personService, 'removeFriend').and.callThrough();
            spyOn(mocks.personService, 'getFriendshipState').and.callThrough();
            spyOn(mocks.profileService, 'addMember').and.callThrough();
            spyOn(mocks.profileService, 'removeMember').and.callThrough();
            spyOn(mocks.communityService, 'getMembershipState').and.callThrough();            

            TestBed.configureTestingModule({
                declarations: [ProfileJoinComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [
                    { provide: ProfileService, useValue: mocks.profileService },
                    { provide: PersonService, useValue: mocks.personService },
                    { provide: SessionService, useValue: mocks.sessionService },
                    { provide: NotificationService, useValue:mocks.notificationService },
                    { provide: EventsHubService, useValue: mocks.eventsHubService },
                    { provide: TranslatorService, useValue: translatorService },
                    { provide: CommunityService, useValue: mocks.communityService }
                ],
                imports: [TranslateModule.forRoot()]
            });
            fixture = TestBed.createComponent(ProfileJoinComponent);
            component = fixture.componentInstance;
            component.profile = <any>{ name: 'profile-name', type: 'Community' };
        }));

        it("display button to join community", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(false);
            component.hasNoRelationship = jasmine.createSpy("hasNoRelationship").and.returnValue(true);
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.actions .profile-actions .add-in-community')).length).toEqual(1);
        });

        it("display button to add friend", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            component.profileType = jasmine.createSpy("profileType").and.returnValue('person');
            component.hasNoRelationship = jasmine.createSpy("hasNoRelationship").and.returnValue(true);
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.css('.actions .profile-actions .add-in-person')).length).toEqual(1);
        });

        it("not display button to join community for person", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            fixture.detectChanges();
            expect(component.isPerson()).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css('.actions .profile-actions .add-in-community')).length).toEqual(0);
        });

        it("not display button to add friend for community", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(false);
            fixture.detectChanges();
            expect(component.isPerson()).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.actions .profile-actions .add-in-person')).length).toEqual(0);
        });

        it("display button to leave community for members", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(false);
            component['relationshipState'] = MembershipStatus.Member;
            fixture.detectChanges();
            let compiled = fixture.debugElement;
            expect(compiled.queryAll(By.css('.actions .profile-actions .remove-of-community')).length).toEqual(1);
        });

        it("display button to remove frienship for friends", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            component.profileType = jasmine.createSpy("profileType").and.returnValue('person');
            component['relationshipState'] = FriendshipStatus.Friend;
            fixture.detectChanges();
            let compiled = fixture.debugElement;
            expect(compiled.queryAll(By.css('.actions .profile-actions .remove-of-person')).length).toEqual(1);
        });

        it("join community", () => {
            let compiled = fixture.debugElement;
            component.addRelationship();
            expect(mocks.profileService.addMember).toHaveBeenCalled();
        });

        it("add friend", () => {            
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            fixture.detectChanges();
            component.addRelationship();
            expect(mocks.personService.addFriend).toHaveBeenCalled();
        });

        it("leave community", () => {            
            component.removeRelationship();
            expect(mocks.profileService.removeMember).toHaveBeenCalled();
        });

        it("remove friendship", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            fixture.detectChanges();
            component.removeRelationship();
            expect(mocks.personService.removeFriend).toHaveBeenCalled();
        });

        it("get membership state", () => {            
            component.loadRelationship();
            expect(mocks.communityService.getMembershipState).toHaveBeenCalled();
        });

        it("get friendship state", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            fixture.detectChanges();            
            component.loadRelationship();
            expect(mocks.personService.getFriendshipState).toHaveBeenCalled();
        });

        it("display wait button when user is waiting membership approval", () => {
            let compiled = fixture.debugElement;
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .wait-community')).length).toEqual(1);
        });

        it("display wait button when user is waiting friendship approval", () => {
            let compiled = fixture.debugElement;
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            component.profileType = jasmine.createSpy("profileType").and.returnValue('person');
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .wait-person')).length).toEqual(1);
        });

        it("should hasRelationship return true when member state is Member", () => {
            component['relationshipState'] = MembershipStatus.Member;
            expect(component.hasRelationship()).toEqual(true);
        });

        it("should hasRelationship return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            expect(component.hasRelationship()).toEqual(false);
        });

        it("should hasRelationship return false when member state is NotMember", () => {
            component['relationshipState'] = MembershipStatus.NotMember;
            expect(component.hasRelationship()).toEqual(false);
        });

        it("should hasNoRelationship return true when member state is NotMember", () => {
            component['relationshipState'] = MembershipStatus.NotMember;
            expect(component.hasNoRelationship()).toEqual(true);
        });

        it("should hasNoRelationship return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            expect(component.hasNoRelationship()).toEqual(false);
        });

        it("should hasNoRelationship return false when member state is Member", () => {
            component['relationshipState'] = MembershipStatus.Member;
            expect(component.hasNoRelationship()).toEqual(false);
        });

        it("should isWaitingApproval return true when member state is WaitingForApproval", () => {
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isWaitingApproval()).toEqual(true);
        });

        it("should isWaitingApproval return false when member state is NotMember", () => {
            component['relationshipState'] = MembershipStatus.NotMember;
            expect(component.isWaitingApproval()).toEqual(false);
        });

        it("should isWaitingApproval return false when member state is Member", () => {
            component['relationshipState'] = MembershipStatus.Member;
            expect(component.isWaitingApproval()).toEqual(false);
        });

        it("not display add/remove button when view the current user profile", () => {
            let compiled = fixture.debugElement;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.add-friend')).length).toEqual(0);
            expect(compiled.queryAll(By.css('.remove-friend')).length).toEqual(0);
        });

        it("should hasRelationship return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            expect(component.hasRelationship()).toEqual(false);
        });

        it("should hasRelationship return false when member state is NotFriend", () => {
            component['relationshipState'] = FriendshipStatus.NotFriend;
            expect(component.hasRelationship()).toEqual(false);
        });

        it("should hasRelationship return true when member state is Friend", () => {
            component['relationshipState'] = FriendshipStatus.Friend;
            expect(component.hasRelationship()).toEqual(true);
        });

        it("should hasNoRelationship return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            expect(component.hasNoRelationship()).toEqual(false);
        });

        it("should hasNoRelationship return false when member state is Friend", () => {
            component['relationshipState'] = FriendshipStatus.Friend;
            expect(component.hasNoRelationship()).toEqual(false);
        });

        it("should hasNoRelationship return true when member state is NotFriend", () => {
            component['relationshipState'] = FriendshipStatus.NotFriend;
            expect(component.hasNoRelationship()).toEqual(true);
        });

        it("should isWaitingApproval return true when member state is WaitingForApproval", () => {
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            expect(component.isWaitingApproval()).toEqual(true);
        });

        it("should isWaitingApproval return false when member state is Friend", () => {
            component['relationshipState'] = FriendshipStatus.Friend;
            expect(component.isWaitingApproval()).toEqual(false);
        });

        it("should isWaitingApproval return false when member state is NotFriend", () => {
            component['relationshipState'] = FriendshipStatus.NotFriend;
            expect(component.isWaitingApproval()).toEqual(false);
        });

    });
});
