import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: 'profile',
    templateUrl: "app/profile-info/profile-info.html",
    providers: [provide('profileService', { useClass: ProfileService })]
})
@Inject(ProfileService)
export class ProfileInfo {

    activities: any;
    profile: noosfero.Profile;

    constructor(private profileService: ProfileService) {
        this.activate();
    }

    activate() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.profileService.getActivities(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.activities = response.data.activities;
        });
    }
}
