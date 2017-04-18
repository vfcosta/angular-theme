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
@Inject(ProfileService, '$stateParams', '$state')
export class ProfileConfigurationComponent {
    profile: noosfero.Profile;
    profileIdentifier: string;
    showComponent: string = "";

    constructor(private profileService: ProfileService, private $stateParams: ng.ui.IStateParamsService, private $state: ng.ui.IStateService) {
        this.profileIdentifier = this.$stateParams["profile"];
        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
            this.profile = profile;
            if (this.profile.type === 'Community') {
                this.$state.go('main.myprofile.community_edit', { profile: this.profile.identifier });
            }
            else {
                this.$state.go('main.myprofile.personal_data', { profile: this.profile.identifier });
            }
        });
    }
}