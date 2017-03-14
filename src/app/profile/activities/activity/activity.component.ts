import {Component, Input, Inject} from "ng-forward";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";
import { ActivityHeaderComponent } from "./activityheader.component";

@Component({
    selector: "noosfero-activity",
    templateUrl: 'app/profile/activities/activity/activity.html',
    directives: [ActivityHeaderComponent]
})
@Inject(EnvironmentService)
export class ActivityComponent {

    @Input() activity: noosfero.Activity;

    profiles = [];

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

    constructor(private environmentService: EnvironmentService) {
        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });
    }

    /**
    * Loads the profiles array associated with the current activity. Doing this in the view
    * causes errors on Angular
    */
    ngOnInit() {
        //console.log("onInit.Activity => ", this.activity);
        if (this.activity.verb == 'new_follower' || this.activity.verb == 'new_friendship') {
            this.profiles_list(this.activity.verb);
        }
    }

    getActivityTemplate() {
        return 'app/profile/activities/activity/' + this.activity.verb + '.html';
    }

    /**
    * Returns the number of profiles associated with the current activity
    */
    profiles() {
        let profiles_attribute = this.profile_attribute();
        if (profiles_attribute && this.activity.params) {
            let profiles_length = this.activity.params[profiles_attribute].length;
            console.log("Profiles length: ", profiles_length);
            return profiles_length;
        }
        return 0;
    }

    /**
    * Create a list of Profiles based on activity name, image url and identifier
    */
    private profiles_list(type: string) {
        let profiles_attribute = this.profile_attribute();
        for (var i = this.activity.params[profiles_attribute].length - 1; i >= 0; i--) {
            let profile = { 
                name: this.name(i), 
                identifier: this.url(i),
                image: { url: this.icon(i) }
            };
            this.profiles.push(profile);
        }
    }

    profile_attribute() {
        return this.profiles_attributes[this.activity.verb];
    }

    icon(index: any) {
        let image_attribute = this.images[this.activity.verb];
        if (image_attribute) {
            return this.activity.params[image_attribute][index];
        }
        return '';
    }

    name(index: any) {
        let name_attribute = this.profiles_attributes[this.activity.verb];
        if (name_attribute) {
            return this.activity.params[name_attribute][index];
        }
        return '';
    }

    url(index: any) {
        let url_attribute = this.urls_attributes[this.activity.verb];
        //console.log("Url for index[" + index + "]=>", url_attribute);
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
