import { Component, Inject, provide } from 'ng-forward';

import { ProfileService } from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile-home',
    template: "<div></div>",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject("profileService", "$state")
export class ProfileHomeComponent {

    profile: noosfero.Profile;

    constructor(profileService: ProfileService, $state: ng.ui.IStateService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return profileService.getHomePage(<number>this.profile.id, { fields: 'path' });
        }).then((response: restangular.IResponse) => {
            if (response.data && response.data.path) {
                this.profile.homepage = response.data.path;
                $state.transitionTo('main.profile.page', { page: response.data.path, profile: this.profile.identifier }, { location: false });
            } else {
                this.profile.homepage = null;
                $state.transitionTo('main.profile.info', { profile: this.profile.identifier }, { location: false });
            }
        });
    }
}
