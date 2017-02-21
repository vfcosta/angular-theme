import {Component, Inject, provide} from 'ng-forward';
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";
import {TranslateProfile} from "../../shared/pipes/translate-profile.filter";

@Component({
    selector: 'profile-about',
    templateUrl: "app/profile/about/profile-about.html",
    pipes: [TranslateProfile]
})
@Inject(ProfileService)
export class ProfileAboutComponent {

    profile: noosfero.Profile;

    constructor(profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            console.log("===== profile =====", profile);
        });
    }

    hasCustomFields(): boolean {
        let result: boolean = false;
        if (this.profile)
            result = (this.profile.additional_data) && Object.keys(this.profile.additional_data).length > 0;

        return result;
    }

}
