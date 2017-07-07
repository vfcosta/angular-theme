import { SessionService } from './../../login/session.service';
import { Inject, Input, Component, EventEmitter, Output } from '@angular/core';
import { ProfileService, MembershipStatus, FriendshipStatus } from '../../../lib/ng-noosfero-api/http/profile.service';
import { NotificationService } from "../../shared/services/notification.service";
import { EventsHubService } from '../../shared/services/events-hub.service';
import { NoosferoKnownEvents } from '../../known-events';
import { CommunityService } from '../../../lib/ng-noosfero-api/http/community.service';
import { PersonService } from './../../../lib/ng-noosfero-api/http/person.service';

@Component({
    selector: "profile-join",
    template: require('app/profile/profile-join/profile-join.html')
})
export class ProfileJoinComponent {

    @Input() profile: noosfero.Profile;
    private relationshipState: number;
    currentUser: noosfero.User;


    constructor(private profileService: ProfileService, private personService: PersonService,
        private session: SessionService, private notificationService: NotificationService,
        private eventsHubService: EventsHubService, private communityService: CommunityService) {
        this.currentUser = this.session.currentUser();
    }

    ngOnInit() {
        if(this.isPerson()){
            this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.PROFILE_FRIENDSHIP_CHANGED, (friendshipState: number) => {
                this.relationshipState = friendshipState;
            });
            this.loadFriendship();
        }else{
            this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, (membershipState: number) => {
                this.relationshipState = membershipState;
            });
            this.loadMembership();
        }
    }

    loadMembership() {
        this.communityService.getMembershipState(this.session.currentPerson(), this.profile).then((response: noosfero.DefaultResponse) => {            
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, response.code);
        });
    }

    loadFriendship() {
        this.personService.getFriendshipState(this.session.currentPerson(), this.profile).then((response: noosfero.DefaultResponse) => {            
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.PROFILE_FRIENDSHIP_CHANGED, response.code);
        });
    }

    join() {
        this.profileService.addMember(this.session.currentPerson(), this.profile).then((result: any) => {
            if (result.data.pending) {
                this.notificationService.success({ title: "profile.join.title", message: "profile.join.moderation.message" });
            } else {
                this.notificationService.success({ title: "profile.join.title", message: "profile.join.success.message" });
            }
            this.loadMembership();
        });
    }

    leave() {
        this.profileService.removeMember(this.session.currentPerson(), this.profile).then(() => {
            this.loadMembership();
        });
    }

    addFriend() {
        this.personService.addFriend(<number>this.profile.id).then((response: any) => {
            if (response.data.pending) {
                this.notificationService.success({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.moderation.messag" });
            } else {
                this.notificationService.success({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.success.message" });
            }
        }).catch((response: any) => {
            this.notificationService.error({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.error.message" });
        });
    }

    removeFriend() {
        this.personService.removeFriend(<number>this.profile.id).then((response: any) => {
            this.notificationService.success({ title: "profile.actions.add_friend.title", message: "profile.actions.remove_friend.message" });
        }).catch((response: any) => {
            this.notificationService.error({ title: "profile.actions.add_friend.title", message: "profile.actions.remove_friend.error.message" });
        });
    }

    isPerson(): boolean {
        return this.profile.type === 'Person';
    }

    isWaitingMembershipApproval(): boolean {
        return this.relationshipState === MembershipStatus.WaitingForApproval;
    }

    isNotMember(): boolean {
        return this.relationshipState === MembershipStatus.NotMember;
    }

    isMember(): boolean {
        return this.relationshipState === MembershipStatus.Member;
    }

    isWaitingFriendshipApproval(): boolean {
        return this.relationshipState === FriendshipStatus.WaitingForApproval;
    }

    isNotFriend(): boolean {        
        return (this.relationshipState === FriendshipStatus.NotFriend) && ((this.currentUser && this.currentUser.person) && (this.currentUser.person.id !== this.profile.id));
    }

    isFriend(): boolean {
        return this.relationshipState === FriendshipStatus.Friend
        ;
    }


}
