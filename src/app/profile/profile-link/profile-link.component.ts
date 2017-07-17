import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'profile-link',
    templateUrl: './profile-link.html',
    styleUrls: ['./profile-link.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileLinkComponent {

    @Input() profile: noosfero.Profile;
    @Input() displayImage = false;
    @Input() displayName = true;
    @Input() truncate = true;

}
