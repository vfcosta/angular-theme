import {Component, Input, Inject} from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/profile/activities/activity/activity.html'
})
@Inject(EnvironmentService)
export class ActivityComponent {

    @Input() activity: noosfero.Activity;
    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });
    }

    getActivityTemplate() {
        return 'app/profile/activities/activity/' + this.activity.verb + '.html';
    }

}
