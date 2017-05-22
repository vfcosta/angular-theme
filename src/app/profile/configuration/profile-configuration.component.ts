import { Component, Inject, provide } from 'ng-forward';
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
    providers: [
        provide('sessionService', {useClass: SessionService})
    ]
})
@Inject(ProfileService, '$stateParams', '$state', SessionService)
export class ProfileConfigurationComponent {
    profile: noosfero.Profile;
    profileIdentifier: string;
    showComponent: string = "";

    constructor(
        private profileService: ProfileService,
        private $stateParams: ng.ui.IStateParamsService,
        private $state: ng.ui.IStateService,
        private SessionService: SessionService) {

        this.profileIdentifier = (this.SessionService.currentUser().person) ? this.SessionService.currentUser().person.identifier : this.$stateParams["profile"];
        
        this.profileService.setCurrentProfileByIdentifier(this.profileIdentifier).then((profile: noosfero.Profile) => {
            this.profile = profile;
            
            if (this.$state.is('main.myprofile')) {
                if (this.profile.type === 'Community') {
                    this.$state.go('main.myprofile.community_edit', { profile: this.profile.identifier });
                }
                else {
                    this.$state.go('main.myprofile.personal_data', { profile: this.profile.identifier });
                }
            }
        });
    }
}