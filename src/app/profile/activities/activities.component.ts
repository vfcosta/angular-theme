import { Component, Input, Inject } from "@angular/core";
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
    template: require('app/profile/activities/activities.html')
})
export class ActivitiesComponent {

    activities: any;
    page: number = 1;
    profile: noosfero.Profile;
    hasActivities: boolean = false;

    constructor(private profileService: ProfileService) {
        this.init();
    }

    init() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            if (this.isCommunity()) {
              return this.profileService.getActivities(<number>this.profile.id, { page: this.page });
            }

            return this.profileService.getNetworkActivities(<number>this.profile.id, { page: this.page });
        }).then((response: any) => {
            this.activities = response.data.plain();
            if (this.activities.length > 0) {
                this.hasActivities = true;
            }
        });
    }

    viewMore() {
        this.page++;
        this.profileService.getNetworkActivities(<number>this.profile.id, { page: this.page }).then((response: any) => {
            this.hasActivities = (response.data.plain().length > 0) ? true : false;
            response.data.plain().forEach((value, key) => {
                this.activities.push(value);
            });
        });
    }

    isCommunity(): boolean {
        return this.profile.type === 'Community';
    }
}
