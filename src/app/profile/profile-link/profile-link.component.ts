import {Component, Input} from '@angular/core';

@Component({
    selector: 'profile-link',
    template: require("app/profile/profile-link/profile-link.html")
})
export class ProfileLinkComponent {

    @Input() profile: noosfero.Profile;
    @Input() displayImage = false;
    @Input() displayName = true;
    @Input() truncate = true;

}
