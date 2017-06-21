import { SessionService } from './../../login/session.service';
import { Inject, Input, Component, EventEmitter, Output } from '@angular/core';
import { ProfileService, MembershipStatus } from '../../../lib/ng-noosfero-api/http/profile.service';
import { NotificationService } from "../../shared/services/notification.service";
import { EventsHubService } from '../../shared/services/events-hub.service';
import { NoosferoKnownEvents } from '../../known-events';
import { CommunityService } from '../../../lib/ng-noosfero-api/http/community.service';

@Component({
    selector: "profile-join",
    template: require('app/profile/profile-join/profile-join.html')
})
export class ProfileJoinComponent {

    @Input() profile: noosfero.Profile;
    private membershipState: number; // 0 - Is not member, 1 - Waiting Membership, 2 - Is Member

    constructor(private profileService: ProfileService,
        private session: SessionService,
        private notificationService: NotificationService,
        private eventsHubService: EventsHubService,
        private communityService: CommunityService) {
    }

    ngOnInit() {
        if(!this.isPerson()){
            this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, (membershipState: number) => {            
                this.membershipState = membershipState;
            });
            this.loadMembership();
        }
    }

    loadMembership() {
        this.communityService.getMembershipState(this.session.currentPerson(), this.profile).then((response: noosfero.DefaultResponse) => {
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, response.code);
        });
    }

    join() {
        this.profileService.addMember(this.session.currentPerson(), this.profile).then((result: any) => {
            if (result.data.pending) {
                this.notificationService.success({ title: "profile.join.moderation.title", message: "profile.join.moderation.message" });
            } else {
                this.notificationService.success({ title: "profile.join.moderation.title", message: "profile.join.success.message" });
            }
            this.loadMembership();
        });
    }

    leave() {
        this.profileService.removeMember(this.session.currentPerson(), this.profile).then(() => {
            this.loadMembership();
        });
    }

    isPerson(): boolean {
        return this.profile.type === 'Person';
    }

    isWaitingMembershipApproval(): boolean {
        return this.membershipState === MembershipStatus.WaitingForApproval;
    }

    isNotMember(): boolean {
        return this.membershipState === MembershipStatus.NotMember;
    }

    isMember(): boolean {
        return this.membershipState === MembershipStatus.Member;
    }

}
