import {Component, Input} from "ng-forward";
import {ActivityComponent} from "./activity/activity.component";

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
export class ActivitiesComponent {

    /**
     * @ngdoc property
     * @propertyOf NoosferoActivities
     * @name activities
     * @returns {Activity[]} An array of {@link Activity}.
     */
    @Input() activities: noosfero.Activity[];


}
