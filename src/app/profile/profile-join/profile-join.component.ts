import { SessionService } from './../../login/session.service';
import { Inject, Input, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ProfileService, MembershipStatus, FriendshipStatus } from '../../../lib/ng-noosfero-api/http/profile.service';
import { NotificationService } from '../../shared/services/notification.service';
import { EventsHubService } from '../../shared/services/events-hub.service';
import { NoosferoKnownEvents } from '../../known-events';
import { CommunityService } from '../../../lib/ng-noosfero-api/http/community.service';
import { PersonService } from './../../../lib/ng-noosfero-api/http/person.service';

@Component({
    selector: "profile-join",
    templateUrl: './profile-join.html',
    styleUrls: ['./profile-join.scss'],
    encapsulation: ViewEncapsulation.None,
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
        }else{
            this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, (membershipState: number) => {
                this.relationshipState = membershipState;
            });            
        }
        this.loadRelationship();
    }

    loadRelationship() {
        if(this.isPerson()){
            this.personService.getFriendshipState(this.session.currentPerson(), this.profile).then((response: noosfero.DefaultResponse) => {            
                this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.PROFILE_FRIENDSHIP_CHANGED, response.code);
            });
        }else{
            this.communityService.getMembershipState(this.session.currentPerson(), this.profile).then((response: noosfero.DefaultResponse) => {            
                this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, response.code);
            });
        }
    }

    addRelationship() {
        let promiseResponse;
        if(this.isPerson()){
            promiseResponse = this.personService.addFriend(<number>this.profile.id);
        } else{
            promiseResponse = this.profileService.addMember(this.session.currentPerson(), this.profile);

        }            
        promiseResponse.then((response: any) => {
            if (response.data.pending) {
                this.notificationService.success({ title: 'profile.actions.add_in_'+ this.profileType() + '.title', message: 'profile.actions.add_in_'+ this.profile.type.toLowerCase() + '.moderation.message' });
            } else {
                this.notificationService.success({ title: 'profile.actions.add_in_'+ this.profileType() + '.title', message: 'profile.actions.add_in_' + this.profile.type.toLowerCase() + '.success.message' });
            }
            this.loadRelationship();
        }).catch((response: any) => {
            this.notificationService.error({ title: 'profile.actions.add_in_'+ this.profileType() + '.error.title', message: 'profile.actions.add_in_' + this.profile.type.toLowerCase() + '.error.message' });
        });
    }

    removeRelationship() {
        let promiseResponse;
        if(this.isPerson()){
            promiseResponse = this.personService.removeFriend(<number>this.profile.id);
        } else{
            promiseResponse = this.profileService.removeMember(this.session.currentPerson(), this.profile);
        }

        promiseResponse.then((response: any) => {
            this.notificationService.success({ title: 'profile.actions.remove_of_' + this.profileType() + '.title', message: 'profile.actions.remove_of_' + this.profileType() + '.message' });
            this.loadRelationship();
        }).catch((response: any) => {
            this.notificationService.error({ title: 'profile.actions.remove_of_' + this.profileType() + '.title', message: 'profile.actions.remove_of_' + this.profileType() + '.error.message' });
        });
    }

    isPerson(): boolean {
        return this.profile.type === 'Person';
    }

    profileType(): string {        
        return this.profile.type.toLowerCase();
    }
    
    hasNoRelationship(): boolean {
        let is_not_friend = (this.relationshipState === FriendshipStatus.NotFriend) && ((this.currentUser && this.currentUser.person) && (this.currentUser.person.id !== this.profile.id));
        let is_not_member = this.relationshipState === MembershipStatus.NotMember;
        return (is_not_member) || (is_not_friend);
    }

    hasRelationship(): boolean {
        let is_member = this.relationshipState === MembershipStatus.Member;
        let is_friend = this.relationshipState === FriendshipStatus.Friend;
        return (is_member) || (is_friend);
    }

    isWaitingApproval(): boolean {
        let is_waiting_friend_approval = this.relationshipState === FriendshipStatus.WaitingForApproval;
        let is_waiting_community_approval = this.relationshipState === MembershipStatus.WaitingForApproval;
        return (is_waiting_community_approval) || (is_waiting_friend_approval);
    }

}
