import { Component, Input, Inject } from '@angular/core';

@Component({
    selector: 'noosfero-community-members-my-profile',
    templateUrl: './community-members-my-profile.html',
    styleUrls: ['./community-members-my-profile.scss']
})
export class CommunityMembersMyProfileComponent {

    profile: noosfero.Profile;

}
