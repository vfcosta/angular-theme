import {Component, Input, Inject} from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";
import { TranslatorService } from "../../../shared/services/translator.service";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/profile/activities/activity/activity.html'
})
@Inject(EnvironmentService, TranslatorService)
export class ActivityComponent {

    @Input() activity: noosfero.Activity;

    images = {
        'new_friendship': 'friend_profile_custom_icon',
        'new_follower': 'follower_profile_custom_icon'
    };

    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private translatorService: TranslatorService) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });

    }

    ngOnInit() {
        console.log("onInit => ", this.activity);        
    }

    getActivityTemplate() {
        console.log("Activity: ", this.activity);
        return 'app/profile/activities/activity/' + this.activity.verb + '.html';
    }

    description() {
        console.log("Verb: ", this.activity.verb);
        console.log("Translating....");
        let t1 = this.translatorService.translate("activities." + this.activity.verb + ".description");
        return t1;
    }

    profiles() {
        return this.activity.params.length;
    }
}
