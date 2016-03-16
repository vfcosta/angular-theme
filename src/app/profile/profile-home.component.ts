import {StateConfig, Component, Inject, provide} from 'ng-forward';

import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile-home',
    template: "<div></div>",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService, "$state")
export class ProfileHome {

    profile: noosfero.Profile;

    constructor(profileService: ProfileService, $state: ng.ui.IStateService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return profileService.getHomePage(<number>this.profile.id, { fields: 'path' });
        }).then((response: restangular.IResponse) => {
            if (response.data.article) {
                $state.transitionTo('main.profile.page', { page: response.data.article.path, profile: this.profile.identifier }, { location: false });
            } else {
                $state.transitionTo('main.profile.info', { profile: this.profile.identifier }, { location: false });
            }
        });
    }
}
