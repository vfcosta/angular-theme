import { Inject, Input, Component, EventEmitter, Output } from '@angular/core';
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { SessionService } from "./../../login";
import { NotificationService } from "../../shared/services/notification.service";
import { EventsHubService } from '../../shared/services/events-hub.service';
import { NoosferoKnownEvents } from '../../known-events';

@Component({
    selector: "profile-join",
    template: require('app/profile/profile-join/profile-join.html')
})
export class ProfileJoinComponent {

    @Input() profile: noosfero.Profile;

    private isMember: boolean;
    private membershipState: number; // 0 - Is not member, 1 - Waiting Membership, 2 - Is Member

    constructor( @Inject('profileService') private profileService: ProfileService,
        @Inject('sessionService') private session: SessionService,
        @Inject('notificationService') private notificationService: NotificationService,
        @Inject("eventsHubService") private eventsHubService: EventsHubService) {
    }

    ngOnInit() {
        this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, (membershipState: number) => {
            this.membershipState = membershipState;
            this.isMember = false;
            if (membershipState === 2) {
                this.isMember = true;
            }
        });
        this.loadMembership();
    }

    loadMembership() {
        let person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.profileService.getMembershipState(person, this.profile).then((membershipState: number) => {
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.PROFILE_MEMBERSHIP_CHANGED, membershipState);
        });
    }

    join() {
        let person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.profileService.addMember(person, this.profile).then((result: any) => {
            if (result.data.pending) {
                this.notificationService.success({ title: "profile.join.moderation.title", message: "profile.join.moderation.message" });
            } else {
                this.notificationService.success({ title: "profile.join.moderation.title", message: "profile.join.success.message" });
            }
            this.loadMembership();
        });
    }

    leave() {
        let person = this.session.currentUser() ? this.session.currentUser().person : null;
        this.profileService.removeMember(person, this.profile).then(() => {
            this.loadMembership();
        });
    }

    displayOrganizationActions() {
        return !this.isPerson();
    }

    isPerson(): boolean {
        return this.profile.type === 'Person';
    }

    isCommunity(): boolean {
        return this.profile.type === 'Community';
    }

    isEnterprise(): boolean {
        return this.profile.type === 'Enterprise';
    }

    isWaitingMembershipApproval(): boolean {
        return this.membershipState === 1;
    }

}
