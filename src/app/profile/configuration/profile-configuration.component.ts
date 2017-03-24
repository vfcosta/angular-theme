import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { SessionService } from "./../../login";
import { Component, Input, Inject } from '@angular/core';

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to profile configuration.
 */
@Component({
    selector: "noosfero-profile-configuration",
    templateUrl: 'app/profile/configuration/profile-configuration.html',
})
export class ProfileConfigurationComponent {
    profile: noosfero.Profile;
    profileIdentifier: string;

    constructor(@Inject('profileService') private profileService: ProfileService, @Inject('$stateParams') private $stateParams: ng.ui.IStateParamsService) {]
        this.profileIdentifier = this.$stateParams["profile"];
        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }
}