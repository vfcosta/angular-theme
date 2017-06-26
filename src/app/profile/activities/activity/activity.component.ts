import { Component, Input, Inject } from "@angular/core";
import { EnvironmentService } from "../../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-activity",
    template: require('app/profile/activities/activity/activity.html'),
})
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
        if (this.activity.verb === 'new_follower' || this.activity.verb === 'new_friendship') {
            this.profiles_list(this.activity.verb);
        }
    }

    /**
    * Create a list of Profiles based on activity name, image url and identifier
    */
    private profiles_list(type: string) {
        let profiles_attribute = this.profile_attribute();
        for (let i = 0; i < this.activity.params[profiles_attribute].length; i++) {
            let profile = {
                name: this.name(i),
                identifier: this.url(i),
                image: { url: '/api/v1/profiles/' + this.url(i) + '/thumb?key=identifier' }
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
        if (url_attribute) {
            return this.activity.params[url_attribute][index].profile;
        }
        return '';
    }

}
