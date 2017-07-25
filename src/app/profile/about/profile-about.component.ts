import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';

@Component({
    selector: 'profile-about',
    templateUrl: './profile-about.html',
    styleUrls: ['./profile-about.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileAboutComponent {

    profile: noosfero.Profile;
    profileFields: any;

    constructor(profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            this.loadProfileFields();
        });
    }

    loadProfileFields() {
        let fields = ['email', 'formation', 'schooling', 'nationality', 'country', 'state', 'city'];
        this.profileFields = {};
        for (let field of fields) {
            if (this.profile[field]) {
                this.profileFields[field] = this.profile[field];
            }
        }
    }

    hasCustomFields() {
        return this.profile.additional_data && Object.keys(this.profile.additional_data).length > 0;
    }
}
