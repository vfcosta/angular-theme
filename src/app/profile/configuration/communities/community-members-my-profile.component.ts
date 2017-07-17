import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'noosfero-community-members-my-profile',
    templateUrl: './community-members-my-profile.html',
    styleUrls: ['./community-members-my-profile.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CommunityMembersMyProfileComponent {

    profile: noosfero.Profile;

}
