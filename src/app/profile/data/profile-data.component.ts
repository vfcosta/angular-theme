import {StateConfig, Component, Inject, Input, provide} from 'ng-forward';
import {ProfileService} from "../../../lib/ng-noosfero-api/http/profile.service";
import {TranslateProfile} from "../../shared/pipes/translate-profile.filter";

@Component({
    selector: 'profile-data',
    templateUrl: "app/profile/data/profile-data.html",
    pipes: [TranslateProfile]
})
export class ProfileDataComponent {

    @Input()
    profile: noosfero.Profile;

}
