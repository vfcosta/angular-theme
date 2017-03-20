import { Component, Input, Inject } from "ng-forward";
import { ActivityComponent } from "./activity/activity.component";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to retreive profile activities.
 */
const LIMIT = 10;
@Component({
    selector: "noosfero-activities",
    templateUrl: 'app/profile/activities/activities.html',
    directives: [ActivityComponent]
})
@Inject(ProfileService)
export class ActivitiesComponent {

    activities: any;
    page: number = 1;
    profile: noosfero.Profile;

    constructor(private profileService: ProfileService) {
        this.init();
    }

    init() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.profileService.getActivities(<number>this.profile.id, { page: this.page, limit: LIMIT });
        }).then((response: restangular.IResponse) => {
            this.activities = response.data.plain();
        });
    }

    viewMore() {
        this.page++;
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            return this.profileService.getActivities(<number>this.profile.id, { page: this.page, limit: LIMIT });
        }).then((response: restangular.IResponse) => {
            console.log('activities ==> ', this.activities, ' -- ', response.data.plain());
            angular.forEach(response.data.plain(), (value, key) => {
                console.log(key + ': ' + value);
                this.activities.push(value);
            });
        });
    }
}
