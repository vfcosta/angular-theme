import {StateConfig, Component, Inject} from 'ng-forward';

import {Profile} from "./../models/interfaces";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile-home',
    template: "<div></div>"
})
@Inject(ProfileService, "noosfero", "$log", "$stateParams", "$scope", "$state")
export class ProfileHome {

    profile: Profile;

    constructor(ProfileService: ProfileService, noosfero: any, $log: ng.ILogService, $stateParams: ng.ui.IStateParamsService, $scope: ng.IScope, $state: ng.ui.IStateService) {
        noosfero.currentProfile.then((profile: Profile) => {
            this.profile = profile;
            return ProfileService.get(this.profile.id).customGET('home_page', { fields: 'path' });
        }).then((response: restangular.IResponse) => {
            if (response.data.article) {
                $state.transitionTo('main.profile.page', { page: response.data.article.path, profile: this.profile.identifier }, { location: false });
            } else {
                $state.transitionTo('main.profile.info', { profile: this.profile.identifier }, { location: false });
            }
        });
    }
}
