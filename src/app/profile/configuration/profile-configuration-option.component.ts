import { CommunityService } from './../../../lib/ng-noosfero-api/http/community.service';
import { Component, Inject } from 'ng-forward';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "noosfero-profile-configuration-option",
    template: '<div></div>',
})
@Inject(ProfileService)
export class ProfileConfigurationOptionComponent {
    profile: noosfero.Profile;

    constructor(private profileService: ProfileService) {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }

}