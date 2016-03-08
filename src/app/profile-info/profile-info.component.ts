import {StateConfig, Component, Inject, provide} from 'ng-forward';

import {Profile} from "./../models/interfaces";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile',
    templateUrl: "app/profile-info/profile-info.html",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService, "noosfero")
export class ProfileInfo {

    activities: any
    profile: any

    constructor(private profileService: ProfileService, private noosfero: any) {
        this.activate();
    }

    activate() {
        this.noosfero.currentProfile.then((profile: Profile) => {
            this.profile = profile;
            return this.profileService.getActivities(this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.activities = response.data.activities;
        });
    }
}
