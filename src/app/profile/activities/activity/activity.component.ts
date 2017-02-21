import {Component, Input, Inject} from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/profile/activities/activity/activity.html'
})
@Inject(EnvironmentService)
export class ActivityComponent {

    @Input() activity: noosfero.Activity;

    images = {
        'new_friendship': 'friend_profile_custom_icon'
    };

    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });

    }

    ngOnInit() {
        console.log("onInit => ", this.activity.verb);        
    }

    getActivityTemplate() {
        console.log("Activity: ", this.activity.verb);
        return 'app/profile/activities/activity/' + this.activity.verb + '.html';
    }

    image() {
        console.log("Verb: ", this.activity.verb);
        let image = this.images[this.activity.verb];
        console.log("Image: ", image);
        if (image) {
            return this.activity.params[image][0];
        }
        return "";
    }

}
