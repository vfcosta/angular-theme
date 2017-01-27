import {Component, Input, Inject} from "ng-forward";
// import { StateConfig, Component, Inject, provide } from 'ng-forward';

import {ActivityComponent} from "./activity/activity.component";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to retreive profile activities.
 */

@Component({
    selector: "noosfero-activities",
    templateUrl: 'app/profile/activities/activities.html',
    directives: [ActivityComponent]
})
@Inject(ProfileService)
// @Inject("amDateFormatFilter")
export class ActivitiesComponent {

    /**
     * @ngdoc property
     * @propertyOf NoosferoActivities
     * @name activities
     * @returns {Activity[]} An array of {@link Activity}.
     */
    // @Input() activities: noosfero.Activity[];

    activities: any;
    profile: noosfero.Profile;

    constructor(private profileService: ProfileService, private amDateFormatFilter: any) {
        this.init();
    }

    init() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.profileService.getActivities(<number>this.profile.id);
        }).then((response: restangular.IResponse) => {
            this.activities = response.data.activities;
            console.log(this.activities);
        });
    }

}
