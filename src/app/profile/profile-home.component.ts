import {StateConfig, Component, Inject} from 'ng-forward';

@Component({
    selector: 'profile-home',
    template: "<div></div>"
})
@Inject("noosfero", "$log", "$stateParams", "$scope", "$state")
export class ProfileHome {

    profile: any;

    constructor(noosfero, $log, $stateParams, $scope, $state) {
        noosfero.currentProfile.then((profile) => {
            this.profile = profile;
            return noosfero.profile(this.profile.id).customGET('home_page', { fields: 'path' });
        }).then((response) => {
            if (response.data.article) {
                $state.transitionTo('main.profile.page', { page: response.data.article.path, profile: this.profile.identifier }, { location: false });
            } else {
                $state.transitionTo('main.profile.info', { profile: this.profile.identifier }, { location: false });
            }
        });
    }
}
