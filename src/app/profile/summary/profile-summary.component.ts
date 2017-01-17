import { Inject, Input, Output, Component, provide } from "ng-forward";

@Component({
    selector: "noosfero-profile-summary",
    templateUrl: 'app/profile/summary/profile-summary.html'
})
export class ProfileSummaryComponent {

    @Input() profile: noosfero.Profile;

}
