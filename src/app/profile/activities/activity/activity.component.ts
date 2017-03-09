import {Component, Input, Inject} from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";
import { ActivityHeaderComponent } from "./activityheader.component";
import { TranslatorService } from "../../../shared/services/translator.service";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/profile/activities/activity/activity.html',
    directives: [ActivityHeaderComponent]
})
@Inject(EnvironmentService, TranslatorService)
export class ActivityComponent {

    @Input() activity: noosfero.Activity;

    images = {
        'new_friendship': 'friend_profile_custom_icon',
        'new_follower': 'follower_profile_custom_icon'
    };

    urls_attributes = {
        'new_friendship': 'friend_url',
        'new_follower': 'follower_url'
    };

    profiles_attributes = {
        'new_friendship': 'friend_name',
        'new_follower': 'follower_name',
        'leave_scrap': 'target'
    };

    environment: noosfero.Environment;

    constructor(private environmentService: EnvironmentService, private translatorService: TranslatorService) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });

    }

    ngOnInit() {
        console.log("onInit.Activity => ", this.activity);        
    }

    getActivityTemplate() {
        console.log("Activity: ", this.activity);
        return 'app/profile/activities/activity/' + this.activity.verb + '.html';
    }

    description() {
        console.log("Verb: ", this.activity.verb);
        console.log("Translating....");
        let key = "activities." + this.activity.verb + ".description";
        let t1 = this.translatorService.translate(key);
        console.log("Translation for [" + key + "] => ", t1);
        return key;
    }

    profiles() {
        let profiles_attribute = this.profile_attribute();
        console.log("Profiles_attribute: ", profiles_attribute);
        console.log("Activity params: ", this.activity.params);
        if (profiles_attribute && this.activity.params) {
            let profiles_length = this.activity.params[profiles_attribute].length;
            console.log("Profiles length: ", profiles_length);
            return profiles_length;
        }
        return 0;
    }

    profile_attribute() {
        return this.profiles_attributes[this.activity.verb];
    }

    profile_is_array() {
        if (this.activity.params) {
            return Array.isArray(this.activity.params[this.profile_attribute()]);
        }
        return false;
    }

    url(index: any) {
        let url_attribute = this.urls_attributes[this.activity.verb];
        console.log("Url for index[" + index + "]=>", url_attribute);
        if (url_attribute) {
            let profile_url = this.activity.params[url_attribute][index].profile;
            return profile_url;
        }
        return '';
    }

    hasTarget() {
        if (this.activity['target']) {
            return true;
        }
        return false;
    }

}
