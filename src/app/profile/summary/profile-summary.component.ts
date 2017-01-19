import { Inject, Input, Component } from "ng-forward";
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-profile-summary",
    templateUrl: 'app/profile/summary/profile-summary.html'
})
@Inject(EnvironmentService)
export class ProfileSummaryComponent {

    @Input() profile: noosfero.Profile;
    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService) {
        this.environment = environmentService.getCurrentEnvironment();
    }

    profileLink() {
        if (!this.environment || !this.environment.host || !this.profile) return null;
        let host = this.environment.host.replace(/https?:\/\//, "");
        return `${host}/${this.profile.identifier}`;
    }
}
