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
import * as helpers from "./../../../spec/helpers";

describe("Components", () => {

    describe("Profile Join Component", () => {

        let mocks = helpers.getMocks();

        let fixture: ComponentFixture<ProfileJoinComponent>;
        let component: ProfileJoinComponent;

        let retorno: any;
        let translatorService = jasmine.createSpyObj("translatorService", ["translate"]);

        beforeEach(async(() => {
            spyOn(mocks.sessionService, 'currentPerson').and.callThrough();
            spyOn(mocks.communityService, 'getMembershipState').and.callThrough();
            spyOn(mocks.personService, 'removeFriend').and.callThrough();
            spyOn(mocks.personService, 'addFriend').and.callThrough();
            spyOn(mocks.profileService, 'removeMember').and.callThrough();
            spyOn(mocks.profileService, 'addMember').and.callThrough();

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
            component.isNotMember = jasmine.createSpy("isNotMember").and.returnValue(true);
            fixture.detectChanges();            
            expect(fixture.debugElement.queryAll(By.css('.actions .profile-actions .join')).length).toEqual(1);
        });

        it("not display button to join community for person", () => {            
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            fixture.detectChanges();            
            expect(component.isPerson()).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.css('.actions .profile-actions .join')).length).toEqual(0);
        });

        it("display button to leave community for members", () => {
            let compiled = fixture.debugElement;
            component['relationshipState'] = MembershipStatus.Member;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .leave')).length).toEqual(1);
        });

        it("join community", () => {
            let compiled = fixture.debugElement;
            component.join();
            expect(mocks.profileService.addMember).toHaveBeenCalled();
        });

        it("leave community", () => {
            let compiled = fixture.debugElement;
            component.leave();
            expect(mocks.profileService.removeMember).toHaveBeenCalled();
        });

        it("get membership state", () => {
            let compiled = fixture.debugElement;
            component.loadMembership();
            expect(mocks.communityService.getMembershipState).toHaveBeenCalled();
        });

        it("display wait button when user is waiting membership approval", () => {
            let compiled = fixture.debugElement;            
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.actions .wait')).length).toEqual(1);
        });

        it("should isMember return true when member state is Member", () => {
            component['relationshipState'] = MembershipStatus.Member;
            expect(component.isMember()).toEqual(true);
        });

        it("should isMember return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isMember()).toEqual(false);
        });

        it("should isMember return false when member state is NotMember", () => {
            component['relationshipState'] = MembershipStatus.NotMember;
            expect(component.isMember()).toEqual(false);
        });

        it("should isNotMember return true when member state is NotMember", () => {
            component['relationshipState'] = MembershipStatus.NotMember;
            expect(component.isNotMember()).toEqual(true);
        });

        it("should isNotMember return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isNotMember()).toEqual(false);
        });

        it("should isNotMember return false when member state is Member", () => {
            component['relationshipState'] = MembershipStatus.Member;
            expect(component.isNotMember()).toEqual(false);
        });

        it("should isWaitingMembershipApproval return true when member state is WaitingForApproval", () => {
            component['relationshipState'] = MembershipStatus.WaitingForApproval;
            expect(component.isWaitingMembershipApproval()).toEqual(true);
        });

        it("should isWaitingMembershipApproval return false when member state is NotMember", () => {
            component['relationshipState'] = MembershipStatus.NotMember;
            expect(component.isWaitingMembershipApproval()).toEqual(false);
        });

        it("should isWaitingMembershipApproval return false when member state is Member", () => {
            component['relationshipState'] = MembershipStatus.Member;
            expect(component.isWaitingMembershipApproval()).toEqual(false);
        });

        it("not display add/remove button when view the current user profile", () => {
            let compiled = fixture.debugElement;            
            fixture.detectChanges();
            expect(compiled.queryAll(By.css('.add-friend')).length).toEqual(0);
            expect(compiled.queryAll(By.css('.remove-friend')).length).toEqual(0);
        });

        it("should isFriend return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            expect(component.isFriend()).toEqual(false);
        });

        it("should isFriend return false when member state is NotFriend", () => {
            component['relationshipState'] = FriendshipStatus.NotFriend;
            expect(component.isFriend()).toEqual(false);
        });

        it("should isFriend return true when member state is Friend", () => {
            component['relationshipState'] = FriendshipStatus.Friend;
            expect(component.isFriend()).toEqual(true);
        });

        it("should isNotFriend return false when member state is WaitingForApproval", () => {
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            expect(component.isNotFriend()).toEqual(false);
        });

        it("should isNotFriend return false when member state is Friend", () => {
            component['relationshipState'] = FriendshipStatus.Friend;
            expect(component.isNotFriend()).toEqual(false);
        });

        it("should isNotFriend return true when member state is NotFriend", () => {
            component['relationshipState'] = FriendshipStatus.NotFriend;
            expect(component.isNotFriend()).toEqual(true);
        });

        it("should isWaitingFriendshipApproval return true when member state is WaitingForApproval", () => {
            component['relationshipState'] = FriendshipStatus.WaitingForApproval;
            expect(component.isWaitingFriendshipApproval()).toEqual(true);
        });

        it("should isWaitingFriendshipApproval return false when member state is Friend", () => {
            component['relationshipState'] = FriendshipStatus.Friend;
            expect(component.isWaitingFriendshipApproval()).toEqual(false);
        });

        it("should isWaitingFriendshipApproval return false when member state is NotFriend", () => {
            component['relationshipState'] = FriendshipStatus.NotFriend;
            expect(component.isWaitingFriendshipApproval()).toEqual(false);
        });

        it("display button to add friend", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            component.isNotFriend = jasmine.createSpy("isNotFriend").and.returnValue(true);
            fixture.detectChanges();            
            expect(fixture.debugElement.queryAll(By.css('.actions .add-friend')).length).toEqual(1);
        });

        it("not display button to add friend for community", () => {            
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(false);
            fixture.detectChanges();            
            expect(component.isPerson()).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.actions .add-friend')).length).toEqual(0);
        });

        it("call personService add friend", () => {
            let compiled = fixture.debugElement;
            component.addFriend();
            expect(mocks.personService.addFriend).toHaveBeenCalled();
        });

        it("display button to remove friend", () => {
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(true);
            component.isFriend = jasmine.createSpy("isriend").and.returnValue(true);
            fixture.detectChanges();            
            expect(fixture.debugElement.queryAll(By.css('.actions .remove-friend')).length).toEqual(1);
        });

        it("not display button to remove friend for community", () => {            
            component.isPerson = jasmine.createSpy("isPerson").and.returnValue(false);
            fixture.detectChanges();            
            expect(component.isPerson()).toBeFalsy();
            expect(fixture.debugElement.queryAll(By.css('.actions .remove-friend')).length).toEqual(0);
            
        });

        it("call personService on remove friend", () => {
            let compiled = fixture.debugElement;
            component.removeFriend();
            expect(mocks.personService.removeFriend).toHaveBeenCalled();
        });

    });
});
