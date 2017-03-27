import { Component, Inject } from 'ng-forward';
import { ProfileService } from './../../../lib/ng-noosfero-api/http/profile.service';
import { SessionService } from "./../../login";

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
@Inject(SessionService, '$stateParams')
export class ProfileConfigurationComponent {
    profile: noosfero.Profile;
    profileIdentifier: string;

    constructor(private profileService: ProfileService, private $stateParams: ng.ui.IStateParamsService) {
        this.profileIdentifier = this.$stateParams["profile"];
        console.log(this.profileIdentifier);
        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
            this.profile = profile;
            console.log(this.profile);
        });
    }
}