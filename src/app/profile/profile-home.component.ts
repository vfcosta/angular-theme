import {StateConfig, Component, Inject, provide} from 'ng-forward';

import {Profile} from "./../models/interfaces";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile-home',
    template: "<div></div>",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService, "$log", "$stateParams", "$scope", "$state")
export class ProfileHome {

    profile: Profile;

    constructor(profileService: ProfileService, $log: ng.ILogService, $stateParams: ng.ui.IStateParamsService, $scope: ng.IScope, $state: ng.ui.IStateService) {
        profileService.getCurrentProfile().then((profile: Profile) => {
            this.profile = profile;
            return profileService.get(this.profile.id).customGET('home_page', { fields: 'path' });
        }).then((response: restangular.IResponse) => {
            if (response.data.article) {
                $state.transitionTo('main.profile.page', { page: response.data.article.path, profile: this.profile.identifier }, { location: false });
            } else {
                $state.transitionTo('main.profile.info', { profile: this.profile.identifier }, { location: false });
            }
        });
    }
}
