import {Component, Inject, provide} from 'ng-forward';
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";
import {TranslateProfile} from "../../shared/pipes/translate-profile.filter";

@Component({
    selector: 'profile-data',
    templateUrl: "app/profile/data/profile-data.html",
    pipes: [TranslateProfile]
})
@Inject(ProfileService)
export class ProfileDataComponent {

    profile: noosfero.Profile;

    constructor(profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }

    hasCustomFields(): boolean {
        let result: boolean = false;
        if (this.profile)
            result = (this.profile.additional_data) && Object.keys(this.profile.additional_data).length > 0;

        return result;
    }

}
