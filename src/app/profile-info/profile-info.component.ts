import {StateConfig, Component, Inject} from 'ng-forward';

import {Profile} from "./../models/interfaces";

@Component({
    selector: 'profile',
    templateUrl: "app/profile-info/profile-info.html"
})
@Inject("noosfero")
export class ProfileInfo {

    activities: any
    profile: any

    constructor(private noosfero: any) {
        this.activate();
    }

    activate() {
        this.noosfero.currentProfile.then((profile: Profile) => {
            this.profile = profile;
            return this.noosfero.profiles.one(this.profile.id).one('activities').get();
        }).then((response: restangular.IResponse) => {
            this.activities = response.data.activities;
        });
    }
}
