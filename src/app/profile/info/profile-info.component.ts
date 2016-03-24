import {StateConfig, Component, Inject, provide} from 'ng-forward';
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";
import {ProfileDataComponent} from "../data/profile-data.component";
import {TranslateProfile} from "../../shared/pipes/translate-profile.filter";

@Component({
    selector: 'profile',
    templateUrl: "app/profile/info/profile-info.html",
    providers: [provide('profileService', { useClass: ProfileService })],
    directives: [ProfileDataComponent],
    pipes: [TranslateProfile]
})
@Inject(ProfileService)
@Inject("amDateFormatFilter")
export class ProfileInfoComponent {

    activities: any;
    profile: noosfero.Profile;

    constructor(private profileService: ProfileService, private amDateFormatFilter: any) {
        this.init();
    }

    init() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.profileService.getActivities(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.activities = response.data.activities;
        });
    }
}
