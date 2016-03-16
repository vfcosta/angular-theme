import {Component, Input} from "ng-forward";
import {NoosferoActivity} from "./activity/activity.component";

/**
 * @ngdoc controller
 * @name NoosferoActivities
 * @description
 *  The controller responsible to retreive profile activities.
 */

@Component({
    selector: "noosfero-activities",
    templateUrl: 'app/components/noosfero-activities/activities.html',
    directives: [NoosferoActivity]
})
export class NoosferoActivities {

    /**
     * @ngdoc property
     * @propertyOf NoosferoActivities
     * @name activities
     * @returns {Activity[]} An array of {@link Activity}.
     */
    @Input() activities: noosfero.Activity[];


}
