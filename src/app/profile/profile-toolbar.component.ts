import {Component, Inject, provide} from "ng-forward";
import {ProfileService} from "../../lib/ng-noosfero-api/http/profile.service";

@Component({
    selector: "profile-toolbar",
    templateUrl: "app/profile/toolbar.html",
    providers: [
        provide('profileService', { useClass: ProfileService })
    ]
})
@Inject(ProfileService)
export class ProfileToolbarComponent {
    profile: noosfero.Profile;
    parentId: number;

    constructor(profileService: ProfileService) {
        profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
        });
    }
}
