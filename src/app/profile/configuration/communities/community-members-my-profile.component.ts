import { Component, Input, Inject } from '@angular/core';

@Component({
    selector: 'noosfero-community-members-my-profile',
    template: require('app/profile/configuration/communities/community-members-my-profile.html')
})
export class CommunityMembersMyProfileComponent {
    @Input() profile: noosfero.Profile;

    constructor() {
    }

}
